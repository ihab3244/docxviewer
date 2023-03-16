import RequestHandler from "../Apis/RequestHandler";
import { PushNotification } from "../context/theme/themeContext";

export const _SystemData =  {
  create: async (data)=>{
    const createResult = await RequestHandler.POST('SystemData', data)

    return createResult
  },

  getAll: async ()=>{
    return  await RequestHandler.GET('SystemData', null)
  },

  getOne: async (id)=>{
    const getOneProject = await RequestHandler.GET('project/'+id, null)
    return getOneProject
  }


}

