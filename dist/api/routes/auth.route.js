"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_controller_1 = require("../controllers/auth.controller");
const isAuthenticated_middleware_1 = require("../../middlewares/isAuthenticated.middleware");
router.post('/signup', isAuthenticated_middleware_1.isNotAuthenticated, auth_controller_1.signUpPostController);
router.post('/login', isAuthenticated_middleware_1.isNotAuthenticated, auth_controller_1.logInPostController);
router.post('/logout', isAuthenticated_middleware_1.isAuthenticated, auth_controller_1.logoutPostController);
exports.default = router;
//# sourceMappingURL=auth.route.js.map