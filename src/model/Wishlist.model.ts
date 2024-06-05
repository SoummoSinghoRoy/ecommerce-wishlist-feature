import { Schema, model } from 'mongoose';
import { IWishlist } from '../Types/types';

const wishlistSchema = new Schema<IWishlist>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, {
  timestamps: true
})

const Wishlist = model<IWishlist>('Wishlist', wishlistSchema);

export default Wishlist;