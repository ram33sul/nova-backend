import User from "../models/User";

export const getUserByEmail = async (
  email: string,
  { removePassword = true } = {}
) => {
  const user = await User.findOne({ email });
  if (user && removePassword) {
    user.password = "";
  }
  return user;
};
