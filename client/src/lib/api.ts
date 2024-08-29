import axios from 'axios';
import {serverUrl} from './u';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: serverUrl,
});

interface RequestBody {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

// 返回一个对象里面所有的key为[]方便填充filteredBody
function fliter(body: RequestBody): string[] {
    return Object.keys(body);
}

// 默认发送所有的key，如果不需要发送所有的key，可以传入expectedKeys
function sendRequest(endpoint: string, body: RequestBody, expectedKeys: string[] = fliter(body)) {
    const filteredBody: RequestBody = {};
    expectedKeys.forEach(key => {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
            filteredBody[key] = body[key];
        }
    });
    return axiosInstance.post(endpoint, filteredBody);
}

interface LoginBody {
    "username": string;
    "password": string;
}

function Login(body: LoginBody) {
    return sendRequest('/auth/loginHandler', body);
}

interface ProfileBody {
    "username": string;
    "password": string;
    "phone_number": string;
    "QQ": string;
    "address": string;
    "gender": 'M' | 'F';
    "email": string;
    "avatar": File;
}


function Register(body: ProfileBody) {
    return sendRequest('/auth/register', body);
}

function editProfile(body: ProfileBody) {
    return sendRequest('/auth/editProfile', body);
}

interface EventBody {
    "name": string;
    "date": string;
    "type": string;
    "description": string;
    "images": File[];
}

function Create(body: EventBody) {
    return sendRequest('/event/create', body);
}

interface EventIdBody {
    "eventID": string;
}

function Close(body: EventIdBody) {
    return sendRequest('/event/close', body);
}

function Reopen(body: EventIdBody) {
    return sendRequest('/event/reopen', body);
}

function Edit(body: EventIdBody & EventBody) {
    return sendRequest('/event/edit', body);
}

function getAllOpen() {
    return axiosInstance.post('/event/getAllOpen');
}

export {Login, Register, Create, Close, Reopen};