const User = require('../models/User')

class UserService{

    addUser(newBody){
        const query = new User(newBody)
        //Aca data es el body, o el json que me traigo desde postman, que dice donde va cada key:value
        return query.save()
    }


    getUsers(){
        const query = User.find().exec()
        
        return query
    }


    getUsersById(userId){
        const query = User.findOne({ _id: userId}).exec();

        return query
    }

    
}

module.exports = UserService