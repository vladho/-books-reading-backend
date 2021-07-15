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
        ref: 'Book',
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

module.exports = trainingSchema;