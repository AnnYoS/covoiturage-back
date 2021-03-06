import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ toJSON: { virtuals: true }, versionKey: false })
export class Drive extends Document {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  driver: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
  })
  clients: string;

  @Prop(raw({
    street: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
  }))
  start: any;

  @Prop(raw({
    street: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
  }))
  finish: any;

  @Prop({
    type: Number,
    required: false,
  })
  duration: number;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: String,
    required: true,
  })
  date: string;
}

export const DriveSchema = SchemaFactory.createForClass(Drive);

