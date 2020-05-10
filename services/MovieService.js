const Movie = require('../models/Movie')

class MovieService{

  
    addMovie(data){
        const newMovie = new Movie(data)

        return newMovie.save()
    }


    getMovies(){
        //aca le pasaba pageNumber en un intento de hacer el paginate pero buen
        const query = Movie.find().exec();
        // Movie.paginate({}, { page: pageNumber, limit: 5 }, function(err, result) {
        //     return result
        // });

        return query 

    }

    getMoviesById(movieId){
        const query = Movie.findOne({_id: movieId}).exec();
        //Puede no ser obligatorio que aca el param se llame igual que en el controller, 
        //pero es más facil de leer y no queda mal 

        return query

    }

}

module.exports = MovieService