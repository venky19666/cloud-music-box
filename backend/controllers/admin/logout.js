module.exports = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/login');
    })
};