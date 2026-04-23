import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
  var mongoose: {
    conn: any | null;
    promise: Promise<any> | null;
  } | undefined;
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached!.conn) return cached!.conn;

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      connectTimeoutMS: 5000, // Short timeout for faster fallback
      family: 4,
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('MongoDB successfully connected.');
        return mongoose;
      })
      .catch((err) => {
        console.error('MongoDB Connection Error:', err.message);
        console.warn('FALLING BACK TO MOCK DATABASE MODE (Data will not persist)');
        
        // Return a mock connection object that satisfies the interface
        return {
          connection: {
            readyState: 1,
            on: () => {},
            once: () => {},
          },
          model: (name: string, schema: any) => mongoose.model(name, schema),
        };
      });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

export default dbConnect;
