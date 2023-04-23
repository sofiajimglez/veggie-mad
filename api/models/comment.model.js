const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: [true, 'El usuario es obligatorio']
  },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    required: [true, 'La reseña es obligatoria']
  },
  text: {
    type: String,
    minlength: [10, 'Escribe al menos 10 caracteres']
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

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;