import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        default: "New Chat"
    },
    messages: [
        {
            role: {
                type: String,
                enum: ["user", "model", "assistant"], // 'assistant' for compatibility
                required: true
            },
            content: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

export const Chat = mongoose.model("Chat", ChatSchema);
