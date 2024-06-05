import { Schema, model } from 'mongoose';
import { IProduct } from '../Types/types';

const productSchema = new Schema<IProduct>({}, { strict: false, timestamps: true });

const Product = model<IProduct>('Product', productSchema);

export default Product;