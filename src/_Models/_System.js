import RequestHandler from "../Apis/RequestHandler";
const userToken = localStorage.getItem('userToken')

const _System = {
    create: async (data)=>{
        return  await RequestHandler.POST('system', data)
    },

    getAll: async (skip, take) => {
        const allSystems = await RequestHandler.GET('system?skip=' + skip + '&take=' + take, null)
        return allSystems
    },

    getOne: async (id) => {
        const thread = await RequestHandler.GET('system/' + id, null)
        return thread
    },
    update: async (id, data)=>{
        return  await RequestHandler.PATCH('system/'+id, data)
    },

    delete: async (id)=>{
        return  await RequestHandler.DELETE('system/'+id)
    },


}

export default _System
