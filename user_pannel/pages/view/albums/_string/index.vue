<template>
  <div>
    <v-container fluid>
      <v-row align="center">
        <v-col v-for="item in newReleases" :key="item.id" md="2" xs="6" cols="6" sm="2">
          <AlbumCard :album="item"></AlbumCard>
        </v-col>
      </v-row>
      <div v-if="loading && !contentOver" class="text-center text-upper overline">
        <v-progress-circular :size="30" color="primary" indeterminate></v-progress-circular>
        <span style="font-size: 1rem;">loading...</span>
      </div>
      <div v-if="contentOver" class="text-center overline">
        No more content to view
      </div>
      <div
        v-if="newReleases.length>0"
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
import AlbumCard from "~/components/AlbumCard";
export default {
  data: () => ({
    newReleases: [],
    loading: false,
    contentOver: false
  }),
  components: { AlbumCard },
  beforeMount: function() {
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
        query: `mutation($index: Int!, $num: Int!,$name: String!){
                albumsListView(index: $index num: $num,filter: { name: $name}){
                    id
                    name
                    imageUrl
                    likes
                    isLike
                    composer{
                        id
                        name
                    }
                }
            }`,
        variables: {
          index: this.newReleases.length,
          num: 2,
          name: this.$route.params.string
        }
      };
      let result = await this.$axios.post("", body, {
        headers: { "Content-Type": "application/json" }
      });
      if (result.data.data.albumsListView.length > 0)
        result.data.data.albumsListView.forEach(element => {
          this.newReleases.push(element);
        });
      else this.contentOver = true;
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.intersector {
  width: 100%;
  height: 30px;
  background-color: rgba(255, 0, 0, 0);
}
</style>