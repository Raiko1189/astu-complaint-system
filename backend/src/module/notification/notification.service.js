import { Notification } from "../../model/Notification.js";

export const createNotification = async (userId, title, message) => {
    const notification = new Notification({ userId, title, message });
    return await notification.save();
};

export const getNotificationsForUser = async (userId) => {
    return await Notification.find({ userId }).sort({ createdAt: -1 });
};

export const markAsRead = async (notificationId) => {
    return await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
};
