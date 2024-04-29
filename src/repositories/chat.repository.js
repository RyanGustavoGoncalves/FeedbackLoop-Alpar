import { PrismaClient } from "@prisma/client";
import { UserRepository } from "./user.repository.js";

const userRepository = new UserRepository();
export class ChatRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    registerMessage = async ({ message, userId }) => {
        return await this.prisma.message.create({
            data: {
                text: message,
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
    }

    getAllMessage = async () => {
        return await this.prisma.message.findMany();
    }

    getMessageById = async (id) => {
        return await this.prisma.message.findUnique({
            where: {
                id: id
            }
        });
    }

    getMessagesByUserId = async (userId) => {
        return await this.prisma.message.findMany({
            where: {
                authorId: userId
            }
        });
    }

    getAllMessageWithUser = async () => {
        return await this.prisma.message.findMany({
            include: {
                author: true
            }
        });
    }

    deleteAllMessage = async () => {
        return await this.prisma.message.deleteMany();
    }

    updateMessage = async (id, message) => {
        return await this.prisma.message.update({
            where: {
                id: parseInt(id)
            },
            data: {
                text: message
            }
        });
    }

    deleteMessage = async (id) => {
        return await this.prisma.message.delete({
            where: {
                id: parseInt(id)
            }
        });
    }
}