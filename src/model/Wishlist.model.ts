import { Schema, model, ObjectId } from 'mongoose';

interface IWishlist {
  userId: ObjectId,
  products: ObjectId[]
}

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