const jwt = require("jsonwebtoken");
module.exports = {
  friendlyName: "Login",

  description: "Login manager.",

  inputs: {
    email: {
      required: true,
      type: "string",
      isEmail: true,
    },
    password: {
      required: true,
      type: "string",
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    const managerRecord = await Manager.find({
      where: { email: inputs.email, password: inputs.password },
    });
    console.log(managerRecord);
    if (managerRecord.length == 0) {
      return this.res.badRequest({
        err: "you are not registered! please signup ",
      });
    }
    console.log(managerRecord[0].id);
    const payloadData = {
      id: managerRecord[0].id,
    };
    const Token = await jwt.sign(payloadData, "secretkey", {
      expiresIn: 10 * 60 * 10,
    });
    return exits.success({
      message: "manager login successfully",
      data: managerRecord,
      token: Token,
    });
  },
};
