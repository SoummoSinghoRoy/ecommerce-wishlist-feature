"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsFetchController = void 0;
const fetchProducts_1 = __importDefault(require("../../utils/fetchProducts"));
const Product_model_1 = __importDefault(require("../../model/Product.model"));
const productsFetchController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productsSize = yield Product_model_1.default.countDocuments();
        if (productsSize === 0) {
            const fetchProducts = yield (0, fetchProducts_1.default)();
            yield Product_model_1.default.insertMany(fetchProducts, { lean: false, limit: 0 });
            const products = yield Product_model_1.default.find();
            const response = {
                status: 200,
                message: 'Successfully retrieved',
                data: {
                    products: products,
                }
            };
            res.json(response);
        }
        else {
            const products = yield Product_model_1.default.find();
            const response = {
                status: 200,
                message: 'Successfully retrieved',
                data: {
                    products: products,
                }
            };
            res.json(response);
        }
    }
    catch (error) {
        console.log(error);
        const response = {
            status: 500,
            message: 'Error occurred, get back soon',
            error: { message: 'Internal server error' }
        };
        res.json(response);
    }
});
exports.productsFetchController = productsFetchController;
//# sourceMappingURL=product.controller.js.map