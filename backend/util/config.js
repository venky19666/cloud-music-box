exports.DEV = {
    port: 5000,
    database_name: 'new_music',
    username: 'root',
    password: '',
    host: 'localhost',
};
exports.PROD = {
    port: 4000,
    database_name: 'new_songs',
    username: 'uploader',
    password: 'BenMark@1234',
    host: 'localhost',
};
exports.client = {
    artistURL: 'http://localhost:5000/artist-data/',
    albumURL: 'http://localhost:5000/data/',
}