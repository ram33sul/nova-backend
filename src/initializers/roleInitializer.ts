import Role from "../models/Role";
import { RoleName } from "../types/role";

const defaultRoles = Object.keys(RoleName);

export const initializeRoles = async () => {
  try {
    const existingRoles = await Role.find({ name: { $in: defaultRoles } });
    const existingRoleNames = existingRoles.map((role) => role.name);

    const missingRoles = defaultRoles.filter(
      (role) => !existingRoleNames.includes(role as RoleName)
    );

    if (missingRoles.length > 0) {
      await Role.insertMany(missingRoles.map((name) => ({ name })));
      console.log("Roles populated successfully:", missingRoles);
    } else {
      console.log("All default roles already exist. No action taken.");
    }
  } catch (error) {
    console.error("Error populating roles:", error);
  }
};
