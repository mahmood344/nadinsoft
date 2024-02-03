<template>
  <div style="display:flex;justify-content:center;">
      <a-alert style="width:300px;text-align:center" :message="store.message.messageText" :type="store.message.type" />
      </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import {SateManegment} from '../../store/index.js';
export default {
    name:'MessageComponent',
setup(){
    const store = SateManegment();
    const { t } = useI18n();
    return{t , store}
}
}
</script>

<style>

</style>