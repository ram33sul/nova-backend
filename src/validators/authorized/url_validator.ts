import * as yup from "yup";

export const urlValidator = {
  GET: {
    "/signed-url": {
      query: yup.object({
        fileName: yup.string().required(),
      }),
    },
  },
};
