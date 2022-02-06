const { buildSchema } = require('graphql');
module.exports = buildSchema(`
type Query {
    hello: String
}
type User {
    id: String
    firstname: String
    secondname:String
    gender: String
    dob: String
    profilepic: String
    email: String
    phoneNo: String
}
input FilterAlbumList {
    name: String
    artist_name: String
    data: String
    likes: Boolean
    user: Boolean
}
input RegisterInput {
    firstname: String!
    secondname:String!
    gender: String!
    dob: String!
    profilePic: String!
    email: String!
    phoneNo: String!
    password: String!
}
type RegisterOutput {
    username: String!
    verficationLink: String!
}
type AuthData {
    token: String!
    firstname: String!
    secondname: String!
    userID: String!
    userImage: String
}
type Status {
    status: Boolean!
}
type Comment {
    id: String
    text: String
    time: String
    user: User
}
type Album {
    id: String
    name: String
    likes: Int
    isLike: Boolean
    imageURL: String
    releaseDate: String
    composer: [Artist]
    cast: [Artist]
    songs: [Song]
    comments: [Comment]
}
type Song {
    id: String
    name: String
    singers: [Artist]
    lyricitis: [Artist]
    songURL: String
    likes: Int
    isLike: Boolean
    imageURL: String
    albumId: String
    albumName: String
    playCount: String
}
type Artist {
    id: String
    name: String
    likes: Int
    imageURL: String
    composer: [Album]
    cast: [Album]
    singers: [Song]
    lyricitis: [Song]
}
input FilterSongList {
    name: String
    singers: String
    date: String
    likes: Boolean
    user: Boolean
}
input FilterArtist{
    name: String
    user: Boolean
}
type LikesCount{
    likes: String!
    status: Boolean!
}
type Mutation{
    createUser(register: RegisterInput!): Status!
    userlogin(username: String! password: String!): AuthData!
    verifyuser(id: String! verificationlink: String!): Status!
    resetpassword(id: String! verificationlink: String!,password: String!): Status!
    albumsListView(index: Int num: Int filter: FilterAlbumList): [Album]
    albumDetails(id: String): Album
    getSong(id: String): Song
    postComment(text: String! ID: String!): Comment
    isLogedIn(token: String):Status!
    likes(what: String id: String status: Boolean): LikesCount!
    songsListView(index: Int num: Int filter: FilterSongList): [Song]
    artistListView(index: Int num: Int filter: FilterArtist): [Artist]
    artistDetails(id: String): Artist
}
`)