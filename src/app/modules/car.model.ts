import { model, Schema } from 'mongoose';
import { TCar } from './car/car.interface';

const carSchema = new Schema<TCar>(
  {
    brand: {
      type: String,
      required: [true, 'Brand is required.'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Model is required.'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Year is required.'],
      min: [1886, 'Year must be 1886 or later.'], // The first car was made in 1886
      max: [new Date().getFullYear(), 'Year cannot exceed the current year.'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required.'],
      min: [0, 'Price must be a positive number.'],
    },
    category: {
      type: String,
      required: [true, 'Category is required.'],
    },
    description: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'],
      min: [0, 'Quantity must be a non-negative number.'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'Stock status is required.'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: false,
      transform: (doc, ret) => {
        delete ret.isDeleted;
        return ret;
      },
    },
  },
);

//middleware
carSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
carSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

export const Car = model<TCar>('car', carSchema);
