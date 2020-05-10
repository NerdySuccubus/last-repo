const db = require('../db')

class RandomService{
    getUser(){
        const users = new Promise((resolve, reject)=>{
            db.query(
                `SELECT * FROM usuarios
                INNER JOIN paises 
                ON usuarios.paisId = paises.paisId
                INNER JOIN  tipos
                ON usuarios.tipoId = tipos.tipoId
                ORDER BY userId ASC 
                `, (err, data)=>{
                    resolve(data)
                }
            )
        })
    }
    //EL FILTRO ES LOLGICA DE NEGOCIO ASI QUE LO HAGO DESDE EL CONTROLLER 
    /*
    dENTRO DEL GET USERS
    const newuser = []
    users.map((user)=>{
        newuser.push({
            email: user.email,
            nombre: user.nombre,
            paisNombre: user.pais,
            tipoNombre: user.tipo
        })

    })

    return res.json(newusers) y aca devolvemos los usuarios filtrados con los datos que queremos 
    */


}

module.exports = RandomService

//Si puedo ver algo me aseguro que mi problema está en el en el service o el controller no en el linkeo de archivosb 
/*
return.res.send('HOLA')

//Si me devuelve el JSON se que mi error esta en el service o en la query (que era una promise que abraza a la query ah)

            const users = new Promise((resolve, reject)=>{
                        resolve({
                            name: "CourseIt"
                        })
                    })

//Con la promise podemos ver que está devolviendo algo, antes de hacer una query especifica
//Una vez que veo que puedo acceder a la info sin problema recién ahí pienso en mis queries 

CB => callback 
*/