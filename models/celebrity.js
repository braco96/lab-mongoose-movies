const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Definimos el esquema de Celebrity con los campos necesarios
const celebritySchema = new Schema({
  // Nombre de la celebridad
  name: {
    type: String,
    required: true,
  },
  // Ocupación o por qué es famosa
  occupation: {
    type: String,
    required: true,
  },
  // Frase característica que define a la celebridad
  catchPhrase: {
    type: String,
    required: true,
  },
});

// Exportamos el modelo para poder usarlo en otras partes de la aplicación
module.exports = model('Celebrity', celebritySchema);
