"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middleware/authentication");
const authorization_1 = require("../middleware/authorization");
const adminController_1 = require("../controllers/adminController");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
/**
 * @route GET /api/v1/admin/user/:uid
 * @desc Retrieve user details
 * @access Authenticated Users Only
 */
router.get("/user/:uid", authentication_1.authenticateUser, userController_1.getUserDetails);
/**
 * @route POST /api/v1/admin/set-role
 * @desc Assign roles to users
 * @access Admins Only
 */
router.post("/set-role", authentication_1.authenticateUser, (0, authorization_1.verifyAdmin)(["admin"]), adminController_1.setUserRole);
exports.default = router;
