<template>
<a-row>
    <a-col :style="locale=='fa'?'direction:rtl':'direction:ltr'" style="padding: 30px;display: flex;justify-content:center;align-items:center" :xs="24">
        <a-card :bordered="false" style="width: 800px">
     <a-typography-title :level="3" style="text-align:center">{{ hours <= 9?0:'' }}{{ hours == 0?"0":hours }}:{{ new Date().getMinutes()<=9?0:'' }}{{ new Date().getMinutes() }}</a-typography-title>
      <a-typography-title :level="3" style="text-align:center">{{ message }} , {{ user }}</a-typography-title>
    </a-card>
    </a-col>
</a-row>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { ref , onMounted } from 'vue';
export default {
    name:'HomePage',
setup(){
    const { locale , t } = useI18n();
    const message = ref();
    const user = localStorage.getItem('dataUser')?JSON.parse(localStorage.getItem('dataUser')).name:locale.value=='fa'?'لطفا در بخش پروفایل اسم خودت را وارد کن':'Please enter your name in the profile section';
    const hours = ref(new Date().getHours());
    //تابع برای تشخیص حالات روز بر اساس ساعت 
    function createMessage(){
        if(hours.value >= 0 && hours.value < 12 && locale.value == 'en'){
            message.value = useI18n().messages.value.en.morning
        }
        else if(hours.value >= 0 && hours.value < 12  && locale.value == 'fa'){
            message.value = useI18n().messages.value.fa.morning
        }
        if(hours.value >= 12 && hours.value < 18 && locale.value == 'en'){
            message.value = useI18n().messages.value.en.evening
        }
        else if(hours.value >= 12 && hours.value < 18 && locale.value == 'fa'){
            message.value = useI18n().messages.value.fa.evening
        }
        if(hours.value >= 18 && hours.value <= 23 && locale.value == 'en'){
            message.value = useI18n().messages.value.en.night
        }
        else if(hours.value >= 18 && hours.value <= 23 && locale.value == 'fa'){
            message.value = useI18n().messages.value.fa.night
        }
    }
    onMounted(()=>{
        createMessage()
    })
    return{locale , t , message , user , hours}
}
}
</script>

<style>

</style>