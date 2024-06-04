"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const product_controller_1 = require("../controllers/product.controller");
const isAuthenticated_middleware_1 = require("../../middlewares/isAuthenticated.middleware");
router.get('/all', product_controller_1.productsFetchController);
router.post('/wishlist/add/:itemId', isAuthenticated_middleware_1.isAuthenticated, product_controller_1.wishlistAddPostController);
exports.default = router;
//# sourceMappingURL=product.route.js.map