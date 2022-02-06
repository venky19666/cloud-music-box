<template>
  <div>
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col class="pb-0 mb-0" cols="6">
          <v-text-field
            clearable
            :loading="loading"
            outlined
            v-model="searchString"
            label="Here you can search!"
            append-icon="search"
            @click:append="doSearch"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="pa-0 ma-0" justify="center">
        <v-col cols="12" class="d-flex justify-center pa-0 ma-0">
          <v-radio-group v-model="what" row>
            <v-radio label="All" value="all"></v-radio>
            <v-radio label="Albums" value="album"></v-radio>
            <v-radio label="Songs" value="song"></v-radio>
            <v-radio label="Playlist" value="playlist"></v-radio>
            <v-radio label="Artist" value="artist"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row :justify="what == 'all' ? 'start' : 'center'">
        <v-col
          v-if="
            (what == 'all' && searchStatus) || (what == 'album' && searchStatus)
          "
          xs="12"
          cols="12"
          sm="12"
          :md="what == 'all' ? 4 : 6"
          :xl="what == 'all' ? 3 : 6"
        >
          <v-list subheader>
            <v-subheader>Top searched Albums</v-subheader>
            <v-list-item
              nuxt
              v-for="album in AlbumsList"
              :key="album.id"
              :to="'/album/' + album.id"
            >
              <v-list-item-avatar tile>
                <v-img :src="album.imageURL"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ album.name }}</v-list-item-title>
                <v-list-item-subtitle class="caption">{{
                  new Date(Number.parseInt(album.releaseDate)).getFullYear() +
                  ". " +
                  getArtistString("Composed by ", album.composer)
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <router-link
            v-if="AlbumsList.length > 6"
            class="text-center overline"
            :to="'/view/albums/' + searchString"
            >for more result</router-link
          >
          <div v-if="AlbumsList.length == 0" class="text-center overline">
            nothing found..
          </div>
        </v-col>
        <v-col
          v-if="
            (what == 'all' && searchStatus) || (what == 'song' && searchStatus)
          "
          xs="12"
          cols="12"
          sm="12"
          :md="what == 'all' ? 4 : 6"
          :xl="what == 'all' ? 3 : 6"
        >
          <v-list subheader>
            <v-subheader>Top searched Songs</v-subheader>
            <v-list-item
              v-for="item in SongsList"
              :key="item.id"
              @click="addSongAndPlay(item)"
            >
              <v-list-item-avatar tile>
                <v-img :src="item.imageURL"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle class="caption">{{
                  getArtistString("Sung by ", item.singers) +
                  " " +
                  getArtistString("Lyricis by ", item.lyricitis)
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <router-link
            v-if="SongsList.length > 6"
            class="text-center overline"
            :to="'/view/songs/' + searchString"
            >for more result</router-link
          >
          <div v-if="SongsList.length == 0" class="text-center overline">
            nothing found..
          </div>
        </v-col>
        <v-col
          v-if="
            (what == 'all' && searchStatus) ||
            (what == 'artist' && searchStatus)
          "
          xs="12"
          cols="12"
          sm="12"
          :md="what == 'all' ? 4 : 6"
          :xl="what == 'all' ? 3 : 6"
        >
          <v-list subheader>
            <v-subheader>Top searched Artists</v-subheader>
            <v-list-item
              nuxt
              v-for="item in ArtistList"
              :key="item.id"
              :to="'/artist/' + item.id"
            >
              <v-list-item-avatar tile>
                <v-img :src="item.imageURL===null?'':item.imageURL"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <router-link
            v-if="ArtistList.length > 6"
            class="text-center overline"
            :to="'/view/artists/' + searchString"
            >for more result</router-link
          >
          <div v-if="ArtistList.length == 0" class="text-center overline">
            nothing found..
          </div>
        </v-col>
        <v-col
          v-if="
            (what == 'all' && searchStatus) ||
            (what == 'playlist' && searchStatus)
          "
          xs="12"
          cols="12"
          sm="12"
          :md="what == 'all' ? 4 : 6"
          :xl="what == 'all' ? 3 : 6"
        >
          <v-list two-line subheader>
            <v-subheader>Top searched Playlist</v-subheader>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  data: () => ({
    searchString: null,
    what: "all",
    AlbumsList: [],
    SongsList: [],
    ArtistList: [],
    PlaylistList: [],
    searchStatus: false,
    loading: false,
  }),
  methods: {
    doSearch: async function () {
      this.loading = true;
      if (this.what == "all" || this.what == "album") {
        let body = {
          query: `mutation($name: String!){
                albumsListView(index: 0 num: 8 filter: {name: $name}){
                    id
                    name
                    imageURL
                    releaseDate
                    composer{
                        id
                        name
                    }
                }
            }`,
          variables: {
            name: this.searchString,
          },
        };
        let result = await this.$axios.post("", body, {
          headers: { "Content-Type": "application/json" },
        });
        // console.log(result.data.data.albumsListView);
        this.AlbumsList = result.data.data.albumsListView;
        this.searchStatus = true;
      }
      if (this.what == "all" || this.what == "song") {
        let body = {
          query: `mutation($name: String!){
                    songsListView(index:0 num: 8 filter: {name: $name}){
                      id
                      name
                      singers{
                        id
                        name
                      }
                      lyricitis{
                        id
                        name
                      }
                      imageURL
                      albumId
                      albumName
                    }
                  }`,
          variables: {
            name: this.searchString,
          },
        };
        let result = await this.$axios.post("", body, {
          headers: { "Content-Type": "application/json" },
        });
        // console.log(result.data.data.songsListView);
        this.SongsList = result.data.data.songsListView;
        this.searchStatus = true;
      }
      if (this.what == "all" || this.what == "artist") {
        let body = {
          query: `mutation($name: String){
                    artistListView(index: 0, num:8,filter: {name: $name}){
                      id
                      name
                      imageURL
                    }
                  }`,
          variables: {
            name: this.searchString,
          },
        };
        let result = await this.$axios.post("", body, {
          headers: { "Content-Type": "application/json" },
        });
        console.log(result.data.data.artistListView);
        this.ArtistList = result.data.data.artistListView;
        this.searchStatus = true;
      }
      this.loading = false;
    },
    parseISOString: function (s) {
      var b = s.split(/\D+/);
      return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    },
    getArtistString: function (artistType, artists) {
      let returnString = artistType;
      artists.forEach((element, index) => {
        returnString +=
          " " + element.name + (index + 1 == artists.length ? "." : " , ");
      });
      return returnString;
    },
    ...mapMutations(["pushAtFrontOfQueue"]),
    ...mapActions(["updatePlayerAction"]),
    addSongAndPlay: function (obj) {
      this.pushAtFrontOfQueue(obj);
      this.updatePlayerAction(obj.id.toString());
    },
  },
};
</script>

<style lang="scss" scoped>
.text-center {
  display: block !important;
}
</style>