import { PrismaClient } from "../../prisma/generated/prisma";

const prisma = new PrismaClient();

export const Add = async (building: string, floor: string, room: string) => {
    return await prisma.reservation.create({
        data: {
            building: building,
            floor: floor,
            room: room,
            status: '等待檢查',
            inspector: '',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });
}

export const getAll = async () => {
    return await prisma.reservation.findMany();
};

export const getPassed = async () => {
    return await prisma.reservation.findMany({
        where: {
            status: '合格',
        },
    });
};

export const getNotPassed = async () => {
    return await prisma.reservation.findMany({
        where: {
            status: '不合格',
        },
    });
};

export const getWaiting = async () => {
    return await prisma.reservation.findMany({
        where: {
            status: '等待檢查',
        },
    });
};

export const deleteReservation = async (id: string) => {
    return await prisma.reservation.delete({
        where: {
            id: id,
        },
    });
};
