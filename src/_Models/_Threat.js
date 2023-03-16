import RequestHandler from "../Apis/RequestHandler";
const userToken = localStorage.getItem('userToken')

const _Threat = {
    getAll: async (skip, take) => {
        const AllThreads = await RequestHandler.GET('threat?skip=' + skip + '&take=' + take, null)
        return AllThreads
    },

    getOne: async (id) => {
        const thread = await RequestHandler.GET('threat/' + id, null)
        return thread
    },
    post: async (data) => {
        const thread = await RequestHandler.POST('threat', data, userToken)
        return thread
    }


}

export default _Threat
