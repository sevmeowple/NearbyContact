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

function sendRequest(endpoint: string, body: RequestBody, expectedKeys: string[]) {
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
    return sendRequest('/auth/login', body, ['username', 'password']);
}

interface RegisterBody {
    "username": string;
    "password": string;
    "phone_number": string;
    "QQ": string;
    "address": string;
    "gender": 'M' | 'F';
    "email": string;
    "avatar": File;
}

function Register(body: RegisterBody) {
    return sendRequest('/auth/register', body, ['username', 'password', 'email']);
}

interface CreateBody {
    "name": string;
    "date": string;
    "type": string;
    "description": string;
    "images": File[];
}

function Create(body: CreateBody) {
    return sendRequest('/event/create', body, ['name', 'date']);
}

interface CloseBody {
    "eventID": number;
}

function Close(body: CloseBody) {
    return sendRequest('/event/close', body, ['eventID']);
}

interface ReopenBody {
    "eventID": number;
}

function Reopen(body: ReopenBody) {
    return sendRequest('/event/reopen', body, ['eventID']);
}

export {Login, Register, Create, Close, Reopen};