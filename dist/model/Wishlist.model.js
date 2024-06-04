"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const wishlistSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Product'
        }]
}, {
    timestamps: true
});
const Wishlist = (0, mongoose_1.model)('Wishlist', wishlistSchema);
exports.default = Wishlist;
//# sourceMappingURL=Wishlist.model.js.map