const cookieToken = (user, res) => {
  //generating the jwt token based on user details
  const token = user.getJwtTokens();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(200).cookie("token", token, options).json({
    //json because we want to send it to frontend for success message
    success: true,
    token,
    user,
  });
};

module.exports = cookieToken;
