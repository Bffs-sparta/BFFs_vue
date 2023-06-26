<template>
  <div>
    <footer>
      <img src="@/assets/b.png" alt="BFFs">
    </footer>
  </div>    
</template>

<script>
export default {
};
</script>

<style scoped>
footer {
    height: 70px;
    background-color: #dddddd;
    position : relative;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
}

main {
    height: auto;
    min-height: 100%;
    padding-bottom: 70px;
}


footer > img {
    width:42px;
    height: 42px;
}

</style>