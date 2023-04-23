import { Uuid } from '@shared/domain/value-object/Uuid';
import { Document, Model, Schema, model } from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

export type UserModelType = Model<UserDocument>;
export interface UserDocument extends Document {
  id: string;
  email: string;
  name?: string;
}

export const UserSchema: Schema = new Schema(
  {
    id: {
      type: String,
      default: () => Uuid.random().value,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
UserSchema.plugin(mongooseLeanVirtuals);

export const UserModel = model<UserDocument, UserModelType>('User', UserSchema);
