import { Request } from "express";
import Url from "../models/Url";
import Kyc from "../models/Kyc";
import { ObjectId } from "../utils/object_id";
import { KycSortBy } from "../types/kyc";
import User from "../models/User";

export const postKyc = async ({ body, headers }: Request) => {
  const { name, dialCode, mobile, url, urlType } = body;
  const userId = headers.userId as string;
  const createdUrl = await Url.create({
    url,
    type: urlType,
    createdBy: ObjectId(userId),
  });
  const createdKyc = await Kyc.create({
    userId: ObjectId(userId),
    name,
    dialCode,
    mobile,
    urlId: createdUrl._id,
    createdBy: ObjectId(userId),
  });
  return {
    createdKycId: createdKyc._id,
  };
};

export const putKycStatus = async ({ body }: Request) => {
  const { kycId, status } = body;
  const updatedKyc = await Kyc.updateOne(
    {
      _id: ObjectId(kycId),
      isActive: true,
    },
    {
      $set: {
        status,
      },
    }
  );
  return {
    isUpdated: !!updatedKyc.modifiedCount,
  };
};

export const getKycList = async ({ query }: Request) => {
  const {
    status = "",
    name = "",
    sortBy = KycSortBy.CREATED_DESC,
    page = "0",
    pageSize = "12",
  } = query;
  const sort = sortBy === KycSortBy.CREATED_ASC ? 1 : -1;
  const kycList = await Kyc.aggregate([
    {
      $match: {
        ...(status ? { status } : null),
        name: { $regex: name },
        isActive: true,
      },
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
        from: User.collection.name,
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
        from: Url.collection.name,
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
};

export const getKycUser = async ({ headers }: Request) => {
  const userId = headers.userId as string;
  const kyc = await Kyc.findOne({
    userId: ObjectId(userId),
    isActive: true,
  });
  return kyc;
};
