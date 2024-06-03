"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const product_controller_1 = require("../controllers/product.controller");
router.get('/all', product_controller_1.productsFetchController);
exports.default = router;
//# sourceMappingURL=product.route.js.map