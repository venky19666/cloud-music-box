<template>
  <div>
    <v-container>
      <v-card class="mx-auto pa-10" max-width="500">
        <v-row>
          <v-col cols="12">
            <v-text-field :prepend-inner-icon="'email'" label="Enter mail id to recover you password!"></v-text-field>
          </v-col>
        </v-row>
        <div class="text-center">
            <v-btn depressed color="primary">Send</v-btn>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>