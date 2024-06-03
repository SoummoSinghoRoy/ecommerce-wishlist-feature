import { Request, Response } from "express";
import fetchProductsExtarnally from "../../utils/fetchProducts";
import Product from "../../model/Product.model";

interface ApiResponse {
  status: number;
  message?: string;
  error?: {
    message: string | object
  };
  data?: {
    [key: string]: any
  }
}

export const productsFetchController = async (req: Request, res: Response): Promise<void> => {
  try {
    const productsSize = await Product.countDocuments();
    if(productsSize === 0) {
      const fetchProducts = await fetchProductsExtarnally();
      await Product.insertMany(fetchProducts, {lean: false, limit: 0})
      const products = await Product.find();
      const response: ApiResponse = {
        status: 200,
        message: 'Successfully retrieved',
        data: {
          products: products,
        }
      }
      res.json(response) 
    } else {
      const products = await Product.find();
      const response: ApiResponse = {
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
    const response: ApiResponse = {
      status: 500,
      message: 'Error occurred, get back soon',
      error: { message: 'Internal server error' }
    }
    res.json(response)
  }
} 