import UserModel from "../user/user.schema";
import bcrypt from "bcrypt";
import { generateTokens } from "../common/helper/jwt.helper";
import { IUser, Payload } from "./user.dto";
import * as UserService from "../user/user.service";
import * as jwtHelper from "../common/helper/jwt.helper";
import createHttpError from "http-errors";

export const authResolvers = {
  Mutation: {
    signup: async (_: any, { name, email, password }: any) => {
      const existingUser = await UserService.getUserByEmail(email);
      if (existingUser) {
        throw createHttpError(409, "User already Exits");
      }

      const profilePic = `https://ui-avatars.com/api/${name}?background=random`;
      const user = await UserService.createUser({
        name,
        email,
        password,
        profilePic
      } as IUser);

      const payload: Payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      const { refreshToken, accessToken } = jwtHelper.generateTokens(payload);

      await UserService.updateRefreshToken(user._id, refreshToken);

      const response = {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        refreshToken,
        accessToken,
      };
      return response;
    },

    login: async (_: any, { email, password }: any) => {
      // Find user by email
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw createHttpError(404, "User not found");
      }

      // Check if password is valid
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw createHttpError(401, "Invalid password");
      }

      // Create JWT payload
      const payload = {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
      };

      // Generate access token and refresh token
      const { accessToken, refreshToken } = jwtHelper.generateTokens(payload);

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        accessToken,
        refreshToken
      };
    },


  },
};
