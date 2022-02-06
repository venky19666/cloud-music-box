<template>
  <div>
    <v-app id="keep">
      <v-app-bar app clipped-left dense color="bgColor">
        <v-icon class="mainFontColor--text" @click="drawer = !drawer">menu</v-icon>
        <v-img class="ml-4" src="/logo.jpg" max-width="35"></v-img>
        <h4>Music Box</h4>
        <v-spacer />
        <v-btn v-if="!isLogin" nuxt to="/login" text>Login</v-btn>
        <v-btn v-if="!isLogin" nuxt to="/register" text>Sinup</v-btn>
        <v-menu v-if="isLogin" top close-on-content-click absolute>
          <template v-slot:activator="{ on }">
            <v-avatar :color="returnTrueIfNotImage?'primary':''" size="35" dark v-on="on">
              <v-img
                v-if="!returnTrueIfNotImage"
                :src="getUserData.userImage"
                max-height="35"
              ></v-img>
              <span
                v-if="returnTrueIfNotImage"
                class="white--text text-uppercase subtitle-1"
              >{{getUserData.firstname[0]+getUserData.secondname[0]}}</span>
            </v-avatar>
          </template>
          <v-card elevation="0" class="text-center pt-6">
            <v-col cols="12">
              <v-avatar size="48" :color="returnTrueIfNotImage?'primary':''">
              <v-img
                v-if="!returnTrueIfNotImage"
                :src="getUserData.userImage"
              ></v-img>
              <span
                v-if="returnTrueIfNotImage"
                class="white--text text-uppercase headline"
              >{{getUserData.firstname[0]+getUserData.secondname[0]}}</span>
            </v-avatar>
            </v-col>
            <v-card-text
              class="py-1 text-capitalize"
            >{{getUserData.firstname+' '+getUserData.secondname}}</v-card-text>
          </v-card>
          <v-list class="hoverMouse">
            <v-list-item>
              <v-list-item-icon class="pr-2 mx-0">
                <v-icon>lock</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="mx-0">Change password</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logOut">
              <v-list-item-icon class="pr-2 mx-0">
                <v-icon>logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="mx-0">Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" color="bgColor" app clipped>
        <v-list dense :nav="true" color="bgColor" class="mb-8 mainFontColor--text">
          <template v-for="(item, i) in items">
            <v-row v-if="item.heading" :key="i" align="center">
              <v-col cols="6">
                <v-subheader class="primary--text" v-if="item.heading">{{ item.heading }}</v-subheader>
              </v-col>
              <v-col cols="6" class="text-right"></v-col>
            </v-row>
            <v-divider v-else-if="item.divider" :key="i" dark class="my-4" />
            <v-list-item active-class="primary" v-else :key="i" link v-bind:to="item.to">
              <v-list-item-icon>
                <v-icon class="mainFontColor--text">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="mainFontColor--text">{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-content>
        <v-snackbar v-model="snackbarstatus" top multi-line :timeout="SnackBarTimeout">
          {{ SnackBarText }}
          <v-btn color="red" text @click="updateSnackBar(false)">Close</v-btn>
        </v-snackbar>
        <nuxt />
        <v-row
          class="pa-0 ma-0 player-container box-radious bgColor"
          fluid="true"
          :elevation="10-1"
          :no-gutters="true"
        >
          <v-col pa-0 ma-0 cols="12" class="pa-0">
            <Player v-if="getQueueLength>0" :id="getPlayerData"></Player>
          </v-col>
        </v-row>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Player from "~/components/player";
import { mapMutations, mapGetters } from "vuex";
export default {
  middleware: 'bootstrap',
  props: {
    source: String
  },
  components: {
    Player
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: "home", text: "Home", to: "/" },
      { icon: "new_releases", text: "New releases", to: "/new-release" },
      { icon: "trending_up", text: "Top list",to: '/most-liked' },
      { icon: "search", text: "Search", to: '/search' },
      { divider: true },
      { heading: "your's library" },
      { icon: "album", text: "Albums", to:"/user/albums/" },
      { icon: "people_alt", text: "Artists", to: "/user/artists/" },
      { icon: "music_note", text: "Songs", to: "/user/songs/"},
      { icon: "playlist_play", text: "Playlists" },
      { divider: true },
      { icon: "settings", text: "Settings" },
      { icon: "report", text: "Report" },
      { icon: "help", text: "Help" },
      { icon: "feedback", text: "Send feedback" }
      // { icon: 'keyboard', text: 'Keyboard shortcuts' },
    ],
    playerID: 12
  }),
  methods: {
    ...mapMutations(["updatePlayerSong", "updateSnackBar", "updateAuthData"]),
    logOut: function() {
      localStorage.authData = "";
      this.$store.commit("updateAuthData", {});
      this.$axios.setToken(false);
      this.$router.push('/login')
    },
    returnTrueIfNotImage: function() {
      return getUserData.userImage.test(new RegExp("^.*default"));
    }
  },
  computed: {
    ...mapGetters([
      "SnackBarText",
      "SnackBarStatus",
      "SnackBarTimeout",
      "isLogin",
      "getQueueLength",
      "getPlayerData",
      "getUserData"
    ]),
    snackbarstatus: {
      get() {
        return this.SnackBarStatus;
      },
      set(value) {
        this.updateSnackBar(value);
      }
    },
    returnSongURL: function() {
      return this.$store.state.songURL;
    }
  },
};
</script>

<style lang="scss" scoped>
.player-container {
  position: fixed;
  z-index: 2222;
  bottom: 0px;
  left: 0px;
  width: 100%;
}
.hoverMouse {
  cursor: pointer !important;
}
.v-app {
  .v-container {
    .main-container {
      width: 100%;
      background-color: red;
      .nuxt-container {
        background-color: green;
        width: 500px;
      }
    }
  }
}
.box-radious {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12) !important;
}
</style>
