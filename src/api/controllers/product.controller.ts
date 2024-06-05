import { Request, Response } from "express";
import { ProductApiResponse } from '../../Types/types';

import fetchProductsExtarnally from "../../utils/fetchProducts";
import Product from "../../model/Product.model";
import Wishlist from "../../model/Wishlist.model";
import { CustomRequest } from "../../middlewares/isAuthenticated.middleware";
import suggestProduct from "../../utils/productSuggestion.js";

export const productsFetchController = async (req: Request, res: Response): Promise<void> => {
  try {
    const productsSize = await Product.countDocuments();
    if(productsSize === 0) {
      const fetchProducts = await fetchProductsExtarnally();
      await Product.insertMany(fetchProducts)
      const products = await Product.find();
      const response: ProductApiResponse = {
        status: 200,
        message: 'Successfully retrieved',
        data: {
          products: products,
        }
      }
      res.json(response) 
    } else {
      const products = await Product.find();
      const response: ProductApiResponse = {
        status: 200,
        message: 'Successfully retrieved',
        data: {
          products: products,
        }
      }
      res.json(response)
    }
  } catch (error) {
    console.log(error);
    const response: ProductApiResponse = {
      status: 500,
      message: 'Error occurred, get back soon',
      error: { message: 'Internal server error' }
    }
    res.json(response)
  }
} 

export const wishlistAddPostController = async (req: Request, res: Response): Promise<void> => {
  const customReq = req as CustomRequest;
  const { itemId } = req.params;
  try {
    const product = await Product.findOne({_id: itemId});
    if (product) {
      const wishlistSize = await Wishlist.find({userId: customReq.user?.id}).countDocuments();
      if(wishlistSize === 0) {
        const newWishlist = new Wishlist({
          userId: customReq.user?.id,
          products: [product._id]
        })
        await newWishlist.save();
        const suggestedProducts = await suggestProduct(customReq.user?.id, itemId, product.family);
        const response: ProductApiResponse = {
          status: 200,
          message: 'Item saved in wishlist',
          data: {
            wishlist: product,
            suggestedProducts
          }
        }
        res.json(response)
      } else {
        await Wishlist.findOneAndUpdate(
          { userId: customReq.user?.id },
          { $push: { products: product._id } },
          { new: true }
        );
        const suggestedProducts = await suggestProduct(customReq.user?.id, itemId, product.family);
        const response: ProductApiResponse = {
          status: 200,
          message: 'Item saved in wishlist',
          data: {
            wishlist: product,
            suggestedProducts
          }
        }
        res.json(response)
      }
    } else {
      const response: ProductApiResponse = {
        status: 404,
        message: 'Product not found',
      }
      res.json(response)
    }
  } catch (error) {
    console.log(error);
    const response: ProductApiResponse = {
      status: 500,
      message: 'Error occurred, get back soon',
      error: { message: 'Internal server error' }
    }
    res.json(response)
  }
}