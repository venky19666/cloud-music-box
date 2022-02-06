<template>
  <div>
    <div class="player-wrapper">
      <div class="song-info">
        <audio class="player"></audio>
        <v-img
          :src="encodeURI(id.imageURL)"
          height="40px"
          max-width="40px"
        ></v-img>
        <span class="mainFontColor--text">
          <div class="song-name">{{ id.name }}</div>
          <div class="artist-name">
            <span v-for="artist in id.singers" :key="artist.id"
              >{{ artist.name }},</span
            >
          </div>
        </span>
        <v-btn icon class="mainFontColor--text">
          <v-icon>more_horiz</v-icon>
        </v-btn>
      </div>
      <div class="player-controls">
        <div class="v-slider">
          <v-slider
            min="0"
            v-model="playerSlider"
            max="100"
            hide-details="true"
            :dense="true"
            color="red"
            height="2"
            @click="changeDuration"
          ></v-slider>
        </div>
        <div class="btn-controls">
          <div class="play-pause-forword-btn">
            <span class="add-to-playlist">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon dark v-on="on" class="mainFontColor--text">
                    <v-icon>playlist_add</v-icon>
                  </v-btn>
                </template>
                <span>add to plalist</span>
              </v-tooltip>
            </span>
            <span class="remove-from-queue">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon dark v-on="on" class="mainFontColor--text">
                    <v-icon>remove_from_queue</v-icon>
                  </v-btn>
                </template>
                <span>remove from queue</span>
              </v-tooltip>
            </span>
            <span class="shuffle">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    :color="getShuffleStatus ? 'black' : '#BDBDBD'"
                    @click="updateSuffleStatus(!getShuffleStatus)"
                    icon
                    dark
                    v-on="on"
                  >
                    <v-icon>shuffle</v-icon>
                  </v-btn>
                </template>
                <span>{{
                  getShuffleStatus ? "shuffle off" : "shuffle on"
                }}</span>
              </v-tooltip>
            </span>
            <span class="play-next-prev">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    @click="playThePrevSong"
                    icon
                    dark
                    v-on="on"
                    class="mainFontColor--text"
                  >
                    <v-icon>skip_previous</v-icon>
                  </v-btn>
                </template>
                <span>play previous</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    @click="playAndpause"
                    icon
                    class="mainFontColor--text"
                    dark
                    v-on="on"
                  >
                    <v-icon large>{{ returnPlayButtonValue }}</v-icon>
                  </v-btn>
                </template>
                <span>pause</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    dark
                    v-on="on"
                    @click="playTheNextSong"
                    class="mainFontColor--text"
                  >
                    <v-icon>skip_next</v-icon>
                  </v-btn>
                </template>
                <span>play next</span>
              </v-tooltip>
            </span>

            <span class="repeat">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    :color="getRepeatStatus == 1 ? 'black' : '#BDBDBD'"
                    @click="updateRepeatStatus(getRepeatStatus == 1 ? 0 : 1)"
                    icon
                    dark
                    v-on="on"
                  >
                    <v-icon>repeat</v-icon>
                  </v-btn>
                </template>
                <span>{{
                  getRepeatStatus == 1 ? "repeat off" : "repeat on"
                }}</span>
              </v-tooltip>
            </span>
            <span class="volume">
              <v-btn class="mainFontColor--text" icon dark v-on="on">
                <v-icon>volume_up</v-icon>
              </v-btn>
            </span>
          </div>
          <div class="mobile-view">
            <v-img
              :src="encodeURI(id.imageURL)"
              height="40px"
              max-width="40px"
            ></v-img>
            <span @click="mobileView = !mobileView" class="mainFontColor--text">
              <div class="song-name">{{ id.name }}</div>
              <div class="artist-name">
                <span v-for="artist in id.singers" :key="artist.id"
                  >{{ artist.name }},</span
                >
              </div>
            </span>
            <v-btn
              @click="playAndpause"
              icon
              class="mainFontColor--text"
              dark
              v-on="on"
            >
              <v-icon large>{{ returnPlayButtonValue }}</v-icon>
            </v-btn>
            <div class="queue-container" v-if="toggleQueue">
              <Queue transition="fab-transition">
                <v-btn
                  class="mainFontColor--text"
                  large
                  icon
                  @click="toggleQueue = !toggleQueue"
                >
                  <v-icon large>keyboard_arrow_down</v-icon>
                </v-btn>
              </Queue>
            </div>
            <div class="player bgColor" v-if="mobileView">
              <v-row no-gutters dense align="center">
                <v-col class="d-flex justify-space-between">
                  <v-btn
                    icon
                    large
                    class="mainFontColor--text ma-2"
                    @click="mobileView = !mobileView"
                  >
                    <v-icon large>keyboard_arrow_down</v-icon>
                  </v-btn>
                  <v-menu absolute offset-y style="max-width: 600px">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        class="ma-2 mainFontColor--text"
                        large
                        icon
                        v-on="on"
                        @click.prevent
                      >
                        <v-icon>more_vert</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item>
                        v-list-icon<v-list-item-title
                          >play next</v-list-item-title
                        >
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>append at last</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row no-gutters justify="center" align="center">
                <v-col cols="12">
                  <v-img
                    :src="encodeURI(id.imageURL)"
                    class="mx-auto mt-8"
                    height="30vh"
                    width="30vh"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row dense justify="center">
                <v-col cols="12" class="mainFontColor--text">
                  <div class="text-center headline">{{ id.name }}</div>
                  <div class="text-center subtitle-1">
                    <span v-for="artist in id.singers" :key="artist.id"
                      >{{ artist.name }},</span
                    >
                  </div>
                </v-col>
              </v-row>
              <div class="function-buttons">
                <div>
                  <v-btn icon class="mainFontColor--text">
                    <v-icon>playlist_add</v-icon>
                  </v-btn>
                </div>
                <div>
                  <v-btn icon class="mainFontColor--text">
                    <v-icon>remove_from_queue</v-icon>
                  </v-btn>
                </div>
                <div>
                  <v-btn icon class="mainFontColor--text">
                    <v-icon>queue_music</v-icon>
                  </v-btn>
                </div>
              </div>
              <div class="btn-controls">
                <v-slider
                  min="0"
                  v-model="playerSlider"
                  max="100"
                  hide-details="true"
                  :dense="true"
                  color="red"
                  height="2"
                  @click="changeDuration"
                ></v-slider>
                <div
                  class="d-flex justify-space-between mainFontColor--text caption mx-2"
                  j
                >
                  <div>{{ returnCurrentDuration }}</div>
                  <div>00</div>
                </div>
                <div class="d-flex justify-space-between">
                  <v-btn
                    :color="getShuffleStatus ? 'black' : '#BDBDBD'"
                    @click="updateSuffleStatus(!getShuffleStatus)"
                    icon
                    dark
                    v-on="on"
                  >
                    <v-icon>shuffle</v-icon>
                  </v-btn>
                  <div>
                    <v-btn
                      @click="playThePrevSong"
                      icon
                      dark
                      v-on="on"
                      class="mainFontColor--text"
                    >
                      <v-icon>skip_previous</v-icon>
                    </v-btn>
                    <v-btn
                      @click="playAndpause"
                      icon
                      class="mainFontColor--text"
                      dark
                      v-on="on"
                    >
                      <v-icon large>{{ returnPlayButtonValue }}</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      dark
                      v-on="on"
                      @click="playTheNextSong"
                      class="mainFontColor--text"
                    >
                      <v-icon>skip_next</v-icon>
                    </v-btn>
                  </div>
                  <v-btn
                    :color="getRepeatStatus == 1 ? 'black' : '#BDBDBD'"
                    @click="updateRepeatStatus(getRepeatStatus == 1 ? 0 : 1)"
                    icon
                    dark
                    v-on="on"
                  >
                    <v-icon>repeat</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="next-song-container">
        <v-btn
          text
          :block="true"
          class="mainFontColor--text"
          @click="toggleQueue = !toggleQueue"
        >
          <v-icon>queue_music</v-icon>Queue
        </v-btn>
        <div class="queue-container" v-if="toggleQueue">
          <Queue transition="fab-transition">
            <v-btn
              icon
              @click="toggleQueue = !toggleQueue"
              class="mainFontColor--text"
            >
              <v-icon>keyboard_arrow_down</v-icon>
            </v-btn>
          </Queue>
        </div>
      </div>
    </div>
  </div>
