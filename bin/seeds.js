// Script para poblar la base de datos con datos iniciales
// Ejecutar con: node bin/seeds.js

const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie');

// Conexión a la base de datos
mongoose
  .connect('mongodb://localhost/starter-code', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a Mongo para sembrar datos');
    return Promise.all([
      // Eliminamos las colecciones existentes para empezar desde cero
      Celebrity.deleteMany(),
      Movie.deleteMany(),
    ]);
  })
  .then(() => {
    // Array de celebridades iniciales
    const celebrities = [
      { name: 'Tom Cruise', occupation: 'Actor', catchPhrase: 'Show me the money!' },
      { name: 'Beyoncé', occupation: 'Cantante', catchPhrase: 'Who run the world? Girls!' },
      { name: 'Daffy Duck', occupation: 'Comediante', catchPhrase: "You're despicable!" },
    ];
    // Creamos las celebridades en la base de datos
    return Celebrity.create(celebrities);
  })
  .then((createdCelebs) => {
    console.log(`Creado ${createdCelebs.length} celebridades`);
    // Preparamos algunas películas usando las celebridades creadas como reparto
    const movies = [
      {
        title: 'Misión Musical',
        genre: 'Acción',
        plot: 'Una cantante y un actor salvan el mundo con música.',
        cast: [createdCelebs[0]._id, createdCelebs[1]._id],
      },
      {
        title: 'La odisea del pato',
        genre: 'Comedia',
        plot: 'Un pato con mala leche se embarca en una aventura espacial.',
        cast: [createdCelebs[2]._id],
      },
    ];
    // Creamos las películas
    return Movie.create(movies);
  })
  .then((createdMovies) => {
    console.log(`Creado ${createdMovies.length} películas`);
  })
  .catch((err) => {
    console.error('Error sembrando datos', err);
  })
  .finally(() => {
    // Cerramos la conexión para finalizar el script
    mongoose.connection.close();
  });
