module.exports = (req,res,next)=>{
    res.render('admin/dashboard',{
        isAdmin: req.session.IsLoggedIn,
        error: [],
        success: []
    })
};