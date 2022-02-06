const conn = require('../../util/database');

class Album {
    name = "Hello";
    rating = "";
    imageURL = "";
    likes = "";
    releaseDate = "";
    songsList = [];
    musicDirector = [];

    constructor(name=null, rating=null, imageURL=null, likes=null, releaseDate=null, musicDirector=null, cast=null) {
        this.name = name;
        this.rating = rating;
        this.imageURL = imageURL;
        this.likes = likes;
        this.releaseDate = releaseDate;
        this.musicDirector = musicDirector;
        this.cast = cast;
    }

    fetchById(id){
       let prom= conn.execute('SELECT * FROM `albums` WHERE `id` = ?',[id])
        .then(([result])=>{
            return result;
        })
        prom.then(res=>this.name=res[0].id)
        .catch(err=>{console.log(err)})
        return prom;
    }
}

module.exports = Album;