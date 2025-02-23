import * as yup from "yup";

export const userValidator = {
  POST: {
    "/register": {
      body: yup.object({
        email: yup.string().email().required(),
        password: yup.string().required().min(6),
        adminKey: yup.string(),
      }),
    },
    "/login": {
      body: yup.object({
        email: yup.string().required().email(),
        password: yup.string().required().min(6),
      }),
    },
  },
};
