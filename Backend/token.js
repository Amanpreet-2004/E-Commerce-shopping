// import jwt from "jsonwebtoken";
// export const tokenGenrate= async(id)=>{
//     try {
        

//         const secretKey="1234567890"
//         const token = await jwt.sign({_id:id},secretKey)
//         const decode = await jwt.verify(token,secretKey)
//         return{token,decode}
//         console.log(tokenGenrate,token)

//     } catch (error) {
//         console.log(error)
        
//     }
// }

import jwt from "jsonwebtoken";
import { promisify } from "util";

const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export const tokenGenerate = async (id) => {
  try {
    const secretKey = "1234567890";

    const token = await signAsync({ _id: id }, secretKey, { expiresIn: "1h" });
    const decode = await verifyAsync(token, secretKey);

    console.log("Generated Token:", token);
    console.log("Decoded Token:", decode);

    return { token, decode };
  } catch (error) {
    console.error("JWT Error:", error);
    return null;
  }
};