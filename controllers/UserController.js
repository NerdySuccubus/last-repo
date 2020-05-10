const bcrypt = require('bcrypt-nodejs')
class UserController{

    constructor(userService){
        this.userService = userService
    }

    async addUser(req, res){
        // const data = req.body
        const newBody = {
            ...req.body, password: bcrypt.hashSync(req.body.password)
        }
        const user = await this.userService.addUser(newBody)
        return res.sendStatus(200)
    }
    

    async getUsers(req, res){
        const users = await this.userService.getUsers()

        return res.json(users)
    }

 
    async getUsersById(req, res){
        const userId = req.params.id
        const user = await this.userService.getUsersById(userId)
        return res.json(user)
    }
}

module.exports = UserController

//llama al service y de ahi pide la query, this.userService ya que ahi se interactua con la base de datos 

// Para interactuar con la base de datos necesito 