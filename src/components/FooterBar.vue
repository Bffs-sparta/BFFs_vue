<template>
  <footer>
       <img src="@/assets/b.png" alt="BFFs">   
  </footer>  
</template>

<script>
export default {

}
</script>

<style scoped>
main {
    height: auto;
    min-height: 100%;
    padding-bottom: 70px;
}

footer {
    height: 70px;
    background-color: #dddddd;
    position: relative;
    transform: translateY(100%);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
}


footer  > img {
    width:42px;
    height: 42px;
}

</style>