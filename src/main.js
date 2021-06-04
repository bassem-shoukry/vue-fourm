import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "@/store"
const forumApp = createApp(App)

forumApp.use(router)
forumApp.use(store)

const requireComponent = require.context('./components',true, /App[A-Z]\w+\.vue$/)

// For each matching file name...
requireComponent.keys().forEach((fileName) => {
    // Get the component config
    const componentConfig = requireComponent(fileName)
    // Get the PascalCase version of the component name
    const componentName = fileName
        .replace(/^.+\//, '')
        // Remove the file extension from the end
        .replace(/\.\w+$/, '')

    // Globally register the component
    forumApp.component(componentName, componentConfig.default || componentConfig)
})


forumApp.mount('#app')
