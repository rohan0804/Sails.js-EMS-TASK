module.exports = {
  friendlyName: "Signup",

  description: "Signup manager.",

  inputs: {
    name: {
      required: true,
      type: "string",
    },
    email: {
      required: true,
      type: "string",
      isEmail: true,
    },
    phoneNumber: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    try {
      sails.log("hello");
      console.log(this.req.allParams());
      let manager = await Manager.create({
        name: inputs.name,
        email: inputs.email,
        phoneNumber: inputs.phoneNumber,
        password: inputs.password,
      })
        .intercept("E_UNIQUE", () => {
          return this.res.badRequest({ err: "email is already in use" });
        })
        .fetch();
      if (!manager) {
        return this.res.badRequest({ err: "Manager is not created" });
      }
      return exits.success({
        message: "manager created successfully",
        data: manager,
      });
    } catch (err) {
      return this.res.serverError(err.message);
    }
  },
};
