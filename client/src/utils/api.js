import axios from 'axios';

export default {

    recognizeNewEmployee: (data) => {
        console.log('api');
        return axios.post("/api/admin/add/recognize", data);
    },

    addEmployeeToDb: (data) => {
        console.log('add');
        return axios.post('/api/admin/add', data);
    },

    pullTimes: () => {
        return axios.get('/api/admin/all');
    },

    recognizeEmployee: (data) => {
        return axios.post('/api/employee/identify', data);
    }

}