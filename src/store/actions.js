import {findById,docToResource } from "@/helpers";
import firebase from "firebase";

export default {
    async createPost({commit, state}, post) {
        post.userId = state.authId
        post.publishedAt = firebase.firestore.FieldValue.serverTimestamp()
        const batch = firebase.firestore().batch()
        const postRef = firebase.firestore().collection('posts').doc()
        const threadRef = firebase.firestore().collection('threads').doc(post.threadId)
        const userRef = firebase.firestore().collection('users').doc(state.authId)

        batch.set(postRef,post)
        batch.update(threadRef,{
            posts: firebase.firestore.FieldValue.arrayUnion(postRef.id),
            contributors : firebase.firestore.FieldValue.arrayUnion(state.authId)
        })
        batch.update(userRef, {
            postsCount: firebase.firestore.FieldValue.increment(1)
        })
        await batch.commit()

        const newPost = await postRef.get()

        commit('setItem', {resource:'posts',item:{ ...newPost.data(),id:newPost.id}})
        commit('appendPostToThread', {childId: newPost.id, parentId: newPost.threadId})
        commit('appendContributorToThread', {childId: state.authId, parentId: newPost.threadId})
    },
    updateUser({commit}, user) {
        commit('setItem', {resource:'users', item:user})
    },
    async createThread({commit, state, dispatch}, {title, text, forumId}) {
        const userId = state.authId
        const publishedAt = firebase.firestore.FieldValue.serverTimestamp()
        const threadRef = firebase.firestore().collection('threads').doc()
        const thread = {forumId, title, publishedAt, userId, id:threadRef.id}
        const userRef = firebase.firestore().collection('users').doc(userId)
        const forumRef = firebase.firestore().collection('forums').doc(forumId)
        const batch = firebase.firestore().batch()
        batch.set(threadRef,thread)
        batch.update(userRef,{
            threads : firebase.firestore.FieldValue.arrayUnion(threadRef.id)
        })
        batch.update(forumRef,{
            threads : firebase.firestore.FieldValue.arrayUnion(threadRef.id)
        })
        await batch.commit()
        const newThread = await threadRef.get()
        commit('setItem', {resource:'threads', item:{...(await newThread).data(),id:newThread.id}})
        commit('appendThreadToUser', {parentId: userId, childId: threadRef.id})
        commit('appendThreadToForum', {parentId: forumId, childId: threadRef.id})
        await dispatch('createPost', {text, threadId: threadRef.id})
        return findById(state.threads, threadRef.id)
    },
    async updateThread({commit, state}, {title, text, id}) {
        const thread = findById(state.threads, id)
        const post = findById(state.posts, thread.posts[0])
        let newThread = { ...thread, title }
        let newPost = { ...post, text }
        const threadRef = firebase.firestore().collection('threads').doc(id)
        const postRef = firebase.firestore().collection('posts').doc(post.id)
        const batch = firebase.firestore().batch()
        batch.update(threadRef, newThread)
        batch.update(postRef, newPost)
        await batch.commit()
        newThread = await threadRef.get()
        newPost = await postRef.get()
        commit('setItem', {resource:'threads',item: newThread})
        commit('setItem', {resource:'posts',item: newPost})
        return docToResource(newThread)
    },
    async updatePost ({ commit, state }, { text, id }) {
        const post = {
            text,
            edited: {
                at: firebase.firestore.FieldValue.serverTimestamp(),
                by: state.authId,
                moderated: false
            }
        }
        const postRef = firebase.firestore().collection('posts').doc(id)
        await postRef.update(post)
        const updatedPost = await postRef.get()
        commit('setItem', { resource: 'posts', item: updatedPost })
    },
    // ---------------------------------------
    // Fetch Single Resource
    // ---------------------------------------
    fetchCategory:({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'categories', id ,emoji: '🏷',}),
    fetchForum : ({ dispatch }, { id }) => dispatch('fetchItem', {  resource: 'forums', id,emoji: '🏁' }),
    fetchThread : ({dispatch}, { id }) => dispatch('fetchItem',{id,emoji:'📄',resource:'threads'}),
    fetchPost :({ dispatch }, { id }) => dispatch('fetchItem',{resource:'posts',id,emoji:'💬'}),
    fetchUser :({ dispatch }, { id }) => dispatch('fetchItem',{resource:'users',id,emoji:'🙋'}),
    fetchAuthUser :({ dispatch,state }) => dispatch('fetchItem',{resource:'users',id:state.authId,emoji:'🙋'}),

    // ---------------------------------------
    // Fetch Multiple Resource
    // ---------------------------------------
    fetchAllCategories({commit})
    {
        return new Promise((resolve => {
            firebase.firestore().collection('categories').onSnapshot((querySnapShot) => {
                const categories = querySnapShot.docs.map(doc => {
                    const item = {id: doc.id, ...doc.data()}
                    commit('setItem',{resource:'categories',item})
                    return item
                })

                resolve(categories)
            })
        }))
    },
    fetchThreads:({dispatch},{ids}) => dispatch('fetchItems',{resource:'threads',ids,emoji:'📄'}),
    fetchUsers:({dispatch},{ids}) => dispatch('fetchItems',{resource:'users',ids,emoji:'🙋'}),
    fetchPosts:({dispatch},{ids}) => dispatch('fetchItems',{resource:'posts',ids,emoji:'🙋'}),
    fetchForums:({dispatch},{ids}) => dispatch('fetchItems',{ids,resource:'forums',emoji:'🙋'}),
    fetchItem ({ commit }, { id ,emoji,resource}) {
        console.log('🔥',emoji, id)
        return new Promise((resolve) => {
            const unsubscribe = firebase.firestore().collection(resource).doc(id).onSnapshot((doc) => {
                const item = { ...doc.data(), id: doc.id }
                commit('setItem', {resource, item })
                resolve(item)
            })

            commit('appendUnsubscribe', { unsubscribe })
        })
    },

    fetchItems:({dispatch}, {ids,resource,emoji}) => Promise.all(ids.map(id => dispatch('fetchItem',{id,resource,emoji}))),
    async unsubscribeAllSnapshots ({ state, commit }) {
        state.unsubscribes.forEach(unsubscribe => unsubscribe())
        commit('clearAllUnsubscribes')
    }
}