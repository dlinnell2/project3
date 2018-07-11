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

    saveState: () => {
        console.log('save state')
        return axios.get('/api/admin/saveRecognizer');
    },

    getAll: () => {
        return axios.get('/api/admin/all');
    },

    getTimes: (name) => {
        return axios.post(`/api/admin/pull`, name)
    },

    recognizeEmployee: (data) => {
        return axios.post('/api/employee/identify', data);
    },

    clockIn: (data) => {
       return axios.post('/api/employee', data) 
    }

}