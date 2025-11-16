import mongoose, { Document, Schema } from 'mongoose';

export interface ILog extends Document {
  level: 'error' | 'warn' | 'info';
  message: string;
  stack?: string;
  endpoint?: string;
  method?: string;
  userId?: string;
  statusCode?: number;
  timestamp: Date;
}

const logSchema = new Schema<ILog>({
  level: {
    type: String,
    enum: ['error', 'warn', 'info'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  stack: String,
  endpoint: String,
  method: String,
  userId: String,
  statusCode: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

logSchema.index({ timestamp: -1 });

export default mongoose.model<ILog>('Log', logSchema);
