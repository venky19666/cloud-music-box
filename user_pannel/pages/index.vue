<template>
  <div>
    <v-container class="mb-6">
      <v-row>
        <v-col cols="12">
          <div class="headline">New Releases</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" v-if="NewReleaseData.length>0" class="slider-container">
          <carousel :nav="false" :responsive="responsive" :margin="15">
            <template slot="prev">
              <span class="prev-btn">
                <v-btn class="primary" icon>
                  <v-icon>navigate_before</v-icon>
                </v-btn>
              </span>
            </template>
            <template slot="next">
              <span class="next-btn">
                <v-btn class="primary" icon>
                  <v-icon>navigate_next</v-icon>
                </v-btn>
              </span>
            </template>
            <div v-for="item in NewReleaseData" :key="item.id">
              <AlbumCard :album="item"></AlbumCard>
            </div>
          </carousel>
        </v-col>
      </v-row>
      <v-row v-if="NewReleaseData.length==0" class="boiler">
        <v-col cols="2">
          <v-skeleton-loader
            ref="skeleton"
            :boilerplate="false"
            type="card,sentences"
            :tile="false"
            class="mx-auto"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="2">
          <v-skeleton-loader
            ref="skeleton"
            :boilerplate="false"
            type="card,sentences"
            :tile="false"
            class="mx-auto"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="2">
          <v-skeleton-loader
            ref="skeleton"
            :boilerplate="false"
            type="card,sentences"
            :tile="false"
            class="mx-auto"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="2">
          <v-skeleton-loader
            ref="skeleton"
            :boilerplate="false"
            type="card,sentences"
            :tile="false"
            class="mx-auto"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="2">
          <v-skeleton-loader
            ref="skeleton"
            :boilerplate="false"
            type="card,sentences"
            :tile="false"
            class="mx-auto"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="2">
          <v-skeleton-loader
            ref="skeleton"
            :boilerplate="false"
            type="card,sentences"
            :tile="false"
            class="mx-auto"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="headline">Most played</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" v-if="MostPlayed.length>0" class="slider-container">
          <carousel :responsive="responsive" :margin="15">
            <template slot="prev">
              <span class="prev-btn">
                <v-btn class="primary" icon>
                  <v-icon>navigate_before</v-icon>
                </v-btn>
              </span>
            </template>
            <template slot="next">
              <span class="next-btn">
                <v-btn class="primary" icon>
                  <v-icon>navigate_next</v-icon>
                </v-btn>
              </span>
            </template>
            <div v-for="item in MostPlayed" :key="item.id">
              <AlbumCard :album="item"></AlbumCard>
            </div>
          </carousel>
        </v-col>
      </v-row>
      <v-row v-if="MostPlayed.length==0" class="boiler">
        <v-col cols="2">
          <v-skeleton-loader
            ref="skeleton"
            :boilerplate="false"
            type="card,sentences"
            :tile="false"
            class="mx-auto"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="2">
          <v-skeleton-loader
            ref="skeleton"
            :boilerplate="false"
            type="card,sentences"
            :tile="false"
            class="mx-auto"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="2">
          <v-skeleton-loader
            ref="skeleton"
            :boilerplate="false"
            type="card,sentences"
            :tile="false"
            class="mx-auto"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="2">
          <v-skeleton-loader
            ref="skeleton"
            :boilerplate="false"
            type="card,sentences"
            :tile="false"
            class="mx-auto"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="2">
          <v-skeleton-loader
            ref="skeleton"
            :boilerplate="false"
            type="card,sentences"
            :tile="false"
            class="mx-auto"
          ></v-skeleton-loader>
        </v-col>
        <v-col cols="2">
          <v-skeleton-loader
            ref="skeleton"
            :boilerplate="false"
            type="card,sentences"
            :tile="false"
            class="mx-auto"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AlbumCard from '~/components/AlbumCard';
import {mapActions} from "vuex";
import carousel from "vue-owl-carousel";
export default {
  data: () => ({
    on: false,
    responsive: {
      0: {
        items: 1,
        nav: false,
        dots: false
      },
      320: {
        items: 2,
        nav: false,
        dots: false
      },
      480: {
        items: 2,
        nav: false,
        dots: false
      },
      600: {
        items: 3,
        nav: false
      },
      800: {
        items: 6,
        nav: false
      }
    },
    NewReleaseData: [],
    MostPlayed: []
  }),
  components: { carousel,AlbumCard },
  methods: {
    ...mapActions(['addAlbumToQueue']),
  },
  computed: {},
  beforeCreate: async function() {
    let body = {
      query: `mutation{
                albumsListView(index: 0 num: 8){
                    id
                    name
                    imageURL
                    likes
                    isLike
                    composer{
                        id
                        name
                    }
                }
            }`
    };
    let result = await this.$axios.post('', body, {
      headers: { "Content-Type": "application/json" }
    });
    this.NewReleaseData = result.data.data.albumsListView;
    body = {
      query: `mutation{
                albumsListView(index: 0 num: 8 filter: {likes: true}){
                    id
                    name
                    imageURL
                    likes
                    isLike
                    composer{
                        id
                        name
                    }
                }
            }`
    };
    result = await this.$axios.post("", body, {
      headers: { "Content-Type": "application/json" }
    });
    this.MostPlayed = result.data.data.albumsListView;
  }
};
</script>
<style lang="scss" scoped>
.slider-container {
  position: relative;
  .prev-btn {
    position: absolute;
    top: 35%;
    left: 2px;
    z-index: 100;
  }
  .next-btn {
    position: absolute;
    top: 35%;
    right: 2px;
    z-index: 100;
  }
}
</style>