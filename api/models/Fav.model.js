const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario es obligatorio']
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: [true, 'La entidad es obligatoria']
  }
},
{
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  }
});

const Fav = mongoose.model('Fav', favSchema);
module.exports = Fav;