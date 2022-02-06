<template>
  <div class="queue-root">
    <div class="queue-header">
      <v-toolbar dense class="mainFontColor--text bgColor">
        <slot></slot>

        <v-toolbar-title>Queue</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon class="mainFontColor--text">
          <v-icon>delete</v-icon>
        </v-btn>

        <v-btn icon class="mainFontColor--text">
          <v-icon>save</v-icon>
        </v-btn>

        <v-btn icon class="mainFontColor--text">
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar>
    </div>
    <draggable
      class="list-group"
      v-if="getQueueLength>0"
      tag="v-list"
      v-model="MainQueue"
      v-bind="dragOptions"
      handle=".handle-btn"
      @start="drag = true"
      @end="drag = false"
    >
      <v-list-item v-for="item in getQueue" :class="item.id==getPlayerData.id ? 'primary': 'bgColor'" @click="updatePlayerAction(item.id)" :key="item.id">
        <v-list-item-avatar>
          <v-img :src="item.imageURL"></v-img>
        </v-list-item-avatar>

        <v-list-item-content class="mainFontColor--text">
          <v-list-item-title v-html="item.name"></v-list-item-title>
          <v-list-item-subtitle class="mainFontColor--text">
            <span v-for="artist in item.singers" :key="artist.id">{{artist.name}}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-btn icon @click.prevent class="handle-btn mainFontColor--text">
          <v-icon>drag_indicator</v-icon>
        </v-btn>
        <v-btn
          @click.prevent
          @click="removeSongFromQueue(item.id)"
          :disabled="getPlayerData.id==item.id"
          icon
          class="mainFontColor--text"
        >
          <v-icon>cancel</v-icon>
        </v-btn>
        <v-btn @click.prevent icon class="mainFontColor--text">
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-list-item>
    </draggable>
  </div>
</template>

<script>
import { mapGetters, mapMutations,mapActions } from "vuex";
import draggable from "vuedraggable";
export default {
  name: "Queue",
  components: {
    draggable
  },
  data: () => ({
    drag: false
  }),
  methods: {
    ...mapMutations(["updateQueue", "removeSongFromQueue"]),
    ...mapActions(['playTheNextSong','updatePlayerAction']),
    sort() {
      this.list = this.list.sort((a, b) => a.order - b.order);
    },
  },
  computed: {
    ...mapGetters(["getQueue", "getQueueLength","getPlayerData"]),
    MainQueue: {
      get() {
        return this.getQueue;
      },
      set(value) {
        this.updateQueue(value);
      }
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #0984bd;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
  height: 50px;
}
.list-group-item i {
  cursor: pointer;
}
.handle-btn {
  cursor: move;
}
.queue-root {
  background: red;
  .queue-header {
    position: sticky;
    background-color: blue;
    z-index: 20000;
    top: 0px;
    left: 0px;
  }
}
</style>