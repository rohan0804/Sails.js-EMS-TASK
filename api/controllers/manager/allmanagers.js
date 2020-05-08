module.exports = {
  friendlyName: "Allmanagers",

  description: "Allmanagers manager.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    // var allUsers = await User.find({});
    // return allUsers;
    return this.res.ok("hello");
  },
};
