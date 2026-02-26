
import { Chat } from "../../model/Chat.js";

export const saveChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const { messages, title, chatId } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ success: false, message: "Messages array is required" });
        }

        let savedChat;
        if (chatId) {
            // Update existing chat
            savedChat = await Chat.findOneAndUpdate(
                { _id: chatId, userId },
                { messages, title },
                { new: true }
            );
        }

        if (!savedChat) {
            // Create a new chat session (or if update failed/not found)
            const newChat = new Chat({
                userId,
                title: title || "New Chat",
                messages
            });
            savedChat = await newChat.save();
        }

        res.status(201).json({
            success: true,
            data: savedChat,
            message: "Chat saved successfully"
        });

    } catch (error) {
        console.error("Save Chat Error:", error);
        res.status(500).json({ success: false, message: "Failed to save chat" });
    }
};

export const getHistory = async (req, res) => {
    try {
        const userId = req.user._id;

        const chats = await Chat.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: chats
        });

    } catch (error) {
        console.error("Get History Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch chat history" });
    }
};

export const deleteChat = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const deletedChat = await Chat.findOneAndDelete({ _id: id, userId });

        if (!deletedChat) {
            return res.status(404).json({ success: false, message: "Chat not found or unauthorized" });
        }

        res.status(200).json({
            success: true,
            message: "Chat deleted successfully"
        });

    } catch (error) {
        console.error("Delete Chat Error:", error);
        res.status(500).json({ success: false, message: "Failed to delete chat" });
    }
};
