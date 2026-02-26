import * as complaintService from "./complaint.service.js";

export const submitComplaint = async (req, res) => {
    try {
        const images = req.files ? req.files.map(file => `/uploads/complaints/${file.filename}`) : [];
        const complaint = await complaintService.createComplaint(req.user.id, { ...req.body, attachments: images });
        res.status(201).json({ success: true, data: complaint });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getMyComplaints = async (req, res) => {
    try {
        const complaints = await complaintService.getComplaintsForStudent(req.user.id);
        res.status(200).json({ success: true, data: complaints });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllComplaints = async (req, res) => {
    try {
        const complaints = await complaintService.getAllComplaints();
        res.status(200).json({ success: true, data: complaints });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status, comment } = req.body;
        const complaint = await complaintService.updateComplaintStatus(req.params.id, req.user.id, status, comment);
        res.status(200).json({ success: true, data: complaint });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getStats = async (req, res) => {
    try {
        const stats = await complaintService.getComplaintStats();
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
