import axios from 'axios';
import {getRedirectPath} from './../util/util';
//  存放用户的redux
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LODA_DATE = 'LODA_DATE';
const REGISTER_ERROR = 'REGISTER_ERROR';
const initState = {
    msg: '', //错误的信息
    user: '', // 用户名
    pwd: '', // 密码
    type: '', //boss or 牛人
    redireact: '' // 注册成功跳转地址
};


//reducer
export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state,msg: '',redireact: getRedirectPath({type: action.payload.type,avatar: action.payload.avatar}), ...action.payload};
        case LODA_DATE:
            return {...state, ...action.payload};
        case LOGOUT:
            return {...initState, redireact: '/login'};
        case REGISTER_ERROR:
            return {...state, msg: action.msg, isAuth: false};
        default:
            return state;
    }
}

// 验证成功
function authSuccess(obj) {
    const {pwd,...data} = obj;
    return {type:AUTH_SUCCESS,payload:data}
}


export function loadDate(userinfo) {
    return {type: LODA_DATE, payload: userinfo}
}


// action 
export function register({user, pwd, repeatpwd, type}) {
    if (!user || !pwd) {
        return errorMsg('用户名密码必须填写');
    }
    if (pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不相等');
    }
    return dispatch => {
        axios.post('/users/resigter', {user, pwd, type}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess({user, pwd, type}));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        });
    }
}

function errorMsg(msg) {
    return {msg, type: REGISTER_ERROR};
}



//登录
export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户名密码必须输入');
    }
    return dispatch => {
        axios.post('/users/login', {user, pwd}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                // dispatch(regsiterSuccess({user, pwd}));
                dispatch(authSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        });
    }
}



//

export function userinfo() {
//    获取用户信息
    return dispatch => {
        axios.get('/users/info').then(res => {
            if (res.status === 200) {
                if (res.data.code === 0) {

                } else {
                    this.props.loadData(res.data.data);
                    this.props.history.push('/login');
                }
            }
        })
    }
}

//更新
export function update(data) {
    return dispatch => {
        axios.post('/users/update',data).then(res=>{
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}

export function logoutSubmit() {
    return {type:LOGOUT}
}
