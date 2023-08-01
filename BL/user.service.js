const userController = require("../DL/controller/user.controller");
const auth = require("../auth");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);


const validateUserData = (data) => {
  if (data.fullName && typeof data?.fullName !== "string")
    throw { msg: "Invalid name", code: 401 };
  if (
    data.email &&
    !/^[\w.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data?.email)
  )
    throw { msg: "Invalid email", code: 401 };
  if (data.phoneNumber && typeof data?.phoneNumber !== "number")
    throw { msg: "Invalid phone number", code: 401 };
  if (data.password && typeof data?.password !== "string")
    throw { msg: "Invalid password", code: 401 };
  if (data.address && typeof data?.address !== "string")
    throw { msg: "Invalid address", code: 401 };
  return true;
};


const login = async (data) => {
  try {
    validateUserData(data);
    const user = await userController.readOne(
      { email: data.email },
      "+password"
    );
    if (!user) throw { code: 401, msg: "user not found" };
    if (!bcrypt.compareSync(data.password, user.password))
      throw { code: 401, msg: "something incorrect" };
    await userController.update(user.email, { lastConnectedDate: new Date() }); // update last login
    const token = await auth.createToken({ email: user.email, id: user._id }); // create new token
    const a = { token, id: user._id, email: user.email };
    console.log(a);
    return { token, id: user._id, email: user.email }; // return token
  } catch (error) {
    throw { code: 401, msg: "wrong username or password" };
  }
};



const register = async (data) => {
  try {
    validateUserData(data);
    const emailExists = await userController.read({ email: data.email });
    console.log(emailExists); // const emailExists = await userC
    if (emailExists.length > 0) {
      throw { code: 401, msg: "The user already exists" };
    }
    data.password = bcrypt.hashSync(data.password, SALT_ROUNDS);
    await userController.create(data);
    return "The user has been registered successfully";
  } catch (error) {
    console.log("Error:", error);
    throw { code: 401, msg: "Internal server error" };
  }
};


async function getUser(filter) {
  return await userController.readOne(filter);
}


module.exports = { register, login, getUser};
