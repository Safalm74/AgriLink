import { IUserToken } from "../interfaces/auth";
import BaseModel from "./base";

export class AuthModel extends BaseModel {
  /**
   * creates new access and refresh token
   * @param userTokens
   * @returns
   */
  static async create(userTokens: IUserToken) {
    const { refreshToken: _rt, ...UserAccessToken } = userTokens;
    const { accessToken: _at, ...userRefreshToken } = userTokens;

    const accessTokenId = await this.queryBuilder()
      .insert(UserAccessToken)
      .table("accessTokens")
      .returning("id");
    const refreshTokenId = await this.queryBuilder()
      .insert(userRefreshToken)
      .table("refreshTokens")
      .returning("id");

    return {
      accessTokenId: accessTokenId[0].id,
      refreshTokenId: refreshTokenId[0].id,
    };
  }
}
