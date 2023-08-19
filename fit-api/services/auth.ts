import { Jwt, GetPublicKeyOrSecret, Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";

const auth = {
 createEncryptedPass: async (oldPassword: string) => {
    const salt =  await bcrypt.genSalt(10);
    return await bcrypt.hash(oldPassword, salt)
}

}
export default auth
