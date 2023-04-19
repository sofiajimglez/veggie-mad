const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validations = require('../utils/validations');

const userSchema = new Schema({
  username: {
    type: String,
    required:[true, 'Por favor, establece un alias'],
    minlength: [3, 'Mínimo 3 caracteres'],
    maxlength: [10, 'Máximo 10 caracteres'],
    lowercase: true,
    match: [/^[a-z0-9]+$/, 'Por favor, introduce solo letras minúsuculas o números sin espacios'],
    unique: true, 
  },
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minlength: [3, 'Mínimo 3 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    match: [/^\S+@\S+\.\S+$/, 'Por favor, introduce un email válido']
  },
  password: {
    type: String,
    required: [true, 'Por favor, establece una contraseña'],
    trim: true,
    minlength: [8, 'Mínimo 8 caracteres']
  }, 
  location: {
    type: String,
    //TODO: Google Maps API
  },
  imageUrl: {
    type: String,
    validate: {
      validator: validations.isValidUrl,
      message: 'La url de la imagen no es válida'
    }
    //TODO: default img
  },
  privacy: {
    type: Boolean,
    default: false
  },
  points: {
    type: Number,
    default: 0
  },
  confirm: {
    type: Boolean,
    default: process.env.USER_CONFIRMATION_REQUIRED === 'false'
  }
}, { 
  timestamps: true,
  toJSON: { //intercepts and manipulates the response in json format
    virtuals: true,
    transform: function (doc, ret) {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      return ret;
    }
  }
});

userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
          .then(hash => {
            user.password = hash;
            next();
          })
      })
      .catch(error => next(error));
  } else {
    next();
  }
});

userSchema.virtual("favs", {
  ref: "Fav",
  localField: "_id",
  foreignField: "user",
  justOne: false
});

userSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "user",
  justOne: false
});

userSchema.virtual("visits", {
  ref: "Visit",
  localField: "_id",
  foreignField: "user",
  justOne: false
});

const User = mongoose.model('User', userSchema);
module.exports = User;