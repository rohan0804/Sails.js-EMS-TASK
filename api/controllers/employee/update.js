const jwt = require("jsonwebtoken");
module.exports = {
  friendlyName: "Update",

  description: "Update employee.",

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
      const manager = await jwt.verify(this.req.token, "secretkey");
      // console.log(this.req.allParams());
      if (manager) {
        let updatedEmployee = await Employee.update({
          id: this.req.params.employeeId,
        })
          .set({
            name: inputs.name,
            phoneNumber: inputs.phoneNumber,
            email: inputs.email,
            password: inputs.password,
            managerId: manager.id,
          })
          .fetch();
        // console.log(updatedEmployee);
        if (updatedEmployee) {
          return exits.success({
            message: "employee updated successfully",
            employee: updatedEmployee,
          });
        } else {
          return this.res.badRequest({
            err: "Employee is not found",
          });
        }
      } else {
        return this.res.badRequest({
          err:
            "Employee is not found or current manager may not yet registered employee under him",
        });
      }
    } catch (err) {
      return this.res.serverError(err);
    }
  },
};
