import RequestHandler from "../Apis/RequestHandler";
const userToken = localStorage.getItem('userToken')

const _ThreatEntry = {
    getAll: async (skip, take) => {
        const AllThreads = await RequestHandler.GET('ThreatEntry?skip=' + skip + '&take=' + take, null)
        return AllThreads
    },

    getOne: async (systemId, threatId) => {
        return  await RequestHandler.GET('ThreatEntry/' + systemId + '/' + threatId, null)

    },
    create: async (data) => {
        const thread = await RequestHandler.POST('ThreatEntry', data, userToken)
        return thread
    },

    update: async (systemId, threatId, data) => {
        const thread = await RequestHandler.PATCH('ThreatEntry/'+systemId+'/'+threatId, data, userToken)
        return thread
    }


}

export default _ThreatEntry
