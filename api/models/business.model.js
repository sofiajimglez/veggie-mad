const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validations = require('../utils/validations');

const businessSchema = new Schema({
  username: {
    type: String,
    required:[true, 'Por favor, establece un alias para tu entidad'],
    minlength: [3, 'Mínimo 3 caracteres'],
    maxlength: [10, 'Máximo 10 caracteres'],
    lowercase: true,
    match: [/^[a-z0-9]+$/, 'Por favor, introduce solo letras minúsuculas y números, sin espacios'],
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
  description: {
    type: String,
    minlength: [15, 'Mínimo 15 caracteres']
  },
  category: {
    type: String,
    enum: {
      values: ['Restaurante', 'Alojamiento', 'Tienda', 'Asociación benéfica', 'Servicio', 'Otro'],
      message: '{VALUE} no es una categoría válida'
    },
    required: [true, 'Por favor, selecciona una categoría'],
  },
  price: {
    type: Number,
    enum: {
      values: [1, 2, 3, 4, 5],
      message: 'Por favor, introduce un valor numérico entre 1 y 5'
    }
  },
  tags: [String],
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
  gallery: [{
    type: String,
    validate: {
      validator: validations.isValidUrl,
      message: 'La url de la imagen no es válida'
    }
  }],
  facebookUrl: {
    type: String,
    validate: {
      validator: validations.isValidUrl,
      message: 'El valor introducido no es una url válida'
    }
  },
  instagramUrl: {
    type: String,
    validate: {
      validator: validations.isValidUrl,
      message: 'El valor introducido no es una url válida'
    }
  },
  twitterUrl: {
    type: String,
    validate: {
      validator: validations.isValidUrl,
      message: 'El valor introducido no es una url válida'
    }
  },
  privacy: {
    type: Boolean,
    default: false,
    required: [true, 'Tienes que aceptar nuestra Política de Privacidad para crear tu cuenta']
  },
  loyaltyCode: {
    type: String,
    maxlength: 7
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
      delete ret.confirm;
      delete ret.privacy;
      return ret;
    }
  }
});

businessSchema.pre('save', function (next) {
  const business = this;
  if (business.isModified('password')) {
    bcrypt.genSalt(10)
      .then(salt => {
        return bcrypt.hash(business.password, salt)
          .then(hash => {
            business.password = hash;
            next();
          })
      })
      .catch(error => next(error));
  } else {
    next();
  }
});

businessSchema.virtual('favs', {
  ref: 'Fav',
  localField: '_id',
  foreignField: 'business',
  justOne: false
});

businessSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'business',
  justOne: false
});

businessSchema.virtual('visits', {
  ref: 'Visit',
  localField: '_id',
  foreignField: 'business',
  justOne: false
});

const Business = mongoose.model('Business', businessSchema);
module.exports = Business;