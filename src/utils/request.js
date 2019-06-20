import axios from 'axios';
// get请求
export function get(url, config) {
    return axios.get(url, config);
}