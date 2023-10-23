import axios from "axios";
import { IRegosterBody } from "./types";

axios.defaults.baseURL = 'http://localhost:4000/api'

class Auth {
   async register(body: IRegosterBody) {
      // console.log(body);
      
      const data = await axios.post('/auth/register', body)
      console.log(data)
      
   }
}

export const AuthService = new Auth()