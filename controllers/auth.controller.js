var md5=  require('md5')
var db =require('../db')


module.exports.login = function(req,res){
    res.render('auth/login')   
}

module.exports.postLogin = function(req,res){
    var email= req.body.email
    var password=req.body.password

    var user=db.get('users').find({email : email}).value()
    if(!user){
        res.render("auth/login",{
            errors: [
                'Users does not exists.'
            ],
            values: req.body
        })
        return
    }
    
    var hashedPassword = md5(password)

    if(user.password !== hashedPassword){
        res.render("auth/login",{
            errors: [
                'Wrong Password!!!'
            ],
            values: req.body
        })
        return
    }
    res.cookie('userID',user.id,{
        signed: true
    })
    res.redirect('/users')
}