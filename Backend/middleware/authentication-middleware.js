const AuthenticationError = require("../errors/authentication-error");
const { isTokenValid, attachCookiesToResponse } = require("../utils/jwt-setup");
const Token = require("../model/token");

const authenticationMiddleware = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }
    const payload = isTokenValid(refreshToken);
    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });
    if (!existingToken || !existingToken?.isValid) {
      throw new AuthenticationError("Authentication Invalid");
    }
    // attachCookiesToResponse({
    //   res,
    //   user: payload.user,
    //   refreshToken: existingToken.refreshToken,
    // });
    req.user = payload.user;
    next();
  } catch (error) {
    throw new AuthenticationError("Authentication Invalid");
  }
};

module.exports = authenticationMiddleware;
