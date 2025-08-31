import mongoose from "mongoose";


export const connectDB = async () => {
    const dbUrl =  process.env.DB_URI;
    if(!dbUrl) {
        console.error('FATAL ERROR: DATABASE_URL is not set in the .env file.')
        process.exit(1)
    }
    try {
        const connect = await mongoose.connect(dbUrl!);
        console.log('MongoDB connected succesfully');
    } catch (error) {
        console.error("Error connecting  to MongoDB:", error);
        process.exit(1)
    }
}

