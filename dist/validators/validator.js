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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const validator = (params) => (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (params.body) {
            req.body = yield params.body.validate(req.body, { abortEarly: true });
        }
        if (params.query) {
            req.query = yield params.query.validate(req.query, {
                abortEarly: true,
            });
        }
    }
    catch (error) {
        res.status(400).send({
            message: "Invalid Inputs",
        });
    }
});
exports.validator = validator;
