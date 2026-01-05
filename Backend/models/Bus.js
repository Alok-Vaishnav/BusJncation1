import mongoose from 'mongoose';

const busSchema = new mongoose.Schema(
  {
    busName: {
      type: String,
      required: [true, 'Bus name is required'],
      trim: true
    },
    busModel: {
      type: String,
      required: [true, 'Bus model is required'],
      trim: true
    },
    busType: {
      type: String,
      required: [true, 'Bus type is required'],
      enum: {
        values: ['AC', 'Non-AC'],
        message: 'Bus type must be either AC or Non-AC'
      }
    },
    seater: {
      type: Number,
      required: [true, 'Seater capacity is required'],
      enum: {
        values: [11, 21, 25, 28, 32, 36, 38, 41, 42],
        message: 'Seater must be one of: 11, 21, 25, 28, 32, 36, 38, 41, 42'
      }
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    busImage: {
      type: String,
      default: null
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'sold'],
        message: 'Status must be either active or sold'
      },
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

const Bus = mongoose.model('Bus', busSchema);

export default Bus;
