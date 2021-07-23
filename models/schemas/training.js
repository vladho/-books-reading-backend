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
      default: 0,
    },
    inProgress: {
      type: Boolean,
      default: true,
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
    result: {
      type: [
        {
          date: {
            type: String,
          },
          plannedPages: {
            type: Number,
          },
          factPages: {
            type: Number,
          },
          stats: [
            {
              time: {
                type: String,
              },
              pages: {
                type: Number,
              },
            },
          ],
        },
      ],
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = trainingSchema;
