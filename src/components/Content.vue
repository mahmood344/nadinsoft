<template>
  <a-layout-content 
          :style="{ padding: '24px', margin: 0, minHeight: '900px' }"
        >
          <router-view></router-view>
        </a-layout-content>
</template>

<script>
export default {
  name:'ContentComponent'
}
</script>

<style>

</style>