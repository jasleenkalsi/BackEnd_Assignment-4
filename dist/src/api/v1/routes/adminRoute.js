"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middleware/authentication"); // ✅ Import authenticateUser
const authorization_1 = require("../middleware/authorization"); // ✅ Import verifyAdmin
const adminController_1 = require("../controllers/adminController");
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// ✅ Secure user details route (only authenticated users can access)
router.get("/user/:uid", authentication_1.authenticateUser, userController_1.getUserDetails);
// ✅ Secure role assignment (authentication + admin verification required)
router.post("/admin/set-role", authentication_1.authenticateUser, authorization_1.verifyAdmin, adminController_1.setUserRole);
exports.default = router;
