import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: function () { return !this.googleId; }, // Password not required if googleId exists
        minlength: 6
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    avatar: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ["student", "staff", "admin"],
        default: "student"
    }
}, { timestamps: true });

// Hash password before saving
UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});


// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model("User", UserSchema);
