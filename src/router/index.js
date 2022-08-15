import { createRouter,createWebHashHistory } from "vue-router"
import login from "../components/Login.vue"
import Register from "../components/Register.vue"
import Index from "../components/Index.vue"
const routes = [
   {
        path: '/login',components:  {
            login:login
        }
    },
    {
        path: '/register',components: {
            register:Register
        } 
    },
    {
        path: '/',components:{
            Index:Index
        }
    },
]
export const router = createRouter({
  history: createWebHashHistory(),routes: routes
})

export default router