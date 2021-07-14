import {findById} from "@/helpers";
import firebase from "firebase";

export default {
    async createPost({commit, state}, post) {
        post.userId = state.authId
        post.publishedAt = firebase.firestore.FieldValue.serverTimestamp()
        const batch = firebase.firestore().batch()
        const postRef = firebase.firestore().collection('posts').doc()
        const threadRef = firebase.firestore().collection('threads').doc(post.threadId)
        batch.set(postRef,post)
        batch.update(threadRef,{
            posts: firebase.firestore.FieldValue.arrayUnion(postRef.id),
            contributors : firebase.firestore.FieldValue.arrayUnion(state.authId)
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
        const id = 'ggg' + Math.random();
        const userId = state.authId
        const publishedAt = Math.floor(Date.now() / 1000)
        const thread = {forumId, title, publishedAt, userId, id}
        commit('appendThreadToUser', {parentId: userId, childId: id})
        commit('appendThreadToForum', {parentId: forumId, childId: id})
        commit('setItem', {resource:'threads', item:thread})
        dispatch('createPost', {text, threadId: id})
        return findById(state.threads, id)
    },
    async updateThread({commit, state}, {title, text, id}) {
        const thread = findById(state.threads, id)
        const post = findById(state.posts, thread.posts[0])
        const newThread = {...thread, title}
        const newPost = {...post, text}
        commit('setItem', {resource:'threads',item: newThread})
        commit('setItem', {resource:'posts',item: newPost})``
        return newThread
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
            firebase.firestore().collection(resource).doc(id).onSnapshot((doc) => {
                const item = { ...doc.data(), id: doc.id }
                commit('setItem', {resource, item })
                resolve(item)
            })
        })
    },

    fetchItems:({dispatch}, {ids,resource,emoji}) => Promise.all(ids.map(id => dispatch('fetchItem',{id,resource,emoji}))),
}