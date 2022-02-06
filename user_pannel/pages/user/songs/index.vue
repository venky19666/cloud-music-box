<template>
  <div>
    <v-container fluid>
      <v-row no-gutters align="center">
        <v-col cols="12">
          <div class="header-container overline h4">
            <div>#</div>
            <div>song name</div>
            <div>singers</div>
            <div>lyricitis</div>
            <div>likes</div>
            <div>plays</div>
            <div></div>
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters v-for="(item,index) in songs" :key="index" align="center">
        <v-col cols="12">
          <SongCard :song="{...item,artists: [item.singers,item.lyricitis]}"></SongCard>
        </v-col>
      </v-row>
      <div v-if="loading && !contentOver" class="text-center text-upper overline">
        <v-progress-circular :size="30" color="primary" indeterminate></v-progress-circular>
        <span style="font-size: 1rem;">loading...</span>
      </div>
      <div v-if="contentOver" class="text-center overline">No more content to view</div>
      <div
        v-if="songs.length>0"
        class="intersector"
        v-intersect.quiet="{
            handler: loadMoreContent,
            options: {
              threshold: [0, 0.5, 1.0]
            }
          }"
      ></div>
    </v-container>
  </div>
</template>

<script>
import SongCard from "~/components/SongCard";
export default {
  components: { SongCard },
  middleware: ['isAuthrised'],
  data: () => ({
    songs: [],
    loading: false,
    contentOver: false
  }),
  beforeMount: async function() {
    this.getData();
  },
  methods: {
    loadMoreContent: function(entries, observer) {
      if (entries[0].intersectionRatio >= 0.5) {
        if (!this.loading && !this.contentOver) {
          this.getData();
        }
      }
    },
    getData: async function() {
      this.loading = true;
      let body = {
        query: `mutation($index: Int $num: Int){
                  songsListView(index:$index num: $num filter: {user: true}){
                    id
                    name
                    singers{
                      id
                      name
                      imageURL
                    }
                    lyricitis{
                      id
                      name
                      imageURL
                    }
                    likes
                    isLike
                    imageURL
                    albumId
                    albumName
                    playCount
                  }
                }`,
        variables: {
          index: this.songs.length,
          num: 25,
        }
      };
      let result = await this.$axios.post("", body, {
        headers: { "Content-Type": "application/json" }
      });
      if (result.data.data.songsListView.length > 0)
        result.data.data.songsListView.forEach(element => {
          this.songs.push(element);
        });
      else this.contentOver = true;
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  align-items: center;
  div {
    &:nth-child(1) {
      width: 40px;
      text-align: center;
    }
    &:nth-child(2) {
      width: 180px;
      margin-right: auto;
    }
    &:nth-child(3) {
      width: calc(100% - 83%);
      margin-right: auto;
    }
    &:nth-child(4) {
      width: calc(100% - 83%);
      margin-right: auto;
    }
    &:nth-child(5) {
      margin-right: auto;
    }
    &:nth-child(6) {
      margin-right: auto;
    }
    &:nth-child(7) {
      margin-right: auto;
    }
  }
}
@media only screen and (max-width: 600px) {
  .header-container {
    font-size: 16px;
    div {
      &:nth-child(3) {
        display: none;
      }
      &:nth-child(4) {
        display: none;
      }
      &:nth-child(5) {
        display: none;
      }
      &:nth-child(6) {
        display: none;
      }
      &:nth-child(7) {
        display: none;
      }
    }
  }
}
</style>