<template>
  <div>
      <v-container>
          <v-card class="ma-auto pa-10" max-width="400">
              <v-row>
                  <v-col cols="12">
                      <v-text-field label="passowrd" :type="show1 ? 'text' : 'password'" :prepend-inner-icon="'lock'" :append-icon=" show1 ? 'visibility' : 'visibility_off'" @click:append="show1=!show1"></v-text-field>
                  </v-col>
              </v-row>
              <v-row>
                  <v-col cols="12">
                      <v-text-field label="confirm password" :type="show1 ? 'text' : 'password'" :prepend-inner-icon="'lock'" :append-icon=" show2 ? 'visibility' : 'visibility_off'" @click:append="show2=!show2"></v-text-field>
                  </v-col>
              </v-row>
              <div class="text-center">
                  <v-btn color="primary">reset</v-btn>
              </div>
          </v-card>
      </v-container>
  </div>
</template>

<script>
export default {
    data: ()=> ({
        show1: false,
        show2: false,
    }),
    head: {
        title: 'Thisis testing title'
    }
}
</script>

<style>

</style>