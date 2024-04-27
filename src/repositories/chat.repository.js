import { PrismaClient } from "@prisma/client";
import { UserRepository } from "./user.repository.js";

const userRepository = new UserRepository();
export class ChatRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    registerMessage = async ({ message, userId }) => {
        try {
            const user = await userRepository.getUserById(userId);
            const newMessage = await this.prisma.message.create({
                data: {
                    text: message,
                    user: { connect: { id: userId } }
                }
            });

            return newMessage;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getAllMessage = async () => {
        return await this.prisma.message.findMany();
    }

}