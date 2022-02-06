<template>
  <div>
    <v-container>
      <v-form ref="form" v-model="register">
        <v-card class="mx-auto pa-8" max-width="700">
          <v-row justify="space-between">
            <v-col cols="6">
              <v-text-field
                label="First Name"
                v-model="formData.firstname"
                :rules="[formRules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Last name"
                v-model="formData.secondname"
                :rules="[formRules.required]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="space-between">
            <v-col cols="6">
              <v-select
                :items="gender"
                v-model="formData.gender"
                :rules="[formRules.required]"
                label="Gender"
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-menu
                v-model="date"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                min-width="290px"
                z-index="200"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="formData.dob"
                    label="Date of birth"
                    prepend-icon="event"
                    type="date"
                    :rules="[formRules.required]"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  v-model="formData.dob"
                  @input="dob = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-file-input
                :rules="formRules.image"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="upload you image"
                prepend-icon="camera"
                v-model="formData.image"
                messages="upload jpeg | png |bmp formated image only"
                :error-messages="errorMessageFormImage"
                label="profile picture"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="email"
                v-model="formData.email"
                :rules="[formRules.email]"
                :error-messages="errorMessageFormEmail"
                prepend-inner-icon="email"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                prepend-inner-icon="phone"
                v-model="formData.phone"
                :rules="[formRules.phoneno]"
                label="phone number"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                :type="show?'text':'password'"
                label="password"
                prepend-inner-icon="lock"
                :append-icon="show ? 'visibility' : 'visibility_off'"
                :error-messages="errorMessageFormPassword"
                v-model="formData.password"
                @click:append="show = !show"
                :rules="[formRules.passwordCheck]"
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="text-center">
            <v-btn @click="reset">Reset</v-btn>
            <v-btn :loading="returnLoading" :disabled="returnLoading" @click="retriveData" color="primary">SinUp</v-btn>
          </div>
        </v-card>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data: () => ({
    register: true,
    loading: false,
    gender: ["Male", "Female", "Unknow"],
    date: false,
    show: false,
    formData: {
      firstname: "",
      secondname: "",
      gender: "",
      dob: "",
      image: null,
      email: "",
      phone: "",
      password: ""
    },
    formErrorMessage: {
      firstname: "",
      secondname: "",
      gender: "",
      dob: "",
      image: null,
      email: "",
      phone: "",
      password: ""
    },
    formRules: {
      required: v => !!v || "Required",
      image: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!"
      ],
      firstName: [],
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
      phoneno: value => {
        const pattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
        return pattern.test(value) || "Invalid phone number";
      },
      passwordCheck: value => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return pattern.test(value) || "Password atleast one chatcter one alpabate and one number. only charcters include [!@#$%^&*]";
      }
    }
  }),
  methods: {
    ...mapMutations(["updateSnackBar"]),
    retriveData: async function() {
      this.loading = true;
      var imageURL = "default";
      if (this.$refs.form.validate()) {
        if (this.formData.image) {
          try {
            const data = new FormData();
            data.append("profile", this.formData.image);
            const result = await this.$axios.post(
              "/profile-image-upload",
              data,
              {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              }
            );
            imageURL = result.data.filename;
          } catch (err) {
            this.formErrorMessage.image = "Invalid image format!";
          }
        }
        const body = {
          query: `mutation createUser($firstname: String!,$secondname: String!, $gender: String!,$dob: String!,$imageurl: String!,
          $email: String!,$phone: String!,$password: String!) {
              createUser(register: {
                  firstname: $firstname
                  secondname: $secondname
                  gender: $gender
                  dob: $dob
                  profilePic: $imageurl
                  email: $email
                  phoneNo: $phone
                  password: $password
                })
              {
                status
              }
          }`,
          variables: {
            firstname: this.formData.firstname,
            secondname: this.formData.secondname,
            gender: this.formData.gender,
            dob: this.formData.dob,
            imageurl: imageURL,
            email: this.formData.email,
            phone: this.formData.phone,
            password: this.formData.password
          }
        };
        try {
          const result = await this.$axios.post("", body, {
            headers: {
              "Content-Type": "application/json"
            }
          });
          if (result.status == 200) {
            this.updateSnackBar({
              text: "Successfully Created account. You may login through login.",
              status: true,
              timeout: 4000
            });
            this.loading = false;
            this.$refs.form.reset();
          }
        } catch (err) {
          this.updateSnackBar({
            text: err.response.data.errors[0].message,
            status: true,
            timeout: 2000
          });
          this.loading = false;
          if (
            err.response.data.errors[0].message.includes("Email already exits!")
          ) {
            this.formErrorMessage.email = "Email already exits!";
          }
          if (
            err.response.data.errors[0].message.includes(
              "Password must contain at least one letter, at least one number, and be longer than six charaters."
            )
          ) {
            this.formErrorMessage.password =
              "It must not include any special chacters!";
          }
        }
      }
    },
    reset: function(){
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    }
  },
  computed: {
    errorMessageFormEmail: function() {
      return this.formErrorMessage.email;
    },
    errorMessageFormImage: function() {
      return this.formErrorMessage.image;
    },
    errorMessageFormPassword: function() {
      return this.formErrorMessage.password;
    },
    returnLoading: function(){
      return this.loading;
    }
  }
};
</script>

<style>
</style>