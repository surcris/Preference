<script setup>
import HeaderComponent from './components/ToolsComponent/HeaderComponent.vue';
import { RouterView } from 'vue-router';


</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
    integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link
    href="https://fonts.googleapis.com/css2?family=Kodchasan:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
    rel="stylesheet">
  <HeaderComponent />
  <div class="main-container">
    <RouterView/>
  </div>
  <!--<div class="bc-forme-1">

  </div>
  <div class="bc-forme-2">

</div>
<div class="bc-forme-3">

</div>
<div class="bc-forme-4">

</div>-->
</template>

<style scoped>

#app{
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.main-container{
  
  flex: 1;
}

[class*="bc-forme"]{
  position: absolute;
  display: none;
}
@media (max-width: 450px) {
  .bc-forme-1{
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%,50%);
    z-index: -1;
    display: block;
    width: 65px;
    height: 65px;
    flex-shrink: 0;
    border-radius: 65px;
    background: rgba(255, 255, 255, 0.50);
    filter: blur(9px);
  }
  .bc-forme-4{
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%,50%);
    z-index: -1;
    display: block;
    width: 65px;
    height: 65px;
    flex-shrink: 0;
    border-radius: 65px;
    background: #7B0606;
    box-shadow: -6px -3px 5px 0px rgba(0, 0, 0, 0.25);
    filter: blur(2px);
  }
  .bc-forme-2{
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%,50%);
    z-index: -1;
    display: block;
    width: 100px;
    height: 100px;
    flex-shrink: 0;
    border-radius: 100px;
    background: #1F2127;
    filter: blur(10px);
  }
  .bc-forme-3{
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%,50%);
    z-index: -1;
    display: block;
    width: 150px;
    height: 150px;
    flex-shrink: 0;
    border-radius: 150px;
    background: #D9D9D9;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    filter: blur(3.5px);
  }
}
</style>
