const express = require('express');
const router = express.Router();
const UploadArtist = require('../../routes/admin/upload_artist');
const UploadArtistStorage = require('../../util/storage/artistUploadStorage');
const Login = require('../../routes/admin/login');
const GenerateToken = require('../../routes/admin/generate_token');
const adminAuth = require('../../middleware/adminAuth');
const adminAuthFilter = require('../../middleware/adminAuthFilter');
const ListArtistByName = require('../../routes/admin/artist_list');
const ListAlbumByName = require('../../routes/admin/albumlist');
const MoodList = require('../../routes/admin/moodlist');

const UploadAlbum = require('../../routes/admin/upload_album');
const UploadAlbumArtMulter = require('../../util/storage/albumUploadStorage');
const UploadSongMulter = require('../../util/storage/songsUploadStorage');
const UploadSong = require("../../routes/admin/upload_song");

router.post('/login',Login);
router.post('/generate/token',GenerateToken);

router.post('/get/artist/by/name', adminAuth, adminAuthFilter, ListArtistByName);

router.post('/get/mood/list', MoodList);

router.post('/get/album/by/name', adminAuth, adminAuthFilter, ListAlbumByName);

router.post('/upload/artist/data', adminAuth,adminAuthFilter,UploadArtistStorage,UploadArtist);
router.post('/upload/album/data/', adminAuth, adminAuthFilter, UploadAlbumArtMulter, UploadAlbum);
router.post('/upload/song/data/', adminAuth, adminAuthFilter, UploadSongMulter, UploadSong);

module.exports = router;