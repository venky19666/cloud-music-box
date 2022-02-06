export default function ({ store, redirect,router }) {
    // If the user is not authenticated
    if (!store.state.isAuth) {
      store.commit('updateSnackBar',{text: 'Must login to access this page!', status: true, timeout: 5000});
      return redirect('/login')
    }else{
      // console.log(router)
    }
  }
  