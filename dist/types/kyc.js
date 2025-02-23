"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycSortBy = exports.KycStatus = void 0;
var KycStatus;
(function (KycStatus) {
    KycStatus["PENDING"] = "PENDING";
    KycStatus["APPROVED"] = "APPROVED";
    KycStatus["REJECTED"] = "REJECTED";
})(KycStatus || (exports.KycStatus = KycStatus = {}));
var KycSortBy;
(function (KycSortBy) {
    KycSortBy["CREATED_ASC"] = "CREATED_ASC";
    KycSortBy["CREATED_DESC"] = "CREATED_DESC";
})(KycSortBy || (exports.KycSortBy = KycSortBy = {}));
