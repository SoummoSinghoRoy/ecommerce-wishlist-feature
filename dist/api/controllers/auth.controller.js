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
exports.logoutPostController = exports.logInPostController = exports.signUpPostController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const custom_env_variables_1 = __importDefault(require("../../config/custom_env_variables"));
const signup_validation_1 = __importDefault(require("../../validation/signup.validation"));
const User_model_1 = __importDefault(require("../../model/User.model"));
const login_validation_1 = __importDefault(require("../../validation/login.validation"));
const signUpPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const validation = yield (0, signup_validation_1.default)({ username, email, password });
    if (!validation.isValid) {
        const validationresult = {
            status: 400,
            message: 'Error occurred',
            error: {
                message: validation.error
            }
        };
        res.json(validationresult);
    }
    else {
        try {
            bcrypt_1.default.hash(password, 10, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    console.log(err);
                    const response = {
                        status: 500,
                        message: 'Error occurred, get back soon',
                        error: { message: 'Internal server error' }
                    };
                    res.json(response);
                }
                else {
                    const registeredUser = new User_model_1.default({
                        username,
                        email,
                        password: hash,
                    });
                    const user = yield registeredUser.save();
                    const response = {
                        status: 200,
                        message: 'User successfully created',
                        data: {
                            id: user._id,
                            username: user.username,
                            email: user.email
                        }
                    };
                    res.json(response);
                }
            }));
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
    }
});
exports.signUpPostController = signUpPostController;
const logInPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const validation = yield (0, login_validation_1.default)({ email, password });
    if (!validation.isValid) {
        const validationresult = {
            status: 400,
            message: 'Error occurred',
            error: {
                message: validation.error
            }
        };
        res.json(validationresult);
    }
    else {
        try {
            const validUser = yield User_model_1.default.findOne({ email });
            jsonwebtoken_1.default.sign({
                id: validUser._id,
                username: validUser.username, email: validUser.email
            }, custom_env_variables_1.default.secret_key, { expiresIn: '12h' }, (err, token) => {
                if (err) {
                    console.log(err);
                    const response = {
                        status: 500,
                        message: 'Error occurred, get back soon',
                        error: { message: 'Internal server error' }
                    };
                    res.json(response);
                }
                if (token) {
                    const response = {
                        status: 200,
                        message: 'Successfully loggedin',
                        isAuthenticated: true,
                        token: 'Bearer ' + token,
                        data: {
                            id: validUser._id,
                            username: validUser.username,
                        },
                    };
                    res.json(response);
                }
                else {
                    const response = {
                        status: 401,
                        message: 'Authorization failed',
                        isAuthenticated: false
                    };
                    res.json(response);
                }
            });
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
    }
});
exports.logInPostController = logInPostController;
const logoutPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = {
            status: 200,
            message: 'Successfully loggedout',
            isAuthenticated: false
        };
        res.json(response);
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
exports.logoutPostController = logoutPostController;
//# sourceMappingURL=auth.controller.js.map