/**
 * is-logged-in
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */

const jwt = require("jsonwebtoken");
module.exports = async function (req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearertoken = bearer[0];
    req.token = bearertoken;
    console.log(req.token);
    next();
  } else {
    res.status(403).json({
      err: "you are not authorised user plz get the token first",
    });
  }
  //   next();
  //--•
  // Otherwise, this request did not come from a logged-in user.
  // return res.unauthorized();
};
