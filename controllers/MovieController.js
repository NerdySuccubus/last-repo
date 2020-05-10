class MovieController{
   
    constructor(movieService){
        this.movieService = movieService
    }

    
    async addMovie(req, res){
        req.body.image = req.file.path;
        //req.body.image = req.file.destination+req.file.filename
        const data = req.body
        const movie = await this.movieService.addMovie(data)
        //Pido desde la variable data el body (con req), y se lo mando al service para que
        //Ejecute su propia funcion y haga el llamado a la base de datos y me lo traiga
        return res.sendStatus(200)

    }

    async getMovies(req, res){
        //const pageNumber = req.params.page 
       // const movies = await this.movieService.getMovies(pageNumber)
        const movies = await this.movieService.getMovies()
        //aca no le paso parámetro porque el filtro de mongoose me devuelve todo automaticamente 
        return res.json(movies)
    }

    async getMoviesById(req, res){
        const movieId = req.params.id
        const movies = await this.movieService.getMoviesById(movieId)
        return res.json(movies)
    }



}

module.exports = MovieController