import { createWebHistory, createRouter } from 'vue-router';
import LoginAdmin from './components/LoginAdmin.vue';
import Admin from './components/Admin.vue';
import AddEnterprise from './components/AddEnterprise.vue'
import UpdateEnterprise from './components/UpdateEnterprise.vue'
import Login from './components/Login.vue';
import UpdateUserData from './components/UpdateUserData.vue';
import UserData from './components/UserData.vue';
import MatchView from './components/MatchView.vue';
import Dashboard from './components/Dashboard.vue';
import SankeyView from './components/SankeyView.vue';
import NewUserData from './components/NewUserData.vue';
import MapView from './components/MapView.vue';
import HomePage from './components/Homepage';




const routes = [
    {
        path: '/Home',
        component: HomePage,
        
    },
    {
        path: '/Admin',
        component: Admin,
        
    },
    {
        path: '/LoginAdmin',
        component: LoginAdmin,
    },
    {
        path: '/Add',
        component: AddEnterprise,
    },
    {
        path: '/UpdateEnterprise/:id',
        component: UpdateEnterprise,
    },

    {
        path: '/Login',
        component: Login,
    },
    {
        path: '/UpdateUserData/:id/:Username/:identifier/:processID',
        component: UpdateUserData,
        
    },
    {
        path: '/MatchView/:id/:Username',
        component: MatchView,
    },

    {
        path: '/UserData/:id/:Username',
        component: UserData,
    },
    {
        path: '/Dashboard/:id/:Username',
        component: Dashboard,
    },
    {
        path: '/SankeyView/:id/:Username',
        component: SankeyView,
    },
    {
        path: '/NewUserData/:id/:Username/:identifier',
        component: NewUserData,
    },
    {
        path: '/MapView/:id/:Username',
        component: MapView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;