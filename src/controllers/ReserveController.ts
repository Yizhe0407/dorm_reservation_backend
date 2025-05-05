// File: src/controllers/ReserveController.ts
import { Request, Response } from 'express';
import { findReserve, addReserve, getAll, getPass, getNotPass, getWaitReserved, setPass, setNotPass, setDelete, deleteAll } from '../data/Reserve';

export const create = async (req: Request, res: Response): Promise<void> => {
    const { building, floor, room } = req.body;
    const info = await findReserve(building, floor, room);
    console.log("info", info);
    if (info) {
        res.status(400).json({ message: 'This room has already been reserved.' });
        return;
    }

    try {
        const newReserve = await addReserve(building, floor, room);
        res.status(201).json(newReserve);
    } catch (error) {
        console.error("Error creating reservation:", error);
        res.status(500).json({ message: 'Server error', error });
    }
}

export const all = async (req: Request, res: Response): Promise<void> => {
    try {
        const reserves = await getAll();
        res.status(200).json(reserves);
    } catch (error) {
        console.error("Error fetching all reservations:", error);
        res.status(500).json({ message: 'Server error', error });
    }
}

export const waiting = async (req: Request, res: Response): Promise<void> => {
    try {
        const reserve = await getWaitReserved();
        res.status(200).json(reserve);
    } catch (error) {
        console.error("Error fetching failed reservation:", error);
        res.status(500).json({ message: 'Server error', error });
    }
}

export const pass = async (req: Request, res: Response): Promise<void> => {
    try {
        const reserve = await getPass();
        res.status(200).json(reserve);
    } catch (error) {
        console.error("Error fetching unchecked reservation:", error);
        res.status(500).json({ message: 'Server error', error });
    }
}

export const rejected = async (req: Request, res: Response): Promise<void> => {
    try {
        const reserve = await getNotPass();
        res.status(200).json(reserve);
    } catch (error) {
        console.error("Error fetching rejected reservation:", error);
        res.status(500).json({ message: 'Server error', error });
    }
}

export const qualified = async (req: Request, res: Response): Promise<void> => {
    const { building, floor, room, inspector } = req.body;
    try {
        const reserve = await setPass(building, floor, room, inspector);
        res.status(200).json(reserve);
    } catch (error) {
        console.error("Error fetching unchecked reservation:", error);
        res.status(500).json({ message: 'Server error', error });
    }
}

export const unQualified = async (req: Request, res: Response): Promise<void> => {
    const { building, floor, room, inspector } = req.body;
    try {
        const reserve = await setNotPass(building, floor, room, inspector);
        res.status(200).json(reserve);
    } catch (error) {
        console.error("Error fetching unchecked reservation:", error);
        res.status(500).json({ message: 'Server error', error });
    }
}

export const deleteOne = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;
    try {
        const reserve = await setDelete(id);
        if (!reserve) {
            res.status(404).json({ message: 'Reservation not found' });
            return;
        }
        res.status(200).json(reserve);
    } catch (error) {
        console.error("Error deleting reservation:", error);
        res.status(500).json({ message: 'Server error', error });
    }
}

export const deleted = async (req: Request, res: Response): Promise<void> => {
    try {
        const reserves = await deleteAll();
        res.status(200).json(reserves);
    } catch (error) {
        console.error("Error deleting all reservations:", error);
        res.status(500).json({ message: 'Server error', error });
    }
}