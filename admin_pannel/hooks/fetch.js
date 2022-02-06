import Axios from "axios";
import React from "react";
import { AuthContext } from "./Auth";
import { useRouter } from "next/router";

const fetch = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const useFetch = function () {
  const auth = React.useContext(AuthContext);
  const router = useRouter();
  fetch.defaults.headers.common["Authorization"] = auth.access_token;
  return async function (URL, data, options = null) {
    fetch.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.message.includes("403") && error.config.url ==="/generate/token"){
          auth.updateAuth("REMOVE");
          router.push('/login');
          return error;
        }

        if (error.message.includes("401") && error.config.url !=='/generate/token'){
          var token = '';
          if (auth.token===undefined || auth.token === null || auth.token === ''){
            
            if (localStorage.getItem("user-cache") !== null && localStorage.getItem("user-cache") !== undefined) {
              
              token = JSON.parse(localStorage.getItem("user-cache")).token;
            }
          }
          else{
            token = auth.token;
          }
          return fetch.post("/generate/token", { token: token },{
            headers: {
              "Content-Type": "application/json",
            }
          })
          .then(data=>{
            if(data.data!==undefined){
              auth.updateAuth("TOKEN", data.data.new_access_token);
              error.config.headers['Authorization'] = data.data.new_access_token;
              return fetch(error.config);
            }
          }).catch(err=>err);
        }
        return Promise.reject(error);
      }
    );
    return await fetch.post(URL, data, options);
  };
};

// const resp = await fetch.post('/generate/token', { token: auth.token }, {
//   headers: {
//     "Content-Type": "application/json",
//   }
// });


// const orginalConfig = error.config;
// console.log(orginalConfig)
// if (orginalConfig.url === "/generate/token") {

// }
