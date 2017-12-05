import axios from 'axios';
import io from 'socket.io-client';

let socket = io('ws://127.0.0.1:3030');

//获取聊天列表
let MSG_LIST = "MSG_LIST";
//读取信息
let MSG_RECV = "MSG_RECV";
//标识已读
// let MSG_READ = "MSG_READ";

const initState = {
    chatmsg: [],
    users:{},
    unread: 0
};

//reducer
export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state,users: action.payload.users, chatmsg: action.payload.data, unread: action.payload.data.filter(v => !v.read && v.to === action.payload.userid).length};
        case MSG_RECV:
            let n = action.userid === action.payload.to ?  1 : 0;
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread + n};
        // case MSG_READ:
        default:
            return state;
    }
}

// 首次进入
export function getMsgList() {
    return (dispatch,getState) => {
        axios.get('/users/getmsglist').then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(msgList(res.data.msgs,res.data.users,getState().user._id));
            }
        })
    }
}

function msgList(data,users,userid) {
    return {type: MSG_LIST, payload: {data,users,userid}};
}

// 发送消息
export function sendMsg({form, to, content}) {
    return dispatch => {
        socket.emit('sendmsg', {form, to, content});
    }
}

// 和数据库进行数据交流
export function recvMsg() {
    return (dispatch,getState) => {
        socket.on('recvmsg', (data) => {
            dispatch(msgRecv(data,getState().user._id));
        });
    }
}

function msgRecv(data,userid) {
    return {type: MSG_RECV, payload:data,userid}
}