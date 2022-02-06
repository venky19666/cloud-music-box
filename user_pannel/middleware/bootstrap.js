export default async function({ $axios, store }) {
  if (
    localStorage.authData !== "" &&
    localStorage.authData !== undefined
  ) {
    const localData = JSON.parse(localStorage.authData);
    $axios.setToken(localData.token, "Bearer");
    const result = await $axios.post(
      "",
      {
        query: `mutation{
        isLogedIn{
          status
        }
      }`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (result.data.data.isLogedIn.status) {
      store.commit("updateAuthData", {
        isAuth: true || false,
        token: localData.token || "",
        userID: localData.userID || "",
        userImage: localData.userImage || "",
        firstname: localData.firstname || "",
        secondname: localData.secondname || "",
      });
    } else {
      $axios.setToken(false);
    }
  }
}
