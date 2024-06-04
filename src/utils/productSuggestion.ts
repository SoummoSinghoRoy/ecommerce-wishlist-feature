import Product from "../model/Product.model";
import Wishlist from "../model/Wishlist.model";

export default async function suggestProduct(userid: any, selectedItemId: any, queryValue: any): Promise<any> {
  try {
    const wishlist = await Wishlist.findOne({userId: userid}).populate('products');
    const previousProductIds = wishlist?.products.map((product: any) => product._id) || [];
    const allExcludedIds = [...previousProductIds, selectedItemId];
    const suggestedProducts = await Product.find({_id: {$nin: allExcludedIds}, family: queryValue}).limit(10);
    return suggestedProducts;
  } catch (error) {
    console.log(error);
  }
}

