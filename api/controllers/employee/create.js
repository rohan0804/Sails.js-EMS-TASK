const jwt = require("jsonwebtoken");
module.exports = {
  friendlyName: "Create",

  description: "Create employee.",

  inputs: {
    name: {
      type: "string",
      required: true,
    },
    phoneNumber: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      isEmail: true,
    },
    password: {
      type: "string",
      required: true,
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    try {
      // console.log(this.req.token);
      const manager = await jwt.verify(this.req.token, "secretkey");
      // console.log(manager);
      if (manager) {
        const employee = await Employee.findOrCreate(
          { phoneNumber: inputs.phoneNumber },
          {
            name: inputs.name,
            phoneNumber: inputs.phoneNumber,
            email: inputs.email,
            password: inputs.password,
            managerId: manager.id,
          }
        ).exec(async (err, user, wasCreated) => {
          if (err) {
            return this.res.serverError(err);
          }
          if (wasCreated) {
            sails.log("Created a new user: " + user.name);
            return exits.success({
              message: "employee created successfully",
              manager: manager,
              employee: user,
            });
          } else {
            sails.log("Found existing user: " + user.name);
            return this.res.badRequest({
              err:
                "Phone number is already registered plz try another mobile number",
            });
          }
        });
      } else {
        return this.res.badRequest({
          err: "Manager is not logged in so not access to this route",
        });
      }
    } catch (err) {
      return this.res.serverError(err);
    }
  },
};
