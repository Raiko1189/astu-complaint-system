import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    status: {
        type: String,
        enum: ["open", "in_progress", "resolved"],
        default: "open"
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    attachments: [
        {
            type: String // URLs or paths to files
        }
    ],
    remarks: [
        {
            staffId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            comment: String,
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

export const Complaint = mongoose.model("Complaint", ComplaintSchema);
