<template>
  <div>
      <v-card class="mx-auto mt-12 pa-8" max-width="700">
        <div v-if="status" class="text-center">Account successfully verified! <v-btn nuxt to="/login" class="ml-2">login</v-btn></div>
        <div v-if="!status" class="text-center">verification link was expired! <v-btn nuxt to="/login" class="ml-2">login</v-btn></div>
      </v-card>
  </div>
</template>

<script>
export default {
  data: ()=>({
    status: true
  }),
  created: async function(){
    const body = {
      query: `mutation($id: String!,$link: String!){
        verifyuser(id: $id verificationlink: $link){
          status
        }
      }`,
      variables: {
        id: this.$route.params.user,
        link: this.$route.params.code
      }
    }
    try{
      const result = await this.$axios.post('',body,{headers:{
      "Content-Type": "application/json"
    }},{errorHandle: true})
    if(result){
      this.status = true
    }
    }
    catch(err){
      this.status = false;
    }
  }
}
</script>

<style>

</style>