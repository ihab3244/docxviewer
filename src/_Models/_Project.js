import RequestHandler from "../Apis/RequestHandler";
import { PushNotification } from "../context/theme/themeContext";
const userToken = localStorage.getItem('userToken')

const _Project = {
  create: async (data) => {
    const createResult = await RequestHandler.POST('project', data)
    return createResult
  },



  addImage: async (projectId, data) => {
    const createResult = await RequestHandler.sendFile('project/'+projectId+'/addImage', data)
    return createResult
  },

  getAll: async (skip, take) => {
    const loginResult = await RequestHandler.GET('project?skip=' + skip + '&take=' + take, null)
    return loginResult
  },

  getOne: async (id) => {
    console.log('fetching single project')
    const getOneProject = await RequestHandler.GET('project/' + id, null)
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

  addZone: async (data) => {
    const createResult = await RequestHandler.POST('project/zone', data)
    return createResult
  },

  deleteZone: async (id) => {
    const createResult = await RequestHandler.DELETE('project/zone/'+id)
    return createResult
  },

}

export default _Project
