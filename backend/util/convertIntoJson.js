const convertToJson=(body,files)=>{


    let keys = Object.keys(body);
    let songReg = new RegExp('^songName');
    // let singerReg = new RegExp('^singers');
    // let lyricistRed = new RegExp('^lyricists');
    // let songURLReg = new RegExp('^songURL');
    let songsCount = 0;
    keys.forEach(key=>{
        if(songReg.test(key)){
            songsCount++;
        }
    });

    let data = {
        albumName : body.albumName,
        musicDirector : Array.isArray(body.musicDirector)? [...body.musicDirector]: [body.musicDirector],
        castDetails : Array.isArray(body.castDetails)? [...body.castDetails]: [body.castDetails],
        releaseDate : body.releaseDate,
        imageURL: files.find(file=>{return file.fieldname==='imageFile'}).filename || null,
        songData : [],
    };


    for(let i = 1; i <= songsCount; i++){
        let song = {
            id: body['songId'+i]||null,
            songName: body['songName'+i],
            singers : Array.isArray(body['singers'+i])? [...body['singers'+i]] : [body['singers'+i]],
            lyricists: Array.isArray(body['lyricists'+i])? [...body['lyricists'+i]] : [body['lyricists'+i]],
            moodNames: Array.isArray(body['moodNames'+i])? [...body['moodNames'+i]] : [body['moodNames'+i]],
            songURL: files.find(file=>{return file.fieldname==='songURL'+i}).filename || null,
        };
        data.songData.push(song);
    }
    return data;
}

exports.convertToJsonAlbum = convertToJson;

exports.convertToJsonSongs = (body,files)=>{
    let keys = Object.keys(body);
    let songReg = new RegExp('^songName');
    let songsCount = 0;
    keys.forEach(key=>{
        if(songReg.test(key)){
            songsCount++;
        }
    });

    let data = {
        albumID: body.albumId,
        songData : [],
    };

    for(let i = 1; i <= songsCount; i++){
        let song = {
            songName: body['songName'+i],
            singers : Array.isArray(body['singers'+i])? [...body['singers'+i]] : [body['singers'+i]],
            lyricists: Array.isArray(body['lyricists'+i])? [...body['lyricists'+i]] : [body['lyricists'+i]],
            moodNames: Array.isArray(body['moodNames'+i])? [...body['moodNames'+i]] : [body['moodNames'+i]],
            songURL: files.find(file=>{return file.fieldname==='songURL'+i}).filename || null,
        };
        data.songData.push(song);
    }
    return data;
}