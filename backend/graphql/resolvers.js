const verifyuser = require('../controllers/user/verfiyuser');
const register = require('../controllers/user/register');
const login = require('../controllers/user/login');
const resetpass = require('../controllers/user/resetpassword');
const playlistData = require('../models/user/playlist_data');
const albumview = require('../controllers/user/albumsList');
const albumdetails = require('../controllers/user/albumdetails');
const getSong = require('../controllers/user/songdetails');
const postComment = require('../controllers/user/postcomment');
const likes = require('../controllers/user/likes');
const songsListView = require('../controllers/user/songlistview');
const artistListView = require('../controllers/user/artistlistview');
const artistDetails = require('../controllers/user/artistdetails');
module.exports = {
  hello: () => 'Hello world!',
  createUser: register,
  userlogin: login,
  verifyuser: verifyuser,
  resetpassword: resetpass,
  albumsListView: albumview,
  albumDetails: albumdetails,
  getSong: getSong,
  postComment: postComment,
  isLogedIn: function({},req){
    if(req.isAuth){
      return {
        status: true
      }
    }
    else{
      return {
        status: false
      }
    }
  },
  likes: likes,
  songsListView: songsListView,
  artistListView: artistListView,
  artistDetails: artistDetails,
}