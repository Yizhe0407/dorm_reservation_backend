import { Request, Response } from 'express';
import { Add, getAll, getPassed, getNotPassed, getWaiting, deleteReservation } from '../data/Reservation';

export const add = async (req: Request, res: Response) => {
    const { building, floor, room } = req.body;
    try {
        const reservations = await Add(building, floor, room);
        res.status(200).json(reservations);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error adding reservation', error: error.message });
        } else {
            res.status(500).json({ message: 'Error adding reservation', error: 'Unknown error' });
        }
    }
}

export const getall = async (req: Request, res: Response) => {
    try {
        const reservations = await getAll();
        res.status(200).json(reservations);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error fetching all reservations', error: error.message });
        } else {
            res.status(500).json({ message: 'Error fetching all reservations', error: 'Unknown error' });
        }
    }
}

export const getpassed = async (req: Request, res: Response) => {
    try {
        const reservations = await getPassed();
        res.status(200).json(reservations);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error fetching passed reservations', error: error.message });
        } else {
            res.status(500).json({ message: 'Error fetching passed reservations', error: 'Unknown error' });
        }
    }
}
export const getnotpassed = async (req: Request, res: Response) => {
    try {
        const reservations = await getNotPassed();
        res.status(200).json(reservations);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error fetching not passed reservations', error: error.message });
        } else {
            res.status(500).json({ message: 'Error fetching not passed reservations', error: 'Unknown error' });
        }
    }
}
export const getwaiting = async (req: Request, res: Response) => {
    try {
        const reservations = await getWaiting();
        res.status(200).json(reservations);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error fetching waiting reservations', error: error.message });
        } else {
            res.status(500).json({ message: 'Error fetching waiting reservations', error: 'Unknown error' });
        }
    }
}
export const delreservation = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const reservation = await getAll();
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        await deleteReservation(id);
        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error deleting reservation', error: error.message });
        } else {
            res.status(500).json({ message: 'Error deleting reservation', error: 'Unknown error' });
        }
    }
}