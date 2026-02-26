import mongoose from 'mongoose';

const officeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Office name is required'],
        trim: true
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    latitude: {
        type: Number,
        required: [true, 'Latitude is required']
    },
    longitude: {
        type: Number,
        required: [true, 'Longitude is required']
    }
}, {
    timestamps: true
});

const Office = mongoose.model('Office', officeSchema);

export default Office;
