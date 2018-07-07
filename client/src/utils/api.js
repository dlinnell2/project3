import axios from 'axios';

export default {

    recognizeEmployee: (data) => {
        console.log('api');
        return axios.post("/api/admin/add/recognize", data);
    },

    addEmployeeToDb: (data) => {
        console.log('add to db');
        return axios.post('/api/admin/add', data);
    },

    pullTimes: () => {
        return axios.get('api/admin/all');
    }

}