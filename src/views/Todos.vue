<template>
  <a-row>
    <a-col :style="locale=='fa'?'direction:rtl':'direction:ltr'" :xs="24">
      <a-form v-on:submit="addJob" style="display:flex;justify-content:center;">
        <a-form-item
      name="username"
    >
      <a-input required v-model:value="jobTitle" :placeholder="$t('inputTodo')"/>
    </a-form-item>
        <a-button style="margin-left:10px;margin-right:10px;" type="primary" :loading="loading" html-type="submit">{{ $t('addJobBtn') }}</a-button>
    </a-form>
    </a-col>
    <a-col :xs="24">
      <div style="display:flex;justify-content:center;padding: 30px;text-align:center;">
    <a-card :bordered="false" style="width: 900px;min-height: 400px">
      <div v-if="jobs.length == 0"><a-typography-title :level="3">{{ $t('emptyJob') }}</a-typography-title></div>
      <Job v-else v-on:sendRemoveJob="getRemoveJob" v-on:sendTitleEdit="getTitleEdit" style="margin-top:10px;" v-for="(job , index) in jobs" :key="index" :sendJob="job"></Job>
    </a-card>
  </div>
    </a-col>
  </a-row>
</template>

<script>
import { useI18n } from 'vue-i18n';
import Job from '../components/Job.vue';
import { ref } from 'vue';
export default {
  name:'TodoPage',
  components:{
    Job
  },
  setup(){
    const { t , locale } = useI18n();
    const jobs = localStorage.getItem('Jobs')?ref(JSON.parse(localStorage.getItem('Jobs'))):ref([]);
    const jobTitle = ref(null);
    const loading = ref(false);
      // تابع افزودن وظیفه
    function addJob(){
      loading.value = true;
      setTimeout(() => {
        jobs.value.push({
          title:jobTitle.value,
        })
        localStorage.setItem('Jobs' , JSON.stringify(jobs.value));
        jobTitle.value = null;
        loading.value = false;
      }, 1000);
    }
    // تابع ویرایش وظیف
    function getTitleEdit(value){
      let result = jobs.value.find((element)=>{
        return element.title == value.oldJob;
      })
      result.title = value.newJob;
      localStorage.setItem('Jobs' , JSON.stringify(jobs.value));
    }
    // تابع حذف وظیف
    function getRemoveJob(value){
      jobs.value = jobs.value.filter((element)=>{
        return element.title != value;
      })
      localStorage.setItem('Jobs' , JSON.stringify(jobs.value));
    }
    return{t , locale , jobs , jobTitle , addJob , getTitleEdit , getRemoveJob , loading}
  }
}
</script>

<style>

</style>