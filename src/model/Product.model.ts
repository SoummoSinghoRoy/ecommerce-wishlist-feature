import { Schema, model } from 'mongoose';

interface IProduct {
  [key: string]: any
}

const productSchema = new Schema<IProduct>({}, { strict: false, timestamps: true });

const Product = model<IProduct>('Product', productSchema);

export default Product;