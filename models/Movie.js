const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');

const movieSchema = mongoose.Schema({

    name: {type : String},
    category: {type: String},
    image: {type: String},
    type: {type: String},
    

})

movieSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Movie', movieSchema)