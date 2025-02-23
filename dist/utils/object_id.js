"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectId = void 0;
const mongoose_1 = require("mongoose");
const ObjectId = (id) => typeof id === "string" ? mongoose_1.Types.ObjectId.createFromHexString(id) : id;
exports.ObjectId = ObjectId;
