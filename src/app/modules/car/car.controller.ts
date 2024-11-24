import { Request, Response } from "express";
import { CarService } from "./car.services";
import { carSchema } from "./car.validation";

const createCar = async (req: Request, res: Response) => {
    try {
        const carData = req.body;
        const createData = {
            ...carData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        const parseValue = carSchema.parse(createData);

        const result = await CarService.createCarIntoDB(parseValue)

        res.status(200).json({
            message: "Car created successfully",
            success: true,
            data: result
        })
    } catch (err) {
        res.status(500).json({
            message: "Car is not created",
            success: false,
            data: err
        })
    }
}

const getAllCars = async (req: Request, res: Response) => {
    try {
        const result = await CarService.getAllCars()
        res.status(200).json({
            message: "Cars retrieved successfully",
            success: true,
            data: result
        })
    } catch (err) {
        res.status(500).json({
            message: "Car is not retrieved",
            success: false,
            data: err
        })
    }
}
const getSingleCar = async (req: Request, res: Response) => {
    try {
        const { carId } = req.params
        const result = await CarService.getSingleCar(carId)

        res.status(200).json({
            message: "Car retrieved successfully",
            success: true,
            data: result
        })
    } catch (err) {
        res.status(500).json({
            message: "Car not found",
            success: false,
            data: err
        })
    }
}
const updateCar = async (req: Request, res: Response) => {
    try {
        const { carId } = req.params
        const updatedData = req.body
        const result = await CarService.updateCar(carId, updatedData)

        res.status(200).json({
            message: "Car updated successfully",
            success: true,
            data: result
        })
    } catch (err) {
        res.status(500).json({
            message: "Car is not updated",
            success: false,
            data: err
        })
    }
}
const deleteCar = async (req: Request, res: Response) => {
    try {
        const { carId } = req.params
        await CarService.deleteCar(carId)

        res.status(200).json({
            message: "Car deleted successfully",
            success: true,
            data: {}
        })
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            success: false,
            data: err
        })
    }
}


export const CarController = {
    createCar,
    getAllCars,
    getSingleCar,
    updateCar,
    deleteCar,
}