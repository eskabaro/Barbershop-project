import axios from "axios";
import { ILoginBody, IRegosterBody } from "./types";

axios.defaults.baseURL = 'http://localhost:4000/api'

class Auth {
   async register(body: IRegosterBody) {
      await axios.post('/auth/register', body)
   }

   async login(body: ILoginBody) {
      await axios.post('/auth/login', body)
   }
}

export const AuthService = new Auth()