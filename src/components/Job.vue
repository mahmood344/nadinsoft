<template>
  <a-row  style="border:1px solid rgb(189, 189, 189);border-radius:10px;">
    <a-col style="display:flex;justify-content:center;align-items:center;padding-top:20px" :xs="24" :md="10">
        <p>{{ sendJob.title }}</p>
    </a-col>
    <a-col style="display:flex;justify-content:center;align-items:center;padding-top:20px" :style="locale=='fa'?'direction:rtl':'direction:ltr'" :xs="24" :md="10">
        <a-form v-if="ShowEdit"  v-on:submit="changeTitleEdit" style="display:flex;justify-content:center;">
        <a-form-item
      name="username"
    >
      <a-input required v-model:value="editJob"/>
    </a-form-item>
    <a-form-item>
         <a-button style="margin-left:10px;margin-right:10px;" type="primary" :loading="loading" html-type="submit">{{ $t('editBtn') }}</a-button>
    </a-form-item>
    </a-form>
    </a-col>
    <a-col v-on:click="showEditJob" style="color:green; display:flex;justify-content:center;align-items:center;cursor: pointer;" :xs="24" :md="2"><EditOutlined /></a-col>
    <a-col v-on:click="removeJob" style="color:red;display:flex;justify-content:center;align-items:center;cursor: pointer;" :xs="24" :md="2"><CloseOutlined /></a-col>
  </a-row>
</template>

<script>
import {CloseOutlined , EditOutlined } from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
export default {
  name:'JobComponent',
    components:{
        CloseOutlined,
        EditOutlined
    },
    props:['sendJob'],
    setup(props , content){
        const { t , locale } = useI18n();
        const ShowEdit = ref(false);
        const editJob = ref(props.sendJob.title);
        function showEditJob(){
            ShowEdit.value = true;
        }
        function changeTitleEdit(){
            content.emit('sendTitleEdit', {newJob:editJob.value,oldJob:props.sendJob.title});
            ShowEdit.value = false;
        }
        function removeJob(){
            content.emit('sendRemoveJob', props.sendJob.title);
        }
        return{t , locale , ShowEdit , editJob , showEditJob , changeTitleEdit , removeJob}
    }
}
</script>

<style>

</style>