import * as yup from "yup";
import { KycStatus } from "../../types/kyc";
import { UrlType } from "../../types/url";

export const kycValidator = {
  GET: {
    "/list": {
      query: yup.object({
        status: yup.string().oneOf(Object.keys(KycStatus)),
        name: yup.string(),
        sortBy: yup.string(),
        page: yup.number().min(0),
        pageSize: yup.number().max(100),
      }),
    },
  },
  POST: {
    "/": {
      body: yup.object({
        name: yup.string().required(),
        dialCode: yup.string().required(),
        mobile: yup.string().required(),
        url: yup.string().required(),
        urlType: yup.string().required().oneOf(Object.keys(UrlType)),
      }),
    },
  },
  PUT: {
    "/status": {
      body: yup.object({
        kycId: yup.string().required(),
        status: yup.string().required().oneOf(Object.keys(KycStatus)),
      }),
    },
  },
};
