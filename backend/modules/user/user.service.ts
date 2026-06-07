import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

// create User
export const createUser = async (user: IUser): Promise<IUser> => {
  const newUser = new UserModel(user);
  return await newUser.save();
};

// get all users
export const getAllUsers = async (): Promise<IUser[]> => {
  return await UserModel.find();
};

// get single user
export const getUserById = async (id: string): Promise<IUser | null> => {
  return await UserModel.findById(id);
};

// activate user

export const activateUser = async (
  id: string,
  updateDate: Partial<IUser>,
): Promise<IUser | null> => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, updateDate, {
    new: true,
  });
  if (!updatedUser) {
    throw new Error("User not found");
  }
  return updatedUser;
};
