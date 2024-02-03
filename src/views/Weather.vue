<template>
  <a-row>
    <a-col :style="locale=='fa'?'direction:rtl':'direction:ltr'" :xs="24">
      <a-form v-on:submit="sendCityName" style="display:flex;justify-content:center;">
        <a-form-item
      name="username"
    >
      <a-input required v-model:value="cityName" :placeholder="$t('inputWeather')"/>
    </a-form-item>
        <a-button style="margin-left:10px;margin-right:10px;" type="primary" :loading="loading" html-type="submit">{{ $t('searchBtn') }}</a-button>
    </a-form>
    </a-col>
    <a-col :xs="24">
      <div style="display:flex;justify-content:center;padding: 30px;text-align:center;">
    <a-card :bordered="false" style="width: 900px;height: 400px">
      <div v-if="!showCardWeather"><a-typography-title :level="3">{{ $t('emtyCity') }}</a-typography-title></div>
      <div v-else>
      <a-typography-title :level="3">{{ cityResult }}</a-typography-title>
      <a-typography-title :level="3">{{ temprateResult }} °C</a-typography-title>
      <a-typography-title :level="3">{{ TypeWeather }}</a-typography-title>
      </div>
    </a-card>
  </div>
    </a-col>
  </a-row>
</template>

<script>
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import { ref } from 'vue';
import {SateManegment} from  '../../store/index.js';
export default {
  name:'WeatherPage',
setup(){
  const { t , locale } = useI18n();
  const cityName = ref(null);
  const loading = ref(false);
  const showCardWeather = ref(false);
  const store = SateManegment();
  const cityResult = ref(null);
  const temprateResult = ref(null);
  const TypeWeather = ref(null);
  // تابع دریاف مختصات شهر
  function sendCityName(){
    loading.value = true;
    axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName.value}&count=10&language=en&format=json`)
    .then((response1)=>{
      //دریافت اطلاعات هواشناسی
      axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${response1.data.results[0].latitude}&longitude=${response1.data.results[0].longitude}&current_weather=true`)
    .then((response2)=>{
      loading.value = false;
      cityName.value = null;
      cityResult.value = response1.data.results[0].admin1;
      temprateResult.value = response2.data.current_weather.temperature;
      // تابع دریافت نوع هوا بر اساس کد دریافتی
      calculateTypeWeather(response2.data.current_weather.weathercode);
      showCardWeather.value = true;
    })
    .catch((data)=>{
      store.setMessage({
      type:'error',
      messageText:'not found'
    });
    setTimeout(() => {
      store.setMessage(null);
    }, 2000);
    })
    })
    .catch((error)=>{
      store.setMessage({
      type:'error',
      messageText:'Please enter the city name correctly'
    });
    setTimeout(() => {
      loading.value = false;
      cityName.value = null;
      store.setMessage(null);
    }, 2000);
    })
  }
  function calculateTypeWeather(type){
  if(locale.value == 'fa' && type == 0){
      TypeWeather.value = 'آسمان صاف'
  }
 else if(locale.value == 'en' && type == 0){
      TypeWeather.value = 'Clear sky'
  }
  else if(locale.value == 'fa' && (type == 1 || type == 2 || type == 3)){
      TypeWeather.value = 'عمدتاً صاف، نیمه ابری و ابری'
  }
  else if(locale.value == 'en' && (type == 1 || type == 2 || type == 3)){
      TypeWeather.value = 'Mainly clear, partly cloudy, and overcast'
  }
  else if(locale.value == 'fa' && (type == 45 || type == 48)){
      TypeWeather.value = 'مه و رسوب مه ریم'
  }
  else if(locale.value == 'en' && (type == 45 || type == 48)){
      TypeWeather.value = 'Fog and depositing rime fog'
  }
  else if(locale.value == 'fa' && (type == 51 || type == 53 || type == 55)){
      TypeWeather.value = 'نم نم باران: شدت خفیف، متوسط ​​و متراکم'
  }
  else if(locale.value == 'en' && (type == 51 || type == 53 || type == 55)){
      TypeWeather.value = 'Drizzle: Light, moderate, and dense intensity'
  }
  else if(locale.value == 'fa' && (type == 56 || type == 57)){
      TypeWeather.value = 'نم انجماد: شدت سبک و متراکم'
  }
  else if(locale.value == 'en' && (type == 56 || type == 57)){
      TypeWeather.value = 'Freezing Drizzle: Light and dense intensity'
  }
  else if(locale.value == 'fa' && (type == 61 || type == 63 || type == 65)){
      TypeWeather.value = 'باران: شدت خفیف، متوسط ​​و شدید'
  }
  else if( locale.value == 'en' && (type == 61 || type == 63 || type == 65)){
      TypeWeather.value = 'Rain: Slight, moderate and heavy intensity'
  }
   else if(locale.value == 'fa' && (type == 66 || type == 67)){
      TypeWeather.value = 'باران انجمادی: شدت سبک و سنگین'
  }
  else if(locale.value == 'en' && (type == 66 || type == 67)){
      TypeWeather.value = 'Freezing Rain: Light and heavy intensity'
  }
  else if(locale.value == 'fa' && (type == 71 || type == 73 || type == 75)){
      TypeWeather.value = 'بارش برف: شدت خفیف، متوسط ​​و سنگین'
  }
  else if(locale.value == 'en' && (type == 71 || type == 73 || type == 75)){
      TypeWeather.value = 'Snow fall: Slight, moderate, and heavy intensity'
  }
  else if(locale.value == 'fa' && type == 77){
      TypeWeather.value = '	دانه های برف'
  }
  else if(locale.value == 'en' && type == 77){
      TypeWeather.value = 'Snow grains'
  }
  else if(locale.value == 'fa' && (type == 80 || type == 81 || type == 82)){
      TypeWeather.value = 'رگبار باران: خفیف، متوسط ​​و شدید'
  }
  else if(locale.value == 'en' && (type == 80 || type == 81 || type == 82)){
      TypeWeather.value = 'Rain showers: Slight, moderate, and violent'
  }
  else if(locale.value == 'fa' && (type == 85 || type == 86)){
      TypeWeather.value = 'بارش برف خفیف و شدید'
  }
  else if(locale.value == 'en' && (type == 85 || type == 86)){
      TypeWeather.value = 'Snow showers slight and heavy'
  }
  else if(locale.value == 'fa' && type == 95){
      TypeWeather.value = 'رعد و برق: خفیف یا متوسط'
  }
  else if(locale.value == 'en' && type == 95){
      TypeWeather.value = 'Thunderstorm: Slight or moderate'
  }
  else if(locale.value == 'fa' && (type == 96 || type == 99)){
      TypeWeather.value = 'رعد و برق همراه با تگرگ خفیف و شدید'
  }
  else if(locale.value == 'en' && (type == 96 || type == 99)){
      TypeWeather.value = 'Thunderstorm with slight and heavy hail'
  }
 }
  return{t , locale , cityName , sendCityName , loading , cityResult , temprateResult , TypeWeather , showCardWeather}
}
}
</script>

<style>

</style>