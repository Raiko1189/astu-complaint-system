import { Complaint } from "../../model/Complaint.js";
import { Category } from "../../model/Category.js";
import { createNotification } from "../notification/notification.service.js";

export const createComplaint = async (studentId, complaintData) => {
    const { title, description, categoryName, attachments } = complaintData;

    const category = await Category.findOne({ name: categoryName });
    if (!category) {
        throw new Error("Invalid category");
    }

    const complaint = new Complaint({
        studentId,
        title,
        description,
        categoryId: category._id,
        attachments: attachments || []
    });

    await complaint.save();
    return complaint;
};

export const getComplaintsForStudent = async (studentId) => {
    return await Complaint.find({ studentId }).populate("categoryId").sort({ createdAt: -1 });
};

export const getAllComplaints = async () => {
    return await Complaint.find()
        .populate("studentId", "email")
        .populate("categoryId")
        .populate("assignedTo", "email")
        .sort({ createdAt: -1 });
};


export const updateComplaintStatus = async (complaintId, staffId, status, comment) => {
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
        throw new Error("Complaint not found");
    }

    complaint.status = status;

    // Automatically assign if not already assigned
    if (!complaint.assignedTo) {
        complaint.assignedTo = staffId;
    }
    if (comment) {
        complaint.remarks.push({
            staffId,
            comment,
            timestamp: new Date()
        });
    }

    await complaint.save();

    // Trigger notification
    await createNotification(
        complaint.studentId,
        "Complaint Status Updated",
        `Your complaint "${complaint.title}" is now ${status.replace('_', ' ')}.`
    );

    return complaint;
};

export const getComplaintStats = async () => {
    const total = await Complaint.countDocuments();
    const resolved = await Complaint.countDocuments({ status: "resolved" });
    const inProgress = await Complaint.countDocuments({ status: "in_progress" });
    const open = await Complaint.countDocuments({ status: "open" });

    const categories = await Complaint.aggregate([
        { $group: { _id: "$categoryId", count: { $sum: 1 } } },
        { $lookup: { from: "categories", localField: "_id", foreignField: "_id", as: "category" } },
        { $unwind: "$category" },
        { $project: { name: "$category.name", count: 1 } }
    ]);

    return {
        total,
        resolved,
        inProgress,
        open,
        resolutionRate: total > 0 ? (resolved / total) * 100 : 0,
        categories
    };
};
