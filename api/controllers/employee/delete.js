const jwt = require("jsonwebtoken");
module.exports = {
  friendlyName: "Delete",

  description: "Delete employee.",

  inputs: {},

  exits: {},

  fn: async function (inputs, exits) {
    try {
      const manager = await jwt.verify(this.req.token, "secretkey");
      if (manager) {
        var employeeRecord = await Employee.destroy({
          id: this.req.params.employeeId,
        }).fetch();
        if (employeeRecord) {
          return exits.success({
            message: "employee deleted successfully",
            employee: employeeRecord,
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
