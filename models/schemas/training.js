const { Schema, SchemaTypes } = require('mongoose');

const trainingSchema = new Schema(
  {
    startDate: {
      type: String,
      required: [true, 'Set start date for training'],
    },
    finishDate: {
      type: String,
      required: [true, 'Set end date for training'],
    },
    duration: {
      type: Number,
    },
    //?????
    inProgress: {
      type: Boolean,
      default: false,
    },
    stats: {
      time: {
        type: String,
      },
      pages: {
        type: Number,
      },
    },
    books: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'book',
      },
    ],
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = trainingSchema;
