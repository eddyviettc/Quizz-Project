import { delay } from "lodash";
import axios from "../utils/axiosCustomize";
const postCreateNewUser = (email, password, role, userName, image) => {
    //submit data
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', userName);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data)
}

const getAllUser = () => {
    return axios.get('api/v1/participant/all')

}

const putUpdateUser = (id, role, userName, image) => {
    //submit data
    const data = new FormData();
    data.append('id', id);
    data.append('username', userName);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data)
}
const deleteUserById = (userId) => {
    return axios.delete('api/v1/participant/', { data: { id: userId } })
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}
const postLogin = (userEmail, userPassword) => {
    return axios.post('api/v1/login',
        {
            email: userEmail,
            password: userPassword,
            delay: 3000,
        })
}
const postRegister = (userEmail, userPassword, userName) => {
    return axios.post('api/v1/register', { email: userEmail, password: userPassword, username: userName })
}

const getQuizByUser = () => {
    return axios.get('/api/v1/quiz-by-participant')
}
const getDataQuiz = (id) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`)

}
export {
    postCreateNewUser, getAllUser, putUpdateUser,
    deleteUserById, getUserWithPaginate, postLogin, postRegister, getQuizByUser, getDataQuiz
} 