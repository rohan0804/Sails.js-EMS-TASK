const jwt = require("jsonwebtoken");
module.exports = {
  friendlyName: "Getallemployees",

  description: "Getallemployees employee.",

  inputs: {},

  exits: {},

  fn: async function (inputs, exits) {
    try {
      // console.log(this.req.token);
      const manager = await jwt.verify(this.req.token, "secretkey");
      // console.log(manager);
      if (manager) {
        const employees = await Employee.find({
          select: ["name", "phoneNumber", "email"],
          where: { managerId: manager.id },
        });
        if (employees) {
          return exits.success({
            message: "employees fetch successfully",
            employees: employees,
          });
        } else {
          return this.res.badRequest({
            err:
              "Employees are not found or current manager may not yet registered employees under him",
          });
        }
      } else {
        return this.res.badRequest({
          err: "Manager is not logged in so not access to this route",
        });
      }
      // console.log(employees);
    } catch (err) {
      return this.res.serverError(err);
    }
  },
};
