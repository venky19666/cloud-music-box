export const state = () => ({
  player: {},
  slider: null,
  playerTimer: null,
  repeat: 0, // 1 = on, 2 = off, 3 = repeat one
  shuffle: true,
  playing: false,
  isAuth: false,
  queue: [],
  shuffledata: [],
  authData: {
    userID: "",
    userImage: '',
    token: "",
    firstname: '',
    secondname: ''

  },
  snackbar: {
    text: "",
    status: false,
    timeout: null,
  },
});

export const mutations = {
  updateSnackBar: function (state, bar) {
    state.snackbar.text = bar.text || "";
    state.snackbar.status = bar.status || bar;
    state.snackbar.timeout = bar.timeout || 2000;
  },
  updateAuthData: function (state, auth) {
    state.isAuth = auth.isAuth || false;
    state.authData.userID = auth.userID || "";
    state.authData.token = auth.token || "";
    state.authData.userImage = auth.userImage || '';
    state.authData.firstname = auth.firstname || '';
    state.authData.secondname = auth.secondname || '';
  },
  pushAtFrontOfQueue: function (state, obj) {
    if (state.queue.findIndex(item => item.id == obj.id) == -1) { state.queue.unshift(obj); }
    else {
      state.snackbar.text = `${obj.name} is already in Queue`;
      state.snackbar.state = true;
      state.snackbar.timeout = 4000;
    }
  },
  pushAtEndOfQueue: function (state, obj) {
    if (state.queue.findIndex(item => item.id == obj.id) == -1) { state.queue.push(obj); }
    else {
      state.snackbar.text = `${obj.name} is already in Queue`;
      state.snackbar.state = true;
      state.snackbar.timeout = 4000;
    }
  },
  clearTheQueue: function (state) {
    state.queue = [];
  },
  pushAfterCurrentIdOFQueue: function (state, obj) {
    if (state.queue.findIndex(item => item.id == obj.id) == -1) {
      if (state.player.id == undefined) {
        state.queue.unshift(obj);
      } else {
        const indexOfID = state.queue.findIndex(
          (item) => item.id == state.player.id
        );
        if (indexOfID != -1) {
          state.queue.splice(indexOfID + 1, 0, obj);
        } else {
          state.queue.unshift(obj);
        }
      }
    }
    else {
      state.snackbar.text = `${obj.name} is already in Queue`;
      state.snackbar.state = true;
      state.snackbar.timeout = 4000;
    }
  },
  updateQueue: function (state, obj) {
    state.queue = obj;
  },
  updatePlayer: function (state, obj) {
    state.player = obj;
  },
  clearPlayerTimer: function (state) {
    clearInterval(state.playerTimer);
  },
  updateSliderPos: function (state, pos) {
    state.slider = pos;
  },
  updateTimer: function (state, timer) {
    state.playerTimer = timer;
  },
  updateShuffleData: function (state, id) {
    if (id != undefined) {
      state.shuffledata.push(id)
    }
    else {
      state.shuffledata = [];
    }
  },
  changePlayingStatus: function (state, status) {
    state.playing = status;
  },
  updateSuffleStatus: function (state, status) {
    state.shuffle = status;
  },
  updateRepeatStatus: function (state, status) {
    state.repeat = status;
  },
  removeSongFromQueue: function (state, id) {
    let index = state.queue.findIndex(item => item.id == id);
    if (index != -1) {
      state.queue.splice(index, 1);
    }
  },
};
export const getters = {
  SnackBarText: (state) => {
    return state.snackbar.text;
  },
  SnackBarStatus: (state) => {
    return state.snackbar.status;
  },
  SnackBarTimeout: (state) => {
    return state.snackbar.timeout;
  },
  isLogin: (state) => {
    return state.isAuth;
  },
  getUserID: (state) => {
    return state.authData.userID;
  },
  getUserData: (state) => {
    return state.authData;
  },
  getQueue: (state) => {
    return state.queue;
  },
  getQueueLength: (state) => {
    return state.queue.length;
  },
  getServerName: (state) => {
    return state.server;
  },
  getPlayerData: (state) => {
    return state.player;
  },
  getPlayerSliderPos: (state) => {
    return state.slider;
  },
  getPlayingStatus: (state) => {
    return state.playing;
  },
  getShuffleStatus: (state) => {
    return state.shuffle;
  },
  getRepeatStatus: (state) => {
    return state.repeat;
  }
};
export const actions = {
  addAlbumToQueue: async function (context, data) {
    const body = {
      query: `
          mutation($id: String){
            albumDetails(id: $id){
              id
              imageURL
              songs{
                id
                name
                likes
                singers{
                  id
                  name
                  imageURL
                }
              }
            }
          }`,
      variables: {
        id: data.id,
      },
    };
    const result = await this.$axios.post("/graphql", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    if (data.where == 'clearAndAppendAlbum' || data.where===undefined) {
      context.commit("clearTheQueue");
      result.data.data.albumDetails.songs.forEach((song) => {
        song.imageURL = result.data.data.albumDetails.imageURL;
        context.commit("pushAtEndOfQueue", song);
      });
      context.dispatch("updatePlayerAction", data.songId || context.state.queue[0].id);
    }
    else if (data.where == 'appendAlbumAtEnd') {
      result.data.data.albumDetails.songs.forEach((song) => {
        song.imageURL = result.data.data.albumDetails.imageURL;
        context.commit("pushAtEndOfQueue", song);
      });
    }
    else if (data.where == 'appendAlbumAtFront') {
      for (var i = result.data.data.albumDetails.songs.length - 1; i >= 0; i--) {
        result.data.data.albumDetails.songs[i].imageURL = result.data.data.albumDetails.imageURL;
        context.commit("pushAtFrontOfQueue", result.data.data.albumDetails.songs[i]);
      }
    }
    else if (data.where == 'appendAlbumAtCurrentId') {
      for (var i = result.data.data.albumDetails.songs.length - 1; i >= 0; i--) {
        result.data.data.albumDetails.songs[i].imageURL = result.data.data.albumDetails.imageURL;
        console.log(result.data.data.albumDetails.songs[i]);
        // console.log(result.data.data.albumDetails.songs[i].imageUrl)
        context.commit("pushAfterCurrentIdOFQueue", result.data.data.albumDetails.songs[i]);
      }
    }
  },
  updatePlayerAction: async function (context, id) {
    const body = {
      query: `mutation($id: String){
            getSong(id: $id){
              id
              name
              imageURL
              songURL
              singers{
                id
                name
                imageURL
              }
            }
          }`,
      variables: {
        id: id,
      },
    };
    const result = await this.$axios.post("/graphql", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    context.commit("updatePlayer", result.data.data.getSong);
    context.dispatch("playTheSong", result.data.data.getSong.songURL);
  },
  updateProgressBar: function (context) {
    const timer = setInterval(function () {
      let player = document.querySelector(".player");
      let duration = player.duration;
      let pos = (player.currentTime / duration) * 100;
      context.commit("updateSliderPos", pos);
    }, 200);
    context.commit("updateTimer", timer);
  },
  updatePlayerDuration: function (context, pos) {
    let playDOM = document.querySelector(".player");
    if (playDOM != null) {
      let duration = playDOM.duration;
      let buf = (pos * duration) / 100;
      playDOM.currentTime = buf;
      context.commit("updateSliderPos", pos);
    }
  },
  playTheSong: function (context, src) {
    context.commit("clearPlayerTimer");
    const player = document.querySelector(".player");
    player.src = src;
    player.load();
    player.play();
    context.dispatch("updateProgressBar");
  },
  playTheNextSong: function (context) {
    const currentIndex = context.state.queue.findIndex(item => item.id == context.state.player.id);
    if (currentIndex != -1) {
      if (!context.state.shuffle && context.state.repeat == 0 && context.state.queue[currentIndex + 1] != undefined) {
        context.dispatch('updatePlayerAction', context.state.queue[currentIndex + 1].id);
      }
      else if (!context.state.shuffle && context.state.repeat == 1) {
        context.dispatch('updatePlayerAction', context.state.queue[currentIndex + 1] != undefined ? context.state.queue[currentIndex + 1].id : context.state.queue[0].id);
      }
      else if (context.state.shuffle && context.state.repeat == 1) {
        if (!context.state.shuffledata.includes(context.state.queue[currentIndex].id)) {
          context.commit('updateShuffleData', context.state.queue[currentIndex].id);
        }
        let randomNum = 0;
        do {
          randomNum = Math.floor(Math.random() * context.getters.getQueueLength);
        } while (context.state.shuffledata.findIndex(item => item == context.state.queue[randomNum].id) != -1 && context.state.shuffledata.length < context.getters.getQueueLength);
        if (context.state.shuffledata.length < context.getters.getQueueLength) {
          context.dispatch('updatePlayerAction', context.state.queue[randomNum].id);
        }
        else {
          context.commit('updateShuffleData');
          context.dispatch('updatePlayerAction', context.state.queue[randomNum].id);
        }
      }
      else if (context.state.shuffle && context.state.repeat == 0) {
        if (!context.state.shuffledata.includes(context.state.queue[currentIndex].id)) {
          context.commit('updateShuffleData', context.state.queue[currentIndex].id);
        }
        let randomNum = 0;
        do {
          randomNum = Math.floor(Math.random() * context.getters.getQueueLength);
        } while (context.state.shuffledata.findIndex(item => item == context.state.queue[randomNum].id) != -1 && context.state.shuffledata.length < context.getters.getQueueLength);
        if (context.state.shuffledata.length < context.getters.getQueueLength) {
          context.dispatch('updatePlayerAction', context.state.queue[randomNum].id);
        }
      }
    }
  },
  playThePrevSong: function (context) {
    const currentIndex = context.state.queue.findIndex(item => item.id == context.state.player.id);
    if (currentIndex != -1) {
      if (!context.state.shuffle && context.state.repeat == 0 && currentIndex - 1 >= 0) {
        // console.log(currentIndex - 1)
        context.dispatch('updatePlayerAction', context.state.queue[currentIndex - 1].id);
      }
      else if (!context.state.shuffle && context.state.repeat == 1) {
        // console.log(context.state.queue[currentIndex - 1] >= 0, currentIndex - 1)
        context.dispatch('updatePlayerAction', currentIndex - 1 >= 0 ? context.state.queue[currentIndex - 1].id : context.state.queue[context.getters.getQueueLength - 1].id);
      }
      else if (context.state.shuffle && context.state.repeat == 1) {
        if (!context.state.shuffledata.includes(context.state.queue[currentIndex].id)) {
          context.commit('updateShuffleData', context.state.queue[currentIndex].id);
        }
        let randomNum = 0;
        do {
          randomNum = Math.floor(Math.random() * context.getters.getQueueLength);
        } while (context.state.shuffledata.findIndex(item => item == context.state.queue[randomNum].id) != -1 && context.state.shuffledata.length < context.getters.getQueueLength);
        if (context.state.shuffledata.length < context.getters.getQueueLength) {
          context.dispatch('updatePlayerAction', context.state.queue[randomNum].id);
        }
        else {
          context.commit('updateShuffleData');
          context.dispatch('updatePlayerAction', context.state.queue[randomNum].id);
        }
      }
      else if (context.state.shuffle && context.state.repeat == 0) {
        if (!context.state.shuffledata.includes(context.state.queue[currentIndex].id)) {
          context.commit('updateShuffleData', context.state.queue[currentIndex].id);
        }
        let randomNum = 0;
        do {
          randomNum = Math.floor(Math.random() * context.getters.getQueueLength);
        } while (context.state.shuffledata.findIndex(item => item == context.state.queue[randomNum].id) != -1 && context.state.shuffledata.length < context.getters.getQueueLength);
        if (context.state.shuffledata.length < context.getters.getQueueLength) {
          context.dispatch('updatePlayerAction', context.state.queue[randomNum].id);
        }
      }
    }
  },
  ApplyLikes: async function (context, data) {
    const body = {
      query: `
      mutation($what: String $id: String $status: Boolean){
        likes(what: $what id: $id status: $status){
          status
          likes
        }
      }
      `,
      variables: {
        what: data.what,
        id: data.id,
        status: data.status
      }
    };
    try{
      const result = await this.$axios.post('/graphql', body, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      return result;
    }
    catch(err){
      context.commit('updateSnackBar',{text: 'Only login to apply likes!', status: true, timeout: 5000})
    }
  }
};
