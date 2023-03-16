import RequestHandler from "../Apis/RequestHandler";
import Config from "../Apis/config";

const _User = {
   login: async (data) => {
      const loginResult = await RequestHandler.POST('auth/login', data, '')
      return loginResult
   },

   getOne: async (data) => {
      const loginResult = await RequestHandler.GET('user')
      return loginResult
   }
}
export default _User
