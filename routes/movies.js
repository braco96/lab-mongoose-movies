const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const Celebrity = require('../models/celebrity');

// Ruta para listar todas las películas
router.get('/movies', (req, res, next) => {
  Movie.find()
    .then((movies) => {
      // Mostramos la lista de películas
      res.render('movies/index', { movies });
    })
    .catch((err) => next(err));
});

// Formulario para crear una nueva película
router.get('/movies/new', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      // Pasamos las celebridades para seleccionarlas como reparto
      res.render('movies/new', { celebrities });
    })
    .catch((err) => next(err));
});

// Procesa la creación de una película
router.post('/movies', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect('/movies'))
    .catch((err) => {
      // Si hay error, recargamos el formulario con los datos necesarios
      Celebrity.find().then((celebrities) => {
        res.render('movies/new', { celebrities });
      });
      next(err);
    });
});

// Detalles de una película específica
router.get('/movies/:id', (req, res, next) => {
  Movie.findById(req.params.id)
    .populate('cast') // Obtenemos la información completa de cada celebridad
    .then((movie) => res.render('movies/show', { movie }))
    .catch((err) => next(err));
});

// Eliminar una película
router.post('/movies/:id/delete', (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/movies'))
    .catch((err) => next(err));
});

// Formulario para editar una película
router.get('/movies/:id/edit', (req, res, next) => {
  Promise.all([
    Movie.findById(req.params.id),
    Celebrity.find(),
  ])
    .then(([movie, celebrities]) => {
      // Marcamos las celebridades que ya están en el reparto
      const castIds = movie.cast.map((id) => id.toString());
      const updatedCelebs = celebrities.map((celebrity) => ({
        ...celebrity.toObject(),
        selected: castIds.includes(celebrity._id.toString()),
      }));
      // Renderizamos el formulario con la película y las celebridades disponibles
      res.render('movies/edit', { movie, celebrities: updatedCelebs });
    })
    .catch((err) => next(err));
});

// Procesa la edición de una película
router.post('/movies/:id', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast })
    .then(() => res.redirect(`/movies/${req.params.id}`))
    .catch((err) => next(err));
});

module.exports = router;
