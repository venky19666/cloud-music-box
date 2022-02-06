<template>
  <div>
    <div class="card-container"  @click="changeRoute('/album/'+album.id)">
      <span @click.stop class="play-icon">
        <v-btn
          color="white"
          large
          transition="scale-transition"
          @click="addAlbumToQueue({id: album.id,where: 'clearAndAppendAlbum'})"
          origin="center center"
          icon
        >
          <v-icon color="primary" size="60">play_arrow</v-icon>
        </v-btn>
      </span>
      <div @click.stop class="card-header">
        <span>
          <v-btn
            @click="doLike({what: 'album',id: album.id,status: !album.isLike})"
            class="ma-0"
            icon
          >
            <v-icon color="primary">{{album.isLike?'favorite':'favorite_border'}}</v-icon>
          </v-btn>
        </span>
        <span>
          <v-menu absolute offset-y style="max-width: 600px">
            <template v-slot:activator="{ on }">
              <v-btn class="ma-0" icon v-on="on" @click.prevent>
                <v-icon color="primary">more_vert</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="addAlbumToQueue({id: album.id,where: 'appendAlbumAtFront'})">
                <v-list-item-title>add at front</v-list-item-title>
              </v-list-item>
              <v-list-item @click="addAlbumToQueue({id: album.id,where: 'appendAlbumAtEnd'})">
                <v-list-item-title>add at end</v-list-item-title>
              </v-list-item>
              <v-list-item @click="addAlbumToQueue({id: album.id,where: 'appendAlbumAtCurrentId'})">
                <v-list-item-title>add after current song</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </span>
      </div>
      <div class="card-art">
        <div class="card-image-box">
          <img :src="album.imageURL" alt />
        </div>
      </div>
      <div class="card-data">
        <div class="card-title text-truncate h4 font-weight-bold" v-text="album.name"></div>
        <div @click.stop class="card-subtitle text-truncate caption font-weight-light">
          <span v-for="(item, index) in album.composer" to="#"  :key="item.id">
            <span @click="changeRoute('#')" style="hover">{{item.name}}</span>
            <span class="primary--text" v-if="index+1<album.composer.length"> || </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => {
    return {};
  },
  props: {
    album: {
      type: Object,
      default: function() {
        return {
          status: null
        };
      }
    }
  },
  computed: {
    
  },
  methods: {
    ...mapActions(["addAlbumToQueue", "ApplyLikes"]),
    doLike: function(obj) {
      let returndata = this.ApplyLikes(obj);
      returndata.then(({data})=>data.data.likes).then(data=>{
        if(data.status){
          this.album.isLike = !this.album.isLike;
        }
      }).catch(err=>{})
    },
    changeRoute: function(string){
      this.$router.push(string);
    }
  }
};
</script>

<style lang="scss" scoped>
.card-container {
  width: 100%;
  // border-radius: 5px;
  margin: 3px;
  position: relative;
  overflow-y: hidden;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  .card-header {
    position: absolute;
    display: none;
    top: 0px;
    left: 0px;
    width: 100%;
    background-color: rgba(5, 5, 5, 0.5);
    // border-top-left-radius: 5px;
    // border-top-right-radius: 5px;
    z-index: 500;
    span {
      &:nth-child(2) {
        margin-left: auto;
      }
    }
  }

  .card-art {
    .card-image-box {
      position: relative;
      img {
        width: 100%;
        display: block;
        // border-top-left-radius: 5px;
        // border-top-right-radius: 5px;
        padding: 0px;
        margin: 0px;
      }
    }
  }

  .card-data {
    .card-title {
      padding: 3px 5px;
    }
    .card-subtitle {
      padding: 0px 5px;
    }
  }
  &:hover {
    .card-header {
      display: flex;
      animation: slidedown 250ms;
    }
    .card-art {
      .card-image-box {
        &:before {
          position: absolute;
          z-index: 250;
          content: "";
          top: 0px;
          left: 0px;
          height: 100%;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.432);
          border: none;
          border-top-left-radius: 5px;
          backdrop-filter: blur(0.5px);
          border-top-right-radius: 5px;
        }
      }
    }
    .card-data{
      .card-title{
        text-decoration: underline;
      }
    }
    .play-icon {
      position: absolute;
      z-index: 500;
      display: block;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .card-subtitle{
    &:hover{
      color: orangered;
    }
  }
  .play-icon {
    display: none;
  }
}
/** animations **/
@keyframes slidedown {
  0% {
    top: -20px;
  }
  100% {
    top: 0px;
  }
}
@keyframes font-animation {
  0% {
    font-size: 0em;
  }
  100% {
    font-size: 3.5em;
  }
}
</style>