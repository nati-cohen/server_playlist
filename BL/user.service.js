const userController = require("../DL/controller/user.controller");
const auth = require('../auth')
const bcrypt = require('bcrypt')
const SALT_ROUNDS= Number(process.env.SALT_ROUNDS)


// function valid(newData) {
//   if ("name" in newData && typeof(newData.name) !== "string") return "valid name";
//   if ("password" in newData && typeof(newData.password) !== "string")
//     return "valid password";
//   if (
//     "email" in newData &&
//     !/^[\w.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newData.email)
//   )
//     return "valid email";
//   return true;
// }

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


// async function login(data) {
//   try {
//     if (!data.email) {
//       throw { code: 400, msg: "email not found" };
//     }

//     const user = await userController.readOne({ email: data.email }, "+password");
//     console.log(user, data.email, );
//     if (!user) {
//       throw { code: 400, msg: "user not found" };
//     }
//     console.log(data.password);
//     console.log(user.password);

//     if (!bcrypt.compareSync(data.password, user.password)) {
//       throw { code: 400, msg: "something incorrect" };
//     }

//     await userController.updateByemail(user.email, { lastLogin: new Date() }); // update last login

//     const token = await auth.createToken({ email: user.email }); // create new token
//     return token; // return token
//   } catch (error) {
//     // Handle the error appropriately, e.g., log the error or throw a custom error
//     console.error(error);
//     throw { code: 500, msg: "Internal server error" };
//   }
// }

const login = async (data) => {
  try {
    validateUserData(data);
    const user = await userController.readOne({ email: data.email }, "+password");
    if (!user) throw { code: 401, msg: "user not found" };
    if (!bcrypt.compareSync(data.password, user.password)) throw { code: 401, msg: "something incorrect" };
    await userController.update(user.email, { lastConnectedDate: new Date() }); // update last login
    const token = await auth.createToken({ email: user.email, id: user._id }); // create new token
    const a = { token, id: user._id, email: user.email }
    console.log(a);
    return { token, id: user._id, email: user.email }; // return token
  } catch (error) {
    throw { code: 401, msg: "Internal server error" };
  }
};


// async function register(object) {
//   const user = await userController.readOne({ email:object.email });
//   if (user) return  "valid email";
//   const validResult = valid(object);

//   if (validResult) return await userController.create(object);
//   return validResult
// }

const register = async (data) => {
  try {
    validateUserData(data);
    const emailExists = await userController.read({email:data.email} )
    console.log(emailExists);// const emailExists = await userC
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

// const register = async (data) => {
//   try {
//     validateUserData(data);
//     console.log("kk");
//     const emailExists = await userController.read({ email: data.email });
//     console.log("Email Exists:", emailExists);
//     if (emailExists.length > 0) {
//       throw { code: 401, msg: "The user already exists" };
//     }
  
//     data.password = bcrypt.hashSync(data.password, SALT_ROUNDS);
//     await userController.create(data);
//     return "The user has been registered successfully";

//   } catch (error) {
//     console.log("Error:", error);
//     throw { code: 401, msg: "Internal server error" };
//   }
// };


async function getUser(filter) {
return await userController.readOne(filter);

}


 module.exports ={ register,  login, getUser }













// async function login(data) {
//   if(!data.email && !data.password)throw 'missing data'
//   const user = await userController.readOne({ email: data.email },"+password")
//   if (!user || user.password !== data.password) throw { code: 401, msg: "User or Password is incorrect" }
//   if(!bcrypt.compareSync(data.password/*from user*/,user.password/*from db*/)) throw "password mismatch"
//   const token = await auth.createToken({ email: user.email })
//   await userController.updateByemail(user._id, { lastConnected: Date.now() })
//   console.log(token);
//   return token;
// }
// async function login (data){
//   if (!data.email) throw { code: 400, msg: "email not found" };
//   console.log(data);
//   const user = await userController.readOne({email: data.email} ,"+password");
//   console.log(data.password);
// console.log(user.password);
// if (!bcrypt.compareSync(data.password, user.password,)) {
  
//     throw { code: 400, msg: "something incorrect" };
//   }
//   // userController.updateByemail({ lastLogin: new Date() }); // update last login
//   userController.updateByemail(user.email, { lastLogin: new Date() });
//   const token = await auth.createToken({ email: user.email }) // create new token
//   return token; // return token
// };




//פונקצית חיבור של דוד
// async function register (data) {
//   const { fullName, email, password } = data;
//   validateUserData([{ fullName }, { email }, { password }]);
//   const emailCheck = await userController.read({ email: email });
//   if (emailCheck) {
//     throw { code: 400, msg: "The user already exists" };
//   }
//   data.password = bcrypt.hashSync(data.password, SALT_ROUNDS);
//   await userController.create(data);
//   return "The user has been registered successfully";
// };

// async function login(object) {
//   const validResult = valid(object);
//   if (validResult) {
//     const userData = await userController.readOne({email:object.email});
//     if (
//         userData&&
//       userData.email === object.email &&
//       userData.password === object.password
//     ) {
//       return "Access has been granted";
//     }
//     return "access denied";
//   }
//   return validResult
// }


// async function register (data){
//     if(!data.email && !data.password && !data.fullName)throw 'missing data'
//     data.password=bcrypt.hashSync(data.password,SALT_ROUNDS)
//     const user = await userController.create(data)
//     return user
// }








//  async function getAllUsers(filter) {
//   return await userController.read(filter);
//   }
  
  
//   async function updatename(email, name){
//       const validResult = valid({email, name})
//   if (validResult) return await userController.updateByemail(email, {name})
//   return "Changed successfully"
//   }
  
//   async function updatepassword(email, password){
//       const validResult = valid({email, password})
//   if (validResult) {
//        await userController.updateByemail(email, {password})
//        return "Changed successfully"
//       }
//       return  validResult
//   }
  
//   // async function deleteuser(email){
//   //     const validResult = valid({email})
//   //     if (validResult){
//   //         await userController.del({email})
//   //         return 'The user has been deleted'
//   //     } 
//   //     return  validResult
//   // }
  
//   async function deleteuser(email){
//     const validResult = valid({ email });
//     return validResult === true
//       ? (await userController.del(email), "User deleted successfully")
//       : validResult;
//   };