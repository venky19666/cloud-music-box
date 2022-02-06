<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" lg="3" md="3" sm="12" xs="12">
          <v-img
            class="ml-lg-auto ml-md-auto ml-sm-auto ma-auto"
            width="200"
            src="http://localhost:5000/data/30 Rojullo Preminchadam Ela/WVRGT5cRZFXcOOppWcSm7ickeniEYD95zl1hKNIqDRK3R7L0r8.jpeg"
          ></v-img>
        </v-col>
        <v-col cols="12" lg="9" md="9" sm="12" xs="12">
              <div class="data primary text-md-left text-center">
                <div class="song-name text-lg-h4">song name</div>
                <div class="album-name">album name</div>
              </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-inline-flex justify-center">
          <v-btn color="black" class="primary" x-large icon>
            <v-icon x-large>play_arrow</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ArtistCard from "~/components/ArtistCard";
export default {
  components: { ArtistCard }
};
</script>

<style lang="scss" scoped>
// .song-name{
//     font-size: 25px;
// }
</style>