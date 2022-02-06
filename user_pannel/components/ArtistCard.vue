<template>
  <div>
    <router-link :to="url!=undefined?url:'#'">
      <div class="container">
        <div class="image">
          <img :src="imageURL" alt />
        </div>
        <div v-if="title!=undefined" class="title">{{title}}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    imageURL: String,
    title: String,
    url: String
  }
};
</script>

<style lang="scss" scoped>
* a {
  text-decoration: none !important;
}
.container {
  width: 100%;
  .image {
    margin: auto;
    width: 150px;
    img {
      width: 100%;
      height: 150px;
      border-radius: 100%;
    }
  }
  .title {
    text-align: center;
    text-transform: capitalize;
    text-decoration: none !important;
  }
}
</style>