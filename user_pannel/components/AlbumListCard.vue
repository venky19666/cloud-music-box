<template>
  <div>
    <router-link to="/">
      <div class="list-container">
        <div class="list-image">
          <img :src="imageURL" alt />
        </div>
        <div class="list-data">
          <div class="title">{{title}}</div>
          <div class="subtitle" v-if="subtitle!=undefined">{{subtitle}}</div>
        </div>
        <div v-for="(artists, index) in artistArray" :key="index" class="singers">
          <div v-for="artist in artists" :key="artist.id" class="chip-container">
            <img :src="artist.imageURL" alt />
            <span>{{artist.name}}</span>
          </div>
        </div>
        <div class="likes">{{likes}}</div>
        <div class="playcount">{{playcount}}</div>
        <div class="menu">
          <v-menu v-model="showMenu" absolute offset-y style="max-width: 600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click.prevent icon v-on="on" v-bind="attrs">
                <v-icon class="primary--text">more_vert</v-icon>
              </v-btn>
            </template>

            <v-list width="200" max-width="400">
              <v-list-item>
                <v-list-item-title>item1</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  props: {
    title: String,
    subtitle: String,
    imageURL: String,
    artistArray: Array,
    likes: Number,
    playcount: Number,
    id: String
  },
  data: () => ({
    showMenu: false
  }),
  methods: {
    ...mapMutations([""]),
    ...mapActions([""]),
  }
};
</script>

<style lang="scss" scoped>
* {
  font-size: 1rem;
  padding: 0px;
  margin: 0px;
}
.list-container {
  width: 100%;
  display: flex;
  align-items: center;
  .list-controller {
  }
  .list-image {
    img {
      width: 30px;
      display: inline-block;
      vertical-align: bottom;
      margin-right: 5px;
    }
  }
  .list-data {
    width: 150px;
    .title {
      font-weight: 500;
      font-size: 1em !important;
      width: 95%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis !important;
    }
    .subtitle {
      font-weight: 400;
      font-size: 0.6em;
      margin-top: -12px;
      width: 95%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis !important;
    }
  }
  .singers {
    width: calc(100% - 83%);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis !important;
    margin-right: auto;
    .chip-container {
      display: inline-flex;
      vertical-align: bottom;
      align-items: center;
      border: 1px solid rgb(109, 109, 109);
      border-radius: 50px;
      img {
        display: inline-block;
        vertical-align: bottom;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      span {
        font-size: 0.7em;
        margin-left: 5px;
        width: 50px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis !important;
      }
    }
    .limited-width {
      width: 60px !important;
      overflow: hidden !important;
      white-space: nowrap !important;
      text-overflow: ellipsis !important;
    }
  }
  .menu {
    margin-left: auto;
  }
  .likes,
  .playcount {
    margin-left: auto;
  }
  * a {
    color: rgb(85, 84, 84);
  }
  &:hover {
    * a {
      color: orangered !important;
    }
    .singers {
      .chip-container {
        border-color: orangered;
      }
    }
    color: orangered;
    background-color: rgba(206, 206, 206, 0.788);
    border-radius: 5px;
  }
}
* a {
  text-decoration: none;
  color: rgb(85, 84, 84) !important;
}
@media only screen and (max-width: 600px) {
  .list-container {
    .singers {
      display: none;
      width: 75%;
    }
    .likes,
    .playcount {
      display: none;
    }
  }
}
</style>