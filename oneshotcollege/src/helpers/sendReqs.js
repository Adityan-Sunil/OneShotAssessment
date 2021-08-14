import axios from 'axios';

export async function sendReq(url, data){
    let resp = await axios.post(url, data);
    return resp;
}