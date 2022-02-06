const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const adminRouter = require('./router/admin/adminRoutes');
const sequelize = require('./util/database');

const graphqlHTTP = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');
const userRouter = require('./router/user/graphql_upload');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const beforeStartUP = require('./util/defaultData');
const host = require('./util/config');
const userAuth = require('./middleware/userAuth');
const cors = require('cors');

const Album = require("./models/entities/Album");
const Artist = require("./models/entities/Artist");
const composer = require("./models/relations/Director");
const cast = require("./models/relations/Cast");
const songs = require("./models/entities/Song");
const singers = require("./models/relations/Singer");
const lyricits = require("./models/relations/Lyricists");
const Comments = require('./models/user/comment');
const User = require('./models/user/User');
const AlbumLikes = require('./models/user/albumlikes');
const SongLikes = require('./models/user/songslikes');
const ArtistLikes = require('./models/user/artistlikes');
const History = require('./models/user/history');
const Admin = require('./models/Admin/Admin');
const Tokens = require('./models/Admin/Tokens');
const Mood = require('./models/entities/Moods');
const songMoodRelation = require('./models/relations/MoodRelation');


var myStore = new SequelizeStore({
  db: sequelize
})
app.use(session({
  secret: 'this my secret code it was unbrackable',
  store: myStore,
  resave: false,
  proxy: true,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000*60*60*12,
    sameSite: true,
  }
}))

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', bodyParser.json(), adminRouter);


app.use('/',userRouter);

app.set('views', 'views');

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'storage')));

app.use('/graphql',bodyParser.json(),userAuth,graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true,
  // customFormatErrorFn(err){
  //   if(!err.originalError){
  //     return err;
  //   }
  //   return { message: err.originalError.message || 'errror occured', status: err.originalError.code || 500}
  // }
}))
    Album.belongsToMany(Artist, { through: composer, as: "composer" });
    Artist.belongsToMany(Album, { through: composer,  as:"composer"});
    Album.belongsToMany(Artist, { through: cast, as: "cast" });
    Artist.belongsToMany(Album, { through: cast, as:"cast" });
    Album.hasMany(songs);
    songs.belongsTo(Album);
    Admin.hasMany(Tokens);
    Tokens.belongsTo(Admin);
    songs.belongsToMany(Artist, { through: singers, as: "singers" });
    Artist.belongsToMany(songs, { through: singers, as: "singers" });
    songs.belongsToMany(Artist, { through: lyricits, as: "lyricitis" });
    Artist.belongsToMany(songs, { through: lyricits, as: "lyricitis" });
songs.belongsToMany(Mood, { through: songMoodRelation, as: "songMood"});
Mood.belongsToMany(songs, { through: songMoodRelation, as: "songMood" });
    Album.hasMany(Comments);
    User.hasMany(Comments);
    Comments.belongsTo(User);

    Album.belongsToMany(User, { through: AlbumLikes, as: "albumlikesdata"});
    User.belongsToMany(Album, { through: AlbumLikes, as: "albumlikesdata"});

    songs.belongsToMany(User, { through: SongLikes, as: "songlikesdata"});
    User.belongsToMany(songs, { through: SongLikes, as: "songlikesdata"});

    Artist.belongsToMany(User, { through: ArtistLikes, as: "artistlikesdata"});
    User.belongsToMany(Artist, { through: ArtistLikes, as: "artistlikesdata"});
    
    songs.belongsToMany(User, { through: History, as: "historydata"});
    User.belongsToMany(songs, { through: History, as: "historydata"});
    
    const dotenv = require('dotenv').config();
    if(dotenv.error)
      throw dotenv.error;
    console.log(dotenv);
sequelize.sync({ force: false })
  .then(result => {
    app.listen(process.env.type==='PROD'?host.PROD.port:host.DEV.port);
    beforeStartUP();
  })
  .catch(err => console.log(err));
console.log(process.env.type); 