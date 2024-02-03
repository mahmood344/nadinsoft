<template>
  <a-config-provider
    :theme="store.themeApp">
    <a-layout style="border:1px solid black">
      <Header></Header>
      <a-layout>
        <Sidbar></Sidbar>
       <a-layout style="border-left:1px solid black">
      <Message v-if="store.message"></Message>
        <Content></Content>
         </a-layout>
    </a-layout>
    </a-layout>
    </a-config-provider>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { theme } from 'ant-design-vue';
import Message from './components/Message.vue';
import { onMounted } from 'vue';
import Header from './components/Header.vue';
import Sidbar from './components/Sidbar.vue';
import Content from './components/Content.vue';
import {SateManegment} from '../store/index.js';
export default {
  name:'MainPage',
  components: {
      Header,
      Sidbar,
      Content,
      Message
    },
setup() {
    const { t , locale } = useI18n();
    const store = SateManegment();
   onMounted(()=>{
    if(localStorage.getItem('dataUser')){
      if(JSON.parse(localStorage.getItem('dataUser')).theme == 1){
        store.themeApp = {
                algorithm: theme.darkAlgorithm,
            }
      }
      else{
        store.themeApp = {
                algorithm: theme.defaultAlgorithm,
            }
      }
    }
    else{
      store.themeApp = {
                algorithm: theme.darkAlgorithm,
            };
    }
   })
   
    return {t , store}
  }
}
</script>

<style>

</style>