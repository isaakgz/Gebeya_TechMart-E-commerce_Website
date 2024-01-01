import bcrypt from "bcryptjs";

const users = [
  {
    name: "admin",
    email: "admin@email.com",
    password: bcrypt.hashSync("12345678", 10),
    isAdmin: true,
  },
  {
    name: "isaak",
    email: "isaak@email.com",
    password: bcrypt.hashSync("12345678", 10),
    isAdmin: false,
  },
  {
    name: "mark",
    email: "mark@email.com",
    password: bcrypt.hashSync("12345678", 10),
    isAdmin: false,
  },
  {
    name: "meron",
    email: "meron@email.com",
    password: bcrypt.hashSync("12345678", 10),
    isAdmin: false,
  },
];

export default users;