</template>
 <script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import Queue from "~/components/queue";
export default {
  name: "player",
  components: {
    Queue,
  },
  props: {
    id: {
      default: 0,
      type: Object,
    },
  },
  data: function () {
    return {
      message: "this is my message.",
      iconBtnColor: "black",
      myslider: 0,
      on: "",
      toggleQueue: false,
      mobileView: false,
      data: null,
      status: false,
      timer: null,
      playing: {},
    };
  },
  computed: {
    ...mapGetters([
      "getPlayerSliderPos",
      "getPlayingStatus",
      "getShuffleStatus",
      "getRepeatStatus",
    ]),
    playerSlider: {
      get() {
        return this.getPlayerSliderPos;
      },
      set(value) {
        this.updateSliderPos(value);
      },
    },
    returnPlayButtonValue: function () {
      if (this.getPlayingStatus) {
        return "pause_circle_outline";
      } else {
        return "play_circle_outline";
      }
    },
    returnCurrentDuration: function () {
      const player = document.querySelector(".player");
      return player.currentTime / 60;
    },
  },
  methods: {
    ...mapMutations([
      "updateSliderPos",
      "changePlayingStatus",
      "updateRepeatStatus",
      "updateSuffleStatus",
    ]),
    ...mapActions([
      "updatePlayerDuration",
      "playTheNextSong",
      "playThePrevSong",
    ]),
    changeDuration: function () {
      this.updatePlayerDuration(this.getPlayerSliderPos);
    },
    playAndpause: function () {
      const player = document.querySelector(".player");
      if (this.getPlayingStatus) {
        player.pause();
      } else {
        player.play();
      }
    },
  },
  mounted: function () {
    const player = document.querySelector(".player");
    player.addEventListener("ended", this.playTheNextSong);
    player.addEventListener("play", () => {
      this.changePlayingStatus(true);
    });
    player.addEventListener("pause", () => {
      this.changePlayingStatus(false);
    });
  },
};
</script>
 <style lang="scss" scoped>
