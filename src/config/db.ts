import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("MONGO_URI belum diatur");
}

let cached = (globalThis as typeof globalThis & {
    mongoose?: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    };
}).mongoose;

if (!cached) {
    cached = (globalThis as typeof globalThis & {
        mongoose?: {
            conn: typeof mongoose | null;
            promise: Promise<typeof mongoose> | null;
        };
    }).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    if (cached!.conn) return cached!.conn;

    if (!cached!.promise) {
        cached!.promise = mongoose.connect(MONGO_URI!);
    }

    try {
        cached!.conn = await cached!.promise;
    } catch (error) {
        cached!.promise = null;
        throw error;
    }

    return cached!.conn;
}