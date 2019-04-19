const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity');

// Ruta para mostrar la lista completa de celebridades
router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      // Renderizamos la vista con las celebridades encontradas
      res.render('celebrities/index', { celebrities });
    })
    .catch((err) => next(err));
});

// Formulario para crear una nueva celebridad
router.get('/celebrities/new', (req, res) => {
  res.render('celebrities/new');
});

// Procesa el formulario de creación de celebridad
router.post('/celebrities', (req, res, next) => {
  // Extraemos los datos del formulario
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect('/celebrities'))
    .catch((err) => {
      // Si hay un error, volvemos a mostrar el formulario
      res.render('celebrities/new');
      next(err);
    });
});

// Página de detalles de una celebridad
router.get('/celebrities/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrity) => res.render('celebrities/show', { celebrity }))
    .catch((err) => next(err));
});

// Eliminar una celebridad específica
router.post('/celebrities/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/celebrities'))
    .catch((err) => next(err));
});

// Formulario para editar una celebridad existente
router.get('/celebrities/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrity) => res.render('celebrities/edit', { celebrity }))
    .catch((err) => next(err));
});

// Procesa la edición de la celebridad
router.post('/celebrities/:id', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(req.params.id, { name, occupation, catchPhrase })
    .then(() => res.redirect(`/celebrities/${req.params.id}`))
    .catch((err) => next(err));
});

module.exports = router;
