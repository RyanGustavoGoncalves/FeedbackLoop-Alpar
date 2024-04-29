import { ChatRepository } from "../repositories/chat.repository.js";

export class ChatController {
    constructor() {
        this.repository = new ChatRepository();
    }
    send = async (req, res) => {
        const message = req.body;
        try {
            const newMessage = await this.repository.registerMessage(message);
            return res.status(201).json(newMessage);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    getAllMessage = async (req, res) => {
        try {
            const allMessage = await this.repository.getAllMessageWithUser();
            return res.status(200).json(allMessage);
        } catch (error) {
            console.error('Error while fetching all messages:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    deleteAllMessage = async (req, res) => {
        try {
            await this.repository.deleteAllMessage();
            return res.status(204).send();
        } catch (error) {
            console.error('Error while deleting all messages:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    updateMessage = async (req, res) => {
        try {
            const { id } = req.params;
            const { message } = req.body;
            const updatedMessage = await this.repository.updateMessage(id, message);
            return res.status(200).json(updatedMessage);
        } catch (error) {
            console.error('Error while updating message:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    deleteMessage = async (req, res) => {
        try {
            const { id } = req.params;
            await this.repository.deleteMessage(id);
            return res.status(204).send();
        } catch (error) {
            console.error('Error while deleting message:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}