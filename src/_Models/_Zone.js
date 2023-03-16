import RequestHandler from "../Apis/RequestHandler";
import { PushNotification } from "../context/theme/themeContext";
const userToken = localStorage.getItem('userToken')
const actor= 'zone/'
const _Zone = {
  create: async (data) => {
    const createResult = await RequestHandler.POST('project', data)
    return createResult
  },


  getAll: async (skip, take) => {
    const loginResult = await RequestHandler.GET('project?skip=' + skip + '&take=' + take, null)
    return loginResult
  },

  getOne: async (id) => {
    console.log('fetching single project')
    const getOneProject = await RequestHandler.GET('zone/' + id, null)
    return getOneProject
  },

  update: async (id, data) => {
    const updateProject = await RequestHandler.PATCH('project/' + id, data, userToken)
    return updateProject
  },

  delete: async (id) => {
    const createResult = await RequestHandler.DELETE('project/'+id)
    return createResult
  },

  createTreatment: async (id, data) => {
    console.log(data)
    const createResult = await RequestHandler.POST(actor+id, data)
    return createResult
  },

  getTreatment: async (zoneId, srId) => {
    const createResult = await RequestHandler.GET(actor+zoneId + '/'+srId)
    return createResult
  },

}

export default _Zone
