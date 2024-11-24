import { Types } from 'mongoose';
import { Car } from '../car.model';
import { TCar } from './car.interface';

const createCarIntoDB = async (carData: TCar) => {
  const result = await Car.create(carData);
  return result;
};

const getAllCars = async () => {
  const result = await Car.find({ isDeleted: false });
  return result;
};

const getSingleCar = async (_id: string) => {
  const result = await Car.findOne({ _id: new Types.ObjectId(_id) });
  console.log('getSingleCar - result:', result);
  if (!result) {
    throw new Error('Car not found');
  }
  return result;
};

const updateCar = async (_id: string, updatedData: Partial<TCar>) => {
  const result = await Car.updateOne(
    { _id: new Types.ObjectId(_id) },
    { $set: updatedData },
  );
  if (result.acknowledged) {
    return await getSingleCar(_id);
  }
  return result;
};

const deleteCar = async (_id: string) => {
  const result = await Car.updateOne(
    { _id: new Types.ObjectId(_id) },
    { $set: { isDeleted: true } },
  );
  return result;
};

export const CarService = {
  createCarIntoDB,
  getAllCars,
  getSingleCar,
  updateCar,
  deleteCar,
};
