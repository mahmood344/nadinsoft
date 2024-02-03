import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue';
import Todos from '../views/Todos.vue';
import Weather from '../views/Weather.vue';
import Profile from '../views/Profile.vue';
const routes = [
 {
  path:'/',
  name:'Home',
  component:Home,
  beforeEnter:(to,from,next)=>{
    if(!JSON.parse(localStorage.getItem('dataUser'))){
      next({name:'Profile'});
    }
    else{
      next();
    }
  }
 },
 {
  path:'/todos',
  name:'Todos',
  component:Todos
 },
 {
  path:'/weather',
  name:'Weather',
  component:Weather
 },
 {
  path:'/profile',
  name:'Profile',
  component:Profile
 }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
