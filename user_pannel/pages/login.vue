<template>
  <div>
    <v-container>
      <v-card shaped elevation="5" class="mt-12 mx-auto pa-8" max-width="400">
        <v-col cols="12">
          <v-form ref="form" v-model="login">
            <v-text-field
              :prepend-inner-icon="'person'"
              label="username"
              hint="username is case insenstive"
              :rules="rules.username"
              v-model="username"
              clearable
              :clear-icon="'close'"
              color="primary"
            ></v-text-field>
            <v-text-field
              :prepend-inner-icon="'lock'"
              v-model="password"
              label="password"
              color="primary"
              clearable
              :rules="rules.password"
              :append-icon="show ? 'visibility' : 'visibility_off'"
              :clear-icon="'close'"
              :error-messages="returnPasswordError"
              :type="show?'text':'password'"
              @click:append="show = !show"
            ></v-text-field>
            <p dense class="text-right">
              <v-btn depressed text small class="text-lowercase">forget password!</v-btn>
            </p>
            <div class="text-center">
              <v-btn
                :disabled="loading"
                :loading="loading"
                color="primary"
                @click="userlogin"
              >log in</v-btn>
            </div>
          </v-form>
        </v-col>
        <div class="text-center">
          <v-btn depressed text class="primary--text text-lowercase">create new account</v-btn>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  middleware: 'notAuthrised',
  data: () => ({
    login: true,
    loading: false,
    username: "",
    password: "",
    passwordError: "",
    rules: {
      username: [v => !!v || "username is required"],
      password: [v => !!v || "password is required"]
    },
    show: false
  }),
  methods: {
    ...mapMutations(["updateSnackBar","updateAuthData"]),
    userlogin: async function() {
      this.loading = true;
      if (this.$refs.form.validate()) {
        const body = {
          query: `mutation($username: String!,$password: String!){
            userlogin(username: $username, password: $password){
              userID,
              token,
              firstname,
              secondname,
              userImage
            }
          }`,
          variables: {
            username: this.username,
            password: this.password
          }
        };
        try {
          const result = await this.$axios.post("/graphql", body, {
            headers: {
              "Content-Type": "application/json"
            }
          },{progress: true});
          if (result.status == 200) {
            this.updateAuthData({
              isAuth: true, token: result.data.data.userlogin.token, 
              userID: result.data.data.userlogin.userID,
              userImage: result.data.data.userlogin.userImage,
              firstname: result.data.data.userlogin.firstname,
              secondname: result.data.data.userlogin.secondname,
            });
            localStorage.authData = JSON.stringify({
              userID: result.data.data.userlogin.userID,
              token: result.data.data.userlogin.token,
              userImage: result.data.data.userlogin.userImage,
              firstname: result.data.data.userlogin.firstname,
              secondname: result.data.data.userlogin.secondname,
            });
            this.$axios.setToken(result.data.data.userlogin.token,"Bearer");

            
            this.handleBack('/');
          }
        } catch (err) {
          this.loading = false;
          if (err.response) {
            if (
              err.response.data.errors[0].message.includes(
                "password is incorrect!"
              )
            ) {
              this.passwordError = err.response.data.errors[0].message;
            }
            this.updateSnackBar({
              text: err.response.data.errors[0].message,
              status: true,
              timeout: 4000
            });
          }
        }
      }
    },
    handleBack (fallback) {
      if (!this.fromRoute.name) {
        this.$router.push(fallback);
      } else {
        this.$router.go(-1);
      }
    }
  },
  computed: {
    returnPasswordError: function() {
      return this.passwordError;
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fromRoute = from;
    })
  },
};
</script>

<style>
</style>