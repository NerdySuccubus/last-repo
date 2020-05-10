var express = require('express');
const app = express();
var router = express.Router();
const bcrypt = require('bcrypt-nodejs')

const MovieController = require('../controllers/MovieController')
const MovieService = require('../services/MovieService')
const MovieInstance = new MovieController(new MovieService())

const UserController = require('../controllers/UserController')
const UserService = require('../services/UserService')
const UserInstance = new UserController(new UserService())
const User = require('../models/User')
const multer = require('multer')
const multerConfig = multer({ dest: 'uploads/' })

const passport = require("passport")
const Strategy = require("passport-local").Strategy;

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await new UserService().getUsersById(id)
  //Usa lo mismo que usamos para traer el usuario por id  
  cb(null, user);
});



passport.use(
  new Strategy(

    {
      usernameField: "user",
      passwordField: "password"
    },
    async (id, password, cb) => {
      const user = await new UserService().getUsersById(id)
      if (!user) {
        return cb(null, false);
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return cb(null, false);
      }
      return cb(null, user);
    }));

    

    let isAuthenticated = (req, res, next)=> {
      if (req.isAuthenticated())
        return next();
      res.redirect('/movies');
    }



async function isAdmin(req, res, next) {
  const isAdmin = req.user.isAdmin
  if (!isAdmin) {
      return res.sendStatus(401)
  }
  next()
}



/* GET home page. */


router.get('/', function (req, res, next) {
  console.log(req.isAuthenticated())
  res.render('index', { title: 'Express' });
});

router.post('/login', passport.authenticate("local"), (req, res) => {
  return res.sendStatus(200)
})

router.get('/movies', isAuthenticated, (req, res) => {
  MovieInstance.getMovies(req, res)
})

router.get('/movies/:id', isAuthenticated, (req, res) => {
  MovieInstance.getMoviesById(req, res)
})

router.post('/movie', multerConfig.single('image'), isAuthenticated, isAdmin, (req, res) => {
  try {
    // const newBody = {
    //   ...req.body, image: req.file.path
    // };
    console.log(req)
    MovieInstance.addMovie(req, res)
  } catch (err) {
    res.send(400);
  }


});

// router.post('/movie', multerConfig.single(), (req, res) => {
//   MovieInstance.addMovie(req, res)
// })

// router.post('/movie', isAdmin, (req,res)=>{
//   MovieInstance.AddMovie(req, res)
//   if(!user || !user.isAdmin){
//     return res.sendStatus(401)
//   }
// })

router.post('/login', passport.authenticate("local"), (req, res) => {
  return res.sendStatus(200);
})

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.get('/users', (req, res) => {
  UserInstance.getUsers(req, res)
})

router.get("/profile", (req, res) => {
  return res.json(req.user);
});

router.get('/users/:id', (req, res) => {
  UserInstance.getUsersById(req, res)
})

router.post('/user', (req, res) => {
  //Le pondría sign up pero convenciones
  UserInstance.addUser(req, res)
})



module.exports = router;
