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
exports.getKycUser = exports.getKycList = exports.putKycStatus = exports.postKyc = void 0;
const Url_1 = __importDefault(require("../models/Url"));
const Kyc_1 = __importDefault(require("../models/Kyc"));
const object_id_1 = require("../utils/object_id");
const kyc_1 = require("../types/kyc");
const User_1 = __importDefault(require("../models/User"));
const postKyc = (_a) => __awaiter(void 0, [_a], void 0, function* ({ body, headers }) {
    const { name, dialCode, mobile, url, urlType } = body;
    const userId = headers.userId;
    const createdUrl = yield Url_1.default.create({
        url,
        type: urlType,
        createdBy: (0, object_id_1.ObjectId)(userId),
    });
    const createdKyc = yield Kyc_1.default.create({
        userId: (0, object_id_1.ObjectId)(userId),
        name,
        dialCode,
        mobile,
        urlId: createdUrl._id,
        createdBy: (0, object_id_1.ObjectId)(userId),
    });
    return {
        createdKycId: createdKyc._id,
    };
});
exports.postKyc = postKyc;
const putKycStatus = (_a) => __awaiter(void 0, [_a], void 0, function* ({ body }) {
    const { kycId, status } = body;
    const updatedKyc = yield Kyc_1.default.updateOne({
        _id: (0, object_id_1.ObjectId)(kycId),
        isActive: true,
    }, {
        $set: {
            status,
        },
    });
    return {
        isUpdated: !!updatedKyc.modifiedCount,
    };
});
exports.putKycStatus = putKycStatus;
const getKycList = (_a) => __awaiter(void 0, [_a], void 0, function* ({ query }) {
    const { status = "", name = "", sortBy = kyc_1.KycSortBy.CREATED_DESC, page = "0", pageSize = "12", } = query;
    const sort = sortBy === kyc_1.KycSortBy.CREATED_ASC ? 1 : -1;
    const kycList = yield Kyc_1.default.aggregate([
        {
            $match: Object.assign(Object.assign({}, (status ? { status } : null)), { name: { $regex: name }, isActive: true }),
        },
        {
            $sort: {
                createdAt: sort,
            },
        },
        {
            $skip: +page * +pageSize,
        },
        {
            $limit: +pageSize,
        },
        {
            $lookup: {
                from: User_1.default.collection.name,
                localField: "userId",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $match: {
                            isActive: true,
                        },
                    },
                    {
                        $project: {
                            email: 1,
                        },
                    },
                    {
                        $limit: 1,
                    },
                ],
            },
        },
        {
            $lookup: {
                from: Url_1.default.collection.name,
                localField: "urlId",
                foreignField: "_id",
                as: "url",
                pipeline: [
                    {
                        $match: {
                            isActive: true,
                        },
                    },
                    {
                        $project: {
                            url: 1,
                            type: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                email: {
                    $first: "$user.email",
                },
                url: {
                    $first: "$url.url",
                },
                urlType: {
                    $first: "$url.type",
                },
            },
        },
        {
            $unset: ["user"],
        },
    ]);
    return {
        kycList,
    };
});
exports.getKycList = getKycList;
const getKycUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ headers }) {
    const userId = headers.userId;
    const kyc = yield Kyc_1.default.findOne({
        userId: (0, object_id_1.ObjectId)(userId),
        isActive: true,
    });
    return kyc;
});
exports.getKycUser = getKycUser;
