import { PrismaClient } from "../../prisma/generated/prisma";

const prisma = new PrismaClient();

export const findReserve = async (building: string, floor: string, room: string) => {
    try {
        const reserve = await prisma.reservation.findFirst({
            where: {
                building,
                floor,
                room,
            },
        });
        return reserve;
    } catch (error) {
        console.error("Error fetching reservation:", error);
        throw new Error("Failed to fetch reservation");
    }
}

export const addReserve = async (building: string, floor: string, room: string) => {
    const reserve = await prisma.reservation.create({
        data: {
            building,
            floor,
            room,
            status: '等待檢查',
            inspector: '尚未檢查',
        },
    });
    return reserve;
}

export const getAll = async () => {
    try {
        const reserves = await prisma.reservation.findMany();
        return reserves;
    } catch (error) {
        console.error("Error fetching all reservations:", error);
        throw new Error("Failed to fetch all reservations");
    }
}

export const getWaitReserved = async () => {
    try {
        const reserves = await prisma.reservation.findMany({
            where: {
                status: '等待檢查',
            },
        });
        return reserves;
    } catch (error) {
        console.error("Error fetching reservation:", error);
        throw new Error("Failed to fetch reservation");
    }
}

export const getPass = async () => {
    try {
        const reserves = await prisma.reservation.findMany({
            where: {
                status: '合格',
            },
        });
        return reserves;
    } catch (error) {
        console.error("Error fetching reservation:", error);
        throw new Error("Failed to fetch reservation");
    }
};

export const getNotPass = async () => {
    try {
        const reserves = await prisma.reservation.findMany({
            where: {
                status: '不合格',
            },
        });
        return reserves;
    } catch (error) {
        console.error("Error fetching reservation:", error);
        throw new Error("Failed to fetch reservation");
    }
}

export const setPass = async (building: string, floor: string, room: string, inspector: string) => {
    try {
        const reserve = await prisma.reservation.updateMany({
            where: {
                building,
                floor,
                room,
            },
            data: {
                status: '合格',
                inspector,
            },
        });
        return reserve;
    } catch (error) {
        console.error("Error updating reservation:", error);
        throw new Error("Failed to update reservation");
    }
}

export const setNotPass = async (building: string, floor: string, room: string, inspector: string) => {
    try {
        const reserve = await prisma.reservation.updateMany({
            where: {
                building,
                floor,
                room,
            },
            data: {
                status: '不合格',
                inspector,
            },
        });
        return reserve;
    } catch (error) {
        console.error("Error updating reservation:", error);
        throw new Error("Failed to update reservation");
    }
}

export const setDelete = async (id: string) => {
    try {
      const target = await prisma.reservation.findFirst({
        where: { id }
      });
  
      if (!target) return null;
  
      const deleted = await prisma.reservation.delete({
        where: { id: target.id },
      });
  
      return deleted;
    } catch (error) {
      console.error("Error deleting reservation:", error);
      throw new Error("Failed to delete reservation");
    }
  };
  

export const deleteAll = async () => {
    try {
        const reserves = await prisma.reservation.deleteMany();
        return reserves;
    } catch (error) {
        console.error("Error deleting all reservations:", error);
        throw new Error("Failed to delete all reservations");
    }
}