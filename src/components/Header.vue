<template>
  <a-layout-header theme="light">
        <a-typography-title style="color:white;padding-top:20px;" :style="locale=='fa'?'text-align:end':'text-align:start'" :level="5">{{ t('titleHeader') }}</a-typography-title>
        </a-layout-header>
</template>

<script>
import { useI18n } from 'vue-i18n';
export default {
  name:'HeaderComponent',
    setup(){
        const { t , locale  } = useI18n();
      return{t , locale}
    }
}
</script>

<style>

</style>