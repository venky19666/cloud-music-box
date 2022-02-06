<template>
  <div>
    <v-container>
      <v-row>
          <v-col v-for="artist in artistData" :key="artist.id" cols="6" md="3" lg="3" sm="6" xs="6">
              <ArtistCard :title="artist.name" :imageURL="artist.imageURL" :url="'/artist/'+artist.id"></ArtistCard>
          </v-col>
      </v-row>
      <div v-if="loading && !contentOver" class="text-center text-upper overline">
        <v-progress-circular :size="30" color="primary" indeterminate></v-progress-circular>
        <span style="font-size: 1rem;">loading...</span>
      </div>
      <div v-if="contentOver" class="text-center overline">No more content to view</div>
      <div
        v-if="artistData.length>0"
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
import ArtistCard from '~/components/ArtistCard';
export default {
  components: {ArtistCard},
  data: () => ({
    artistData: [],
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
        query: `mutation($index: Int $num: Int $name: String){
                    artistListView(index: $index, num: $num,filter: {name: $name}){
                      id
                      name
                      imageURL
                      
                    }
                  }`,
        variables: {
          index: this.artistData.length,
          num: 12,
          name: this.$route.params.string
        }
      };
      let result = await this.$axios.post("", body, {
        headers: { "Content-Type": "application/json" }
      });
      if (result.data.data.artistListView.length > 0)
        result.data.data.artistListView.forEach(element => {
          this.artistData.push(element);
        });
      else this.contentOver = true;
      this.loading = false;
    }
  }
};
</script>
