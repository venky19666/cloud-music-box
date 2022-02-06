<template>
  <div>
    <v-container>
      <v-card max-width="1200">
        <v-row v-if="albumData.id!=undefined">
          <v-col cols="12" xs="12" md="4" lg="3" xl="3">
            <v-img class="ma-auto ml-lg-4" :src="encodeURI(albumData.imageURL)" width="200"></v-img>
          </v-col>
          <v-col xs="12" md="8" lg="8" xl="9">
            <v-row>
              <v-col cols="12" class="ma-0 pa-0 text-lg-left text-md-left text-center">
                <h3 class="headline">{{albumData.name}}</h3>
                <div>
                  <v-btn @click="doLike({what: 'album',id: albumData.id,status: !albumData.isLike})" icon>
                    <v-icon color="primary">{{albumData.isLike?'favorite':'favorite_border'}}</v-icon>
                  </v-btn>
                  : {{albumData.likes}}
                </div>
                <div class="ma-2">Release On: {{returnReleaseData}}</div>
                <div class="ma-2">
                  composer :
                  <span v-for="artist in albumData.composer" :key="artist.id">
                    <v-chip pill outlined v-on="on">
                      <v-avatar left>
                        <v-img :src="encodeURI(artist.imageURL)"></v-img>
                      </v-avatar>
                      {{artist.name}}
                    </v-chip>
                  </span>
                </div>
                <div class="ma-2">
                  cast :
                  <span v-for="artist in albumData.cast" :key="artist.id">
                    <v-chip pill outlined v-on="on">
                      <v-avatar left>
                        <v-img :src="encodeURI(artist.imageURL)"></v-img>
                      </v-avatar>
                      {{artist.name}}
                    </v-chip>
                  </span>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <v-card v-if="albumData.id==undefined">
        <v-row>
          <v-col cols="12" xs="12" md="4" lg="3" xl="3">
            <v-skeleton-loader class="ml-4" max-width="200" type="image"></v-skeleton-loader>
          </v-col>
          <v-col xs="12" md="8" lg="8" xl="9" align-self="center">
            <v-skeleton-loader class="mx-auto" type="paragraph,paragraph"></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="mt-lg-6 mb-6" v-if="albumData!={}">
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn @click="mutationCaller({id: albumData.id,where: 'clearAndAppendAlbum'})" color="primary">play all</v-btn>
          </v-col>
          <v-col cols="12">
            <v-simple-table :dense="false" class="d-none d-sm-block">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="pl-8">#</th>
                    <th class="text-left">TITLE</th>
                    <th class="text-left">LIKES</th>
                    <th class="text-left">ARTIST</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item,index) in albumData.songs"
                    :key="item.id"
                    @click="mutationCaller({id: albumData.id,songId: item.id})"
                  >
                    <td>
                      <v-btn icon>
                        <v-icon large color="primary">play_circle_outline</v-icon>
                      </v-btn>
                    </td>
                    <td>{{item.name}}</td>
                    <td>{{item.likes}}</td>
                    <td>
                      <span v-for="artist in item.singers" :key="artist.id">
                        <v-chip pill outlined v-on="on">
                          <v-avatar left>
                            <v-img :src="encodeURI(artist.imageURL)"></v-img>
                          </v-avatar>
                          {{artist.name}}
                        </v-chip>
                      </span>
                    </td>
                    <td class="text-right">
                      <v-btn @click="doSongLike({what: 'song',id: item.id,status: !item.isLike},index)" icon>
                        <v-icon color="primary">{{item.isLike?'favorite':'favorite_border'}}</v-icon>
                      </v-btn>
                    </td>
                    <td class="text-right">
                      <v-menu absolute offset-y style="max-width: 600px">
                        <template v-slot:activator="{ on }">
                          <v-btn class="ma-0" icon v-on="on" @click.prevent>
                            <v-icon>more_horiz</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item @click="appendAfterCurrentSong({...item,imageURL: albumData.imageURL})">
                            <v-list-item-title>play next</v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="appendLastOfQueue({...item,imageURL: albumData.imageURL})">
                            <v-list-item-title>append at last</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-simple-table :dense="false" class="d-block d-sm-none">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">TITLE</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in albumData.songs"
                    :key="item.id"
                    @click="mutationCaller({id: albumData.id,songId: item.id})"
                  >
                    <td>{{item.name}}</td>
                    <td class="text-right">
                      <v-menu absolute offset-y style="max-width: 600px">
                        <template v-slot:activator="{ on }">
                          <v-btn class="ma-0" icon v-on="on" @click.prevent>
                            <v-icon>more_horiz</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item @click="appendAfterCurrentSong({...item,imageURL: albumData.imageURL})">
                            <v-list-item-title>play next</v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="appendLastOfQueue({...item,imageURL: albumData.imageURL})">
                            <v-list-item-title>append at last</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-card>
      <v-card v-if="albumData.id==undefined">
        <v-row>
          <v-col cols="12">
            <v-skeleton-loader
              class="ma-auto"
              max-width="1200"
              type="table-thead,table-row,table-row"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-card>
      <v-card>
        <h5 class="overline pa-4">COMMENT BOX</h5>
        <v-row>
          <v-col cols="12">
            <div style="width: 48px;float: left;margin-left:5px;">
              <v-avatar size="48" color="primary">
                <v-img v-if="getUserData.userImage!='default'" :src="encodeURI(getUserData.userImage)"></v-img>
                <span
                  v-if="getUserData.userImage=='default'"
                  class="white--text text-uppercase headline"
                >{{getUserData.firstname[0]+getUserData.secondname[0]}}</span>
              </v-avatar>
            </div>
            <div style="width: calc( 100% - 60px );float:left;margin-left:5px;">
              <v-textarea
                dense
                placeholder="add public comment here."
                v-model="comment"
                class="ma-0 pa-0"
                rows="1"
                row-height="10"
                auto-grow
                single-line
              ></v-textarea>
              <div class="d-flex flex-row-reverse">
                <v-btn @click="postComment" color="primary">comment</v-btn>
                <v-btn class="mr-2">cancel</v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
        <div v-if="comments.length>0" class="mb-5">
          <v-row v-for="text in comments" :key="text.id">
            <v-col cols="12">
              <div style="width: 48px;float: left;margin-left:5px;">
                <v-avatar color="primary" class="mx-0">
                  <v-img v-if="text.user.profilepic!='default'" :src="encodeURI(text.user.profilepic)"></v-img>
                  <span
                    v-else
                    class="white--text text-uppercase headline"
                  >{{text.user.firstname[0]+text.user.secondname[0]}}</span>
                </v-avatar>
              </div>
              <div style="width: calc( 100% - 60px );float:left;margin-left:5px;">
                <div class="subtitle-1">
                  {{text.user.firstname+' '+text.user.secondname}}
                  <span
                    class="ml-2 caption font-weight-thin"
                  >{{getCommentTime(new Date(parseInt(text.time)))}}</span>
                </div>
                <p class="subtitle-2">{{text.text}}</p>
              </div>
            </v-col>
          </v-row>
        </div>
        <div v-else class="text-center overline font-weight-light py-10 text-uppercase">no comments</div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  validate({ params }) {
    return params.id!=='';
  },
  data: () => ({
    albumData: {},
    on: false,
    comment: "",
    comments: []
  }),
  methods: {
    ...mapMutations(['pushAfterCurrentIdOFQueue','pushAtEndOfQueue']),
    ...mapActions(["updatePlayerAction","ApplyLikes"]),
    mutationCaller: function(data) {
      this.$store.dispatch("addAlbumToQueue", data);
    },
    postComment: async function() {
      const body = {
        query: `mutation($text: String!,$ID: String!){
          postComment(text: $text,ID: $ID){
            id
            text
            time
          }
        }`,
        variables: {
          text: this.comment,
          ID: this.$route.params.id
        }
      };
      const result = await this.$axios.post("", body, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (result.data.data.postComment != null) {
        this.comments.unshift({
          ...result.data.data.postComment,
          user: { ...this.getUserData, profilepic: this.getUserData.userImage }
        });
        this.comment = "";
        // console.log(result);
        // console.log(this.comments);
      } else {
        this.$router.push("/login");
      }
    },
    getCommentTime: function(date) {
      const current = new Date();
      if (date.getUTCFullYear() == current.getUTCFullYear()) {
        if (date.getUTCMonth() == current.getUTCMonth()) {
          if (date.getUTCDate() == current.getUTCDate()) {
            if (date.getUTCHours() == current.getUTCHours()) {
              current.toUTCString();
              return current.getUTCMinutes() - date.getUTCMinutes() == 1
                ? "a minute ago"
                : current.getUTCMinutes() -
                    date.getUTCMinutes() +
                    " minutes ago.";
            } else {
              return current.getUTCHours() - date.getUTCHours() == 1
                ? "an hour ago"
                : current.getUTCHours() - date.getUTCHours() + " hours ago.";
            }
          } else {
            return current.getUTCDate() - date.getUTCDate() == 1
              ? "a day ago"
              : current.getUTCDate() - date.getUTCDate() + " days ago.";
          }
        } else {
          return current.getUTCMonth() - date.getUTCMonth() == 1
            ? "a month ago"
            : current.getUTCMonth() - date.getUTCMonth() + " months ago.";
        }
      } else {
        return date.toString().substr(4, 11);
      }
    },
    appendLastOfQueue: function(obj){
      this.pushAtEndOfQueue(obj);
      if(this.getQueueLength==1){
        this.updatePlayerAction(obj.id);
      }
    },
    appendAfterCurrentSong: function(obj){
      this.pushAfterCurrentIdOFQueue(obj);
      console.log(obj);
      if(this.getQueueLength==1){
        this.updatePlayerAction(obj.id);
      }
    },
    doLike: async function(obj){
      let returndata = this.ApplyLikes(obj);
      returndata.then(({data})=>data.data.likes).then(data=>{
        if(data.status){
          this.albumData.isLike = !this.albumData.isLike;
          this.albumData.likes = data.likes;
        }
      }).catch(err=>{})
    },
    doSongLike: function(obj,index){
      let returndata = this.ApplyLikes(obj);
      returndata.then(({data})=>data.data.likes).then(data=>{
        if(data.status){
          this.albumData.songs[index].isLike = !this.albumData.songs[index].isLike;
          this.albumData.songs[index].likes = data.likes;
        }
      }).catch(err=>{})
    }
  },
  created: async function() {
    const body = {
      query: `
        mutation($id: String){
          albumDetails(id: $id){
            id
            name
            imageURL
            likes
            isLike
            releaseDate
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
            songs{
              id
              name
              likes
              isLike
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
            comments{
              id
              text
              time
              user{
                id
                firstname
                secondname
                profilepic
              }
            }
          }
        }`,
      variables: {
        id: this.$route.params.id,
      }
    };
    const result = await this.$axios.post("", body, {
      headers: { "Content-Type": "application/json" }
    });
    console.log(result.data.data.albumDetails);
    this.albumData = result.data.data.albumDetails;
    this.comments = result.data.data.albumDetails.comments;
  },
  computed: {
    returnReleaseData: function() {
      let str = this.albumData.releaseDate;
      return str;
    },
    returnComment: {
      get() {
        return this.comment;
      },
      set(value) {
        this.comment = value;
      }
    },
    ...mapGetters(["getUserData","getQueueLength"])
  },
};
</script>

<style>
</style>