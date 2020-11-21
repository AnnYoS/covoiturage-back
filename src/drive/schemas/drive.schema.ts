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
    type: Array,
    required: false,
    trim: true,
  })
  clients: string[];

  @Prop(raw({
    street: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: Number,
      required: true,
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
      type: Number,
      required: true,
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
    required: true,
  })
  duration: number;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop(raw({
    street: {
      type: String,
      required: false,
      trim: true,
    },
    postalCode: {
      type: Number,
      required: false,
    },
    city: {
      type: String,
      required: false,
      trim: true,
    },
  }))
  stops: any[];

  @Prop({
    type: Number,
    required: true,
  })
  nbSeats: number;

  @Prop({
    type: Date,
    required: true,
  })
  date: string;
}

export const DriveSchema = SchemaFactory.createForClass(Drive);

