<template>
    <div id="star">
    	<div id="planet">

            <div id="sun"></div>
        </div>
    </div>

</template>

<script lang='js'>

</script>

<style scoped lang="css">
#star {
    /* animation: orbit 10s linear infinite; */
    position: absolute;
    left: 50%;
    top: 50%;
    width: 250px;
    height: 250px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: #DBE6E0;
    box-shadow: 0 0 50px rgba(219, 230, 224, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    background-image:repeating-conic-gradient(red 0%,yellow 15%,red 33%);
}

#planet {
    
    /* position: absolute;
    left: 50%;
    top: 50%; */
    width: 245px;
    height: 245px;
    /* transform: translate(-50%, -50%); */
    border-radius: 50%;
    background: #181818;
    animation: orbit 10s linear infinite;
    /* box-shadow: 0 0 50px rgba(219, 230, 224, 1); */
    display: flex;
    align-items: center;
}
#sun {
    
    width: 15px;
    height: 15px;
    /* transform-origin: 50px ; */
    border-radius: 50%;
    background: #ece7e7;
    box-shadow: 0 0 50px rgba(219, 230, 224, 1);
    /* animation: orbit 10s linear infinite; */
    

    
}

@keyframes orbit {
    0%{
    transform: rotate(0deg);
   }
100%{
    transform: rotate(360deg);
   }
}
</style>