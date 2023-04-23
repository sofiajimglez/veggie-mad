const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario es obligatorio']
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: [true, 'La entidad es obligatoria']
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: [true, 'Selecciona una puntuación']
  },
  text: {
    type: String,
    minlength: [20, 'Escribe al menos 20 caracteres']
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

reviewSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'review',
  justOne: false
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;