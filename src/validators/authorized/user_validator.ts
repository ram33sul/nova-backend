import yup from "yup";
import { RoleName } from "../../types/role";

export const userValidator = {
  GET: {
    "/me": {
      query: yup.object({
        role: yup.string().optional().oneOf(Object.keys(RoleName)),
      }),
    },
  },
};
