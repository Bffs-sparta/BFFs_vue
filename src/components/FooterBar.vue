<template>

  <footer>
           <img src="@/assets/b.png" alt="BFFs">   
  </footer>  

</template>

<script>
export default {
};
</script>


<style>
main {
    height: auto;
    min-height: 100%;
    padding-bottom: 50px;
}

.container {
  min-height: 1800px;
}

footer {
    height: 50px;
    position: relative;
    transform: translateY(0%);
    background-color: #dddddd; 
    display: flex;
    justify-content: center;
    align-items: center;
}


footer > img {
    width:42px;
    height: 42px;
}

</style>