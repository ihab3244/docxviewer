import Config from "./config";
import axios from "axios";

const RequestHandler = {
    async GET(URL) {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 0);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', authorization: 'Bearer ' + localStorage.getItem('userToken') },
            authorization: 'Bearer ' + localStorage.getItem('userToken'),
            timeout: 5
        };

        const response = await fetch(Config.SERVER + URL, requestOptions);
        return response

    },

    async POST(URL, DATA) {

        let token = localStorage.getItem('userToken')
        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json', authorization: 'Bearer ' + token },
            body: JSON.stringify(DATA),
        };
        try {
            const response = await fetch(Config.SERVER + URL, requestOptions);
            return response
        } catch (error) {
            return { finalResult: false, error: error }
        }
    },

    async POST_FILE(URL, DATA) {
        let token = localStorage.getItem('userToken')
        const requestOptions = {
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + token
            },
            body: DATA,
        };
        try {
            const response = await fetch(Config.SERVER + URL, requestOptions);
            return response
        } catch (error) {
            return { finalResult: false, error: error }
        }
    },

    async PATCH(URL, DATA) {
        let token = localStorage.getItem('userToken')
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', authorization: 'Bearer ' + token },
            body: JSON.stringify(DATA),
        };
        try {
            const response = await fetch(Config.SERVER + URL, requestOptions);
            return response
        } catch (error) {
            return { finalResult: false, error: error }
        }
    },

    async PUT(URL, DATA) {
        let token = localStorage.getItem('userToken')
        const requestOptions = {
            method: 'PUT',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json', authorization: 'Bearer ' + token },
            body: DATA,
        };
        try {
            const response = await fetch(Config.SERVER + URL, requestOptions);
            return response
        } catch (error) {
            return { finalResult: false, error: error }
        }
    },

    async DELETE(URL) {
        let token = localStorage.getItem('userToken')
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', authorization: 'Bearer ' + token },

        };
        try {
            const response = await fetch(Config.SERVER + URL, requestOptions);
            return response
        } catch (error) {
            return { finalResult: false, error: error }
        }
    },

    async sendFile(url, data){
        let token = localStorage.getItem('userToken')
        let config = {
            method: 'put',
            url: Config.SERVER + url,
            headers: {
                'Authorization': 'Bearer '+token
            },
            data : data
        };
        try{
            let response = await axios(config);
            return response
        }
        catch (error){
            return {finalResult: false, error: error}
        }
    }

}




export default RequestHandler
