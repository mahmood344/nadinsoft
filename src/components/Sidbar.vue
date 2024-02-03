<template>
  <a-layout-sider width="200" v-model:collapsed="collapsed" :trigger="null" collapsible>
         <a-menu
          v-model:selectedKeys="selectedKeys"
          :selected-keys="[$route.path]"
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-menu-item  key="/">
          <UserOutlined />
          <span style="font-weight:bold"><router-link :to="{name:'Home'}">{{ $t('dashboard') }}</router-link></span>
        </a-menu-item>
        <a-menu-item  key="/todos">
          <CheckSquareOutlined />
          <span style="font-weight:bold"><router-link :to="{name:'Todos'}">{{ $t('todos') }}</router-link></span>
        </a-menu-item>
        <a-menu-item  key="/weather">
          <GlobalOutlined />
          <span style="font-weight:bold"><router-link :to="{name:'Weather'}">{{ $t('weather') }}</router-link></span>
        </a-menu-item>
        <a-menu-item key="/profile">
          <SettingOutlined />
          <span style="font-weight:bold"><router-link :to="{name:'Profile'}">{{ $t('profile') }}</router-link></span>
        </a-menu-item>
        </a-menu>
      </a-layout-sider>
</template>

<script>
import { ref , onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import {UserOutlined , CheckSquareOutlined , GlobalOutlined , SettingOutlined} from '@ant-design/icons-vue';
export default {
  name:'SidbarComponent',
  components: {
      UserOutlined:UserOutlined,
      CheckSquareOutlined:CheckSquareOutlined,
      GlobalOutlined:GlobalOutlined,
      SettingOutlined:SettingOutlined
    },
setup(){
    const collapsed = ref(false);
    const { t } = useI18n();
    const selectedKeys = ref(['/profile']);
    //فعال و غیر فعال کردن collaps منو با تغییر سایز صفحه
     const handleResize = () => {
      if(window.innerWidth >= 768){
        collapsed.value =  false;
      }
      else{
        collapsed.value =  true;
      }
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
    });
    return{collapsed , t , selectedKeys}
}
}
</script>

<style>
</style>