<template>
  <div :style="locale=='fa'?'direction:rtl':'direction:ltr'" style="padding: 30px;display: flex;justify-content: center;align-items:center">
    <a-card :title="$t('titleProfile')" :bordered="false" style="width: 300px;text-align:center;">
    <a-form v-on:submit.prevent="saveDataUser">
        <a-form-item
      name="username"
    >
      <a-input required v-model:value="dataUser.name" :placeholder="$t('placeholderName')"/>
    </a-form-item>
    <a-form-item
      name="username"
    >
      <a-select
    v-model:value="dataUser.theme"
    :placeholder="$t('placeholderThem')"
    :options="locale=='fa'?themesFa:themesEn"
    @change="changeTheme"
  ></a-select>
    </a-form-item>
    <a-form-item
      name="username"
    >
      <a-select
    v-model:value="dataUser.lang"
    placeholder="locale"
    :options="locale=='fa'?langsFa:langsEn"
    @change="changeLang"
  ></a-select>
    </a-form-item>
    <a-form-item>
        <a-button type="primary" html-type="submit">{{ $t('saveBtn') }}</a-button>
    </a-form-item>
  </a-form>
    </a-card>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {SateManegment} from '../../store/index.js';
import { theme } from 'ant-design-vue';
import {useRouter} from 'vue-router';
export default {
  name:'ProfilePage',
setup(){
    const { t , locale } = useI18n();
    const router = useRouter();
    const store = SateManegment();
    const dataUser = reactive({
        theme:localStorage.getItem('dataUser')?JSON.parse(localStorage.getItem('dataUser')).theme:1,
        lang:localStorage.getItem('dataUser')?JSON.parse(localStorage.getItem('dataUser')).lang:'fa',
        name:localStorage.getItem('dataUser')?JSON.parse(localStorage.getItem('dataUser')).name:'',
    })
    const themesEn = ref([
  {
    value: 1,
    label: 'dark',
  },
  {
    value: 2,
    label: 'light',
  }
]);
const themesFa = ref([
  {
    value: 1,
    label: 'تاریک',
  },
  {
    value: 2,
    label: 'روشن',
  }
]);
const langsFa = ref([
  {
    value: 'fa',
    label: 'فارسی',
  },
  {
    value: 'en',
    label: 'انگلیسی',
  }
]);
const langsEn = ref([
  {
    value: 'fa',
    label: 'fa',
  },
  {
    value: 'en',
    label: 'en',
  }
]);
// تابع تغییر بک گراند نرم افزار
function changeTheme(){
    if(dataUser.theme == 2){
        store.setTheme(theme.defaultAlgorithm);
    }
    else{
        store.setTheme(theme.darkAlgorithm);
    }
}
// تابع تغییر زبان نرم افزار
function changeLang(){
   if(dataUser.lang == 'fa'){
    locale.value = 'fa';
   }  
   else{
    locale.value = 'en';
   }
}
// تابع ذخیره اطلاعات کاربر
function saveDataUser(){
    localStorage.setItem('dataUser' , JSON.stringify(dataUser));
    store.setMessage({
      type:'success',
      messageText:'Changes saved successfully'
    });
    setTimeout(() => {
      store.setMessage(null); 
      router.push({name:'Home'});
    }, 2000);
}
return{ t , locale , themesFa , themesEn  , changeTheme , dataUser , langsFa , langsEn , changeLang , saveDataUser }
}
}
</script>

<style>
</style>