.player-wrapper {
  display: block;
  width: 100%;
  .song-info {
    display: inline-flex;
    z-index: 100;
    width: 250px;
    align-items: center;
    float: left;
    span {
      margin-left: 5px;
      margin-right: auto;
      color: black;
      width: 150px;
      padding: 0px;

      .song-name {
        font-size: 16px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin: 0px;
        padding: 0px;
      }
      .artist-name {
        font-size: 12px;
        margin-top: -7px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  .player-controls {
    display: block;
    width: calc(100% - calc(350px + 250px));
    float: left;
    position: relative;
    z-index: 200;
    .v-slider {
      padding: 0px;
      margin: 0px;
    }
    .btn-controls {
      .play-pause-forword-btn {
        width: 100%;
        display: inline-flex;
        .add-to-playlist {
          margin-left: 20px;
        }
        .shuffle {
          margin-left: auto;
          margin-right: 20px;
        }
        .repeat {
          margin-left: 20px;
          margin-right: auto;
        }
        .volume {
          margin-right: 10px;
        }
      }
      .mobile-view {
        display: none;
        z-index: 200;
      }
    }
  }
  .next-song-container {
    width: 350px;
    height: 40px;
    float: left;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    .queue-container {
      position: absolute;
      background-color: #fff;
      width: 350px;
      overflow-x: hidden;
      height: calc(100vh - calc(64px + 40px));
      overflow-y: scroll;
      bottom: 43px;
      right: -13px;
    }
  }
}
@media only screen and (max-width: 970px) and (min-width: 600px) {
  .player-wrapper {
    // .song-info {
    // }
    .player-controls {
      width: calc(100% - 350px);
      // .btn-controls {
      //   .play-pause-forword-btn {
      //   }
      // }
      .mobile-view {
        display: none;
      }
    }
    .next-song-container {
      width: 100px;
    }
  }
}
@media only screen and (max-width: 650px) and (min-width: 250px) {
  .player-wrapper {
    .song-info {
      display: none;
    }
    .player-controls {
      width: 100%;
      .btn-controls {
        .play-pause-forword-btn {
          display: none;
          .add-to-playlist {
            display: none;
          }
          .remove-from-queue {
            display: none;
          }
        }
        .mobile-view {
          display: inline-flex;
          position: relative;
          width: 100%;
          align-items: center;
          float: left;
          span {
            margin-left: 5px;
            margin-right: auto;
            color: black;
            width: 150px;
            padding: 0px;

            .song-name {
              font-size: 16px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              margin: 0px;
              padding: 0px;
            }
            .artist-name {
              font-size: 12px;
              margin-top: -7px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
          }
          .queue-container {
            position: absolute;
            overflow-y: scroll;
            bottom: 40px;
            width: 100%;
            height: calc(100vh - 40px);
          }
          .player {
            position: absolute;
            width: 100%;
            overflow: hidden;
            height: 100vh;
            z-index: 400;
            bottom: 0px;
            .btn-controls {
              position: absolute;
              bottom: 0px;
              width: 100%;
              height: 65px;
              box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
                0px 4px 5px 0px rgba(0, 0, 0, 0.14),
                0px 1px 10px 0px rgba(0, 0, 0, 0.12) !important;
            }
            .function-buttons {
              position: absolute;
              top: 10vh;
              right: 0px;
            }
          }
        }
      }
    }
    .next-song-container {
      display: none;
    }
  }
}
</style>