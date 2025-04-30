import { PrismaClient } from "../../prisma/generated/prisma";

const prisma = new PrismaClient();

export const findUser = async (username: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username }
        });
        return user;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
    }
};
export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw new Error("Failed to fetch user");
    }
}
export const createUser = async (username: string, password: string) => {
    try {
        const user = await prisma.user.create({
            data: { username, password },
        });
        return user;
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
    }
}
export const updateUser = async (id: string, username: string, password: string) => {
    try {
        const user = await prisma.user.update({
            where: { id },
            data: { username, password },
        });
        return user;
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Failed to update user");
    }
}
export const deleteUser = async (id: string) => {
    try {
        const user = await prisma.user.delete({
            where: { id },
        });
        return user;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Failed to delete user");
    }
}