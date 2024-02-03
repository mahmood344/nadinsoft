import { createApp } from "vue";
import Antd from 'ant-design-vue';
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/reset.css';
import App from "./App.vue";
import router from "./router";
import { createI18n } from 'vue-i18n'
const pinia = createPinia()
const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('dataUser')?JSON.parse(localStorage.getItem('dataUser')).lang:'fa',
    allowComposition: true, // you need to specify that!
  messages: {
    en: {
        titleHeader:'Wellcome To NadinSoft',
         placeholderThem:'theme',
         placeholderName:'Name',
         titleProfile:'Profile',
         saveBtn:'Save',
         morning:'Good morning',
         evening:'Good evening',
         night:'Good night',
         inputWeather:'please inter city name',
         searchBtn:'Search',
         inputTodo:'please inter your job',
         addJobBtn:'add job',
         editBtn:'confirm',
         emptyJob:'You have not entered anything yet !!!',
         emtyCity:'Enter your city name',
         messageSave:'Changes saved successfully',
         dashboard:'Dashboard',
         todos:'Todos',
         weather:'Weather',
         profile:'Profile'
    },
    fa: {
      titleHeader: 'به نادین سافت خوش آمدین',
      placeholderThem:'تم',
      placeholderName:'نام',
      titleProfile:'پروفایل',
      saveBtn:'ذخیره',
      morning:'صبح بخیر',
      evening:'بعد از ظهر بخیر',
      night:'شب بخیر',
      inputWeather:'لطفا نام شهر را وارد نمایید',
      searchBtn:'جستجو',
      inputTodo:'لطفا وظیفه خود را وارد کنید',
        addJobBtn:'افزودن وظیفه',
        editBtn:'تایید',
        emptyJob:'!!! هنوز وظیفه ای وارد نکرده اید',
        emtyCity:'نام شهر خود را به صورت لاتین وارد کنید',
        messageSave:'تغییرات با موفقیت ذخیره شد',
        dashboard:'داشبورد',
         todos:'وظایف',
         weather:'پیش بینی هوا',
         profile:'پروفایل'
    }
  }
  })
 const app = createApp(App);
 app.use(router);
 app.use(i18n);
 app.use(Antd);
 app.use(pinia)
 app.mount("#app");
