import mongoose from "mongoose";
import { config } from "./app.config";

let isConnected = false;

const connectDatabase = async () => {
	if (isConnected) {
		return mongoose.connection;
	}

	try {
		const conn = await mongoose.connect(config.MONGO_URI, {
			connectTimeoutMS: 10000,
		});

		isConnected = mongoose.connection.readyState === 1;
		console.log(`MongoDB connected: ${conn.connection.host}`);

		return conn;
	} catch (error) {
		console.error("MongoDB connection Error: ", error);
		process.exit(1);
	}
};

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

mongoose.connection.on("error", err => {
  console.error("MongoDB error:", err);
});

export default connectDatabase;
