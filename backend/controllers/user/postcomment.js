const Comment = require('../../models/user/comment');

module.exports = async function({text,ID},req) {
    try{
        if(req.isAuth){
            const comment =await Comment.create({
                userId: req.userID,
                albumId: ID,
                text: text,
                time: new Date(),
            })
            console.log(comment);
            return comment.dataValues
        }else{
            throw new Error("User must login to use comment function!");
        }
    }catch(error){
        throw error;
    }
    
}