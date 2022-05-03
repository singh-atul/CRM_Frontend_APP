import axios from 'axios';
const BASE_URL=process.env.REACT_APP_SERVER_URL


export async function userSignin(data) {
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signin`, data);
}

export async function userSignup(data) {
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signup`, data);
}

export async function userAuthSignin(data) {
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/oauthsignin`, data);
}

export async function getAllUser(userId) {
    return await axios.get(`${BASE_URL}/crm/api/v1/users/${userId}`, {
        headers: {
            'x-access-token': localStorage.getItem("token")
        }
    })
}

export async function updateUserData(userId,data) {
    return await axios.put(`${BASE_URL}/crm/api/v1/users/${userId}`,data, {
        headers: {
            'x-access-token': localStorage.getItem("token")
        }
    },{
        "userId":localStorage.getItem("userId")
    })
    
}