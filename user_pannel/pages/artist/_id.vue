<template>
  <div>
    <v-container v-if="!loading">
      <v-row>
        <v-col md="3" lg="3" xl="2" sm="6" cols="12">
          <ArtistCard :imageURL="artistInformation.imageURL"></ArtistCard>
        </v-col>
        <v-col class="text-md-left text-sm-left text-lg-left text-xl-left text-center">
          <h1 class="text-h1">{{artistInformation.name}}</h1>
          <div class="h6">
            <v-btn @click="doLike({what: 'artist',id: artistInformation.id,status: !artistInformation.isLike})" color="primary" icon>
              <v-icon>{{artistInformation.isLike?'favorite':'favorite_border'}}</v-icon>
            </v-btn>{{artistInformation.likes}}
          </div>
          <div class="artist-type" style="margin-top:15px;">
            <v-chip v-if="artistInformation.cast.length>0" class="mt-2" outlined pill>
              Actor
              <v-icon right>theaters</v-icon>
            </v-chip>
            <v-chip v-if="artistInformation.singers.length>0" class="mt-2" outlined pill>
              Singer
              <v-icon right>music_note</v-icon>
            </v-chip>
            <v-chip v-if="artistInformation.composer.length>0" class="mt-2" outlined>
              Composer
              <v-icon right>album</v-icon>
            </v-chip>
            <v-chip v-if="artistInformation.lyricitis.length>0" class="mt-2" outlined>
              Lyricist
              <v-icon right>edit</v-icon>
            </v-chip>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="!loading">
      <v-row v-resize="onResize">
        <v-col cols="12">
          <v-tabs v-model="tab" background-color="yellow darken-3" class="elevation-1" fixed-tabs>
            <v-tabs-slider></v-tabs-slider>

            <v-tab v-if="artistInformation.cast.length>0" class="white--text ma-0 pa-0" href="#acted">
              <v-icon color="white" :left="this.windowSize.x>815?true:false">theaters</v-icon>
              <span class="d-none d-sm-none d-md-flex">Acted albums</span>
            </v-tab>
            <v-tab-item v-if="artistInformation.cast.length>0" value="acted">
               <AlbumListCard v-for="album in artistInformation.cast" :key="album.id" :title="album.name"
              :imageURL="album.imageUrl" :artistArray="[album.cast,album.composer]" />
            </v-tab-item>

            <v-tab v-if="artistInformation.composer.length>0" class="white--text" href="#composing">
              <v-icon color="white" :left="this.windowSize.x>815?true:false">album</v-icon>
              <span class="d-none d-sm-none d-md-flex">Composed Albums</span>
            </v-tab>
            <v-tab-item v-if="artistInformation.composer.length>0" value="composing">
              <AlbumListCard v-for="album in artistInformation.composer" :key="album.id" :title="album.name"
              :imageURL="album.imageUrl" :artistArray="[album.cast,album.composer]" />
            </v-tab-item>

            <v-tab v-if="artistInformation.singers.length>0" class="white--text" href="#sunged">
              <v-icon color="white" :left="this.windowSize.x>815?true:false">music_note</v-icon>
              <span class="d-none d-sm-none d-md-flex">Songs sung</span>
            </v-tab>
            <v-tab-item v-if="artistInformation.singers.length>0" value="sunged">
              <SongCard v-for="song in artistInformation.singers" :key="song.id" :song="{...song,artists: [song.singers,song.lyricitis]}"></SongCard>
            </v-tab-item>

            <v-tab v-if="artistInformation.lyricitis.length>0" class="white--text" href="#lyricists">
              <v-icon color="white" :left="this.windowSize.x>815?true:false">edit</v-icon>
              <span class="d-none d-sm-none d-md-flex">songs written</span>
            </v-tab>
            <v-tab-item v-if="artistInformation.lyricitis.length>0" value="lyricists">
              <SongCard v-for="song in artistInformation.lyricitis" :key="song.id" :song="{...song,artists: [song.singers,song.lyricitis]}"></SongCard>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ArtistCard from "~/components/ArtistCard";
import AlbumListCard from "~/components/AlbumListCard";
import SongCard from "~/components/SongCard";
import { mapActions} from "vuex";
export default {
  components: { ArtistCard, AlbumListCard, SongCard },
  data: () => ({
    loading: false,
    tab: "",
    windowSize: { x: 0, y: 0 },
    artistInformation: null
  }),
  computed: {},
  methods: {
     ...mapActions(["updatePlayerAction","ApplyLikes"]),
    onResize: function() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    doLike: async function(obj){
      let returndata = this.ApplyLikes(obj);
      returndata.then(({data})=>data.data.likes).then(data=>{
        if(data.status){
          this.artistInformation.isLike = !this.artistInformation.isLike;
          this.artistInformation.likes = data.likes;
        }
      }).catch(err=>{})
    }
  },
  beforeMount: async function() {
    this.loading = true;
    let body = {
      query: `mutation($id: String){
                    artistDetails(id: $id){
                      id
                      name
                      imageURL
                      likes
                      cast{
                        id
                        name
                        imageURL
                        cast{
                          id
                          name
                          imageURL
                        }
                        composer{
                          id
                          name
                          imageURL
                        }
                      }
                      composer{
                        id
                        name
                        imageURL
                        cast{
                          id
                          name
                          imageURL
                        }
                        composer{
                          id
                          name
                          imageURL
                        }
                      }
                      singers{
                        id
                        name
                        imageURL
                        albumName
                        albumId
                        likes
                        playCount
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
                      }
                      lyricitis{
                        id
                        name
                        imageURL
                        albumName
                        albumId
                        likes
                        playCount
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
                      }
                    }
                  }`,
      variables: {
        id: this.$route.params.id
      }
    };
    try {
      let result = await this.$axios.post("", body, {
        headers: { "Content-Type": "application/json" }
      });
      this.artistInformation = result.data.data.artistDetails;
      // console.log(this.artistInformation);
    } catch (err) {
      // console.log(err);
    }
    this.loading = false;
  }
};
</script>

<style>
</style>