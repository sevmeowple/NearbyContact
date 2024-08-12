// 把http请求的接口封装到这里
import axios from 'axios';
import { serverUrl } from './u';
// 创建一个统一的axios实例
const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: serverUrl,
})


interface LoginBody {
    username: string;
    password: string;
}
// login Post请求
// 请求body: {username: string, password: string}
function Login(body: LoginBody) {
    return axiosInstance.post('/api/login', body);
}

// register Post请求
interface RegisterBody {
    username: string;
    password: string;
    email: string;
}

function Register(body: RegisterBody) {
    return axiosInstance.post('/api/register', body);
}

// 创建一个失物招领的接口
interface CreateBody {
    name: string;
    date: string;
}
function Create(body: CreateBody) {
    return axiosInstance.post('/event/create', body);
}

// 关闭事件
interface CloseBody {
    eventID: number;
}
function Close(body: CloseBody) {
    return axiosInstance.post('/event/close', body);
}
// 重新打开事件
interface ReopenBody {
    eventID: number;
}
function Reopen(body: ReopenBody) {
    return axiosInstance.post('/event/reopen', body);
}



export { Login, Register, Create, Close, Reopen };