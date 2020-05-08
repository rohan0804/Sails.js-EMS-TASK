/**
 * Manager.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: "string",
      required: true,
      allowNull: false,
    },
    email: {
      type: "string",
      isEmail: true,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: "string",
      required: true,
      unique: true,
      maxLength: 12,
      minLength: 10,
    },
    password: {
      type: "string",
      required: true,
      allowNull: false,
    },
    employees: {
      collection: "employee",
      via: "managerId",
    },
  },
};
