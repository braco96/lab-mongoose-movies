const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Definimos el esquema de Movie con sus atributos
const movieSchema = new Schema({
  // Título de la película
  title: {
    type: String,
    required: true,
  },
  // Género al que pertenece la película
  genre: {
    type: String,
    required: true,
  },
  // Sinopsis o trama de la película
  plot: {
    type: String,
    required: true,
  },
  // Reparto de celebridades que forman parte de la película
  cast: [{
    type: Schema.Types.ObjectId,
    ref: 'Celebrity',
  }],
});

// Exportamos el modelo de película
module.exports = model('Movie', movieSchema);
