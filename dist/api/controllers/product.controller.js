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
exports.wishlistAddPostController = exports.productsFetchController = void 0;
const fetchProducts_ts_1 = __importDefault(require("../../utils/fetchProducts.ts"));
const Product_model_1 = __importDefault(require("../../model/Product.model"));
const Wishlist_model_1 = __importDefault(require("../../model/Wishlist.model"));
const productSuggestion_js_1 = __importDefault(require("../../utils/productSuggestion.js"));
const productsFetchController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productsSize = yield Product_model_1.default.countDocuments();
        if (productsSize === 0) {
            const fetchProducts = yield (0, fetchProducts_ts_1.default)();
            yield Product_model_1.default.insertMany(fetchProducts);
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
const wishlistAddPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const customReq = req;
    const { itemId } = req.params;
    try {
        const product = yield Product_model_1.default.findOne({ _id: itemId });
        if (product) {
            const wishlistSize = yield Wishlist_model_1.default.find({ userId: (_a = customReq.user) === null || _a === void 0 ? void 0 : _a.id }).countDocuments();
            if (wishlistSize === 0) {
                const newWishlist = new Wishlist_model_1.default({
                    userId: (_b = customReq.user) === null || _b === void 0 ? void 0 : _b.id,
                    products: [product._id]
                });
                yield newWishlist.save();
                const suggestedProducts = yield (0, productSuggestion_js_1.default)((_c = customReq.user) === null || _c === void 0 ? void 0 : _c.id, itemId, product.family);
                const response = {
                    status: 200,
                    message: 'Item saved in wishlist',
                    data: {
                        wishlist: product,
                        suggestedProducts
                    }
                };
                res.json(response);
            }
            else {
                yield Wishlist_model_1.default.findOneAndUpdate({ userId: (_d = customReq.user) === null || _d === void 0 ? void 0 : _d.id }, { $push: { products: product._id } }, { new: true });
                const suggestedProducts = yield (0, productSuggestion_js_1.default)((_e = customReq.user) === null || _e === void 0 ? void 0 : _e.id, itemId, product.family);
                const response = {
                    status: 200,
                    message: 'Item saved in wishlist',
                    data: {
                        wishlist: product,
                        suggestedProducts
                    }
                };
                res.json(response);
            }
        }
        else {
            const response = {
                status: 404,
                message: 'Product not found',
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
exports.wishlistAddPostController = wishlistAddPostController;
//# sourceMappingURL=product.controller.js.map