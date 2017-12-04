import axios from 'axios';
import io from 'socket.io-client';
let socket = io('ws://127.0.0.1:3030');

//获取聊天列表
let MSG_LIST = "MSG_LIST";
//读取信息
let MSG_RECV = "MSG_RECV";
//标识已读
let MSG_READ = "MSG_READ";

const initState = {
    chatmsg:[],
    unread:0
};
//reducer
export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state, chatmsg: action.payload,unread:action.payload.filter(v=>!v.read).length};
        // case MSG_RECV:
        // case MSG_READ:
        default:
            return state;
    }
}

// 首次进入
export function getMsgList() {
    return dispatch => {
        axios.get('/users/getmsglist').then(res=>{
            if (res.state===200 && res.data.code===0) {
                dispatch(msgList(res.data.msgs));
            }
        })
    }
}

function msgList(data) {
    return {type: MSG_LIST, payload: data};
}


// 发送消息
export function sendMsg ({form,to,content}) {
    return dispatch => {
        socket.emit('sendmsg',{form,to,content});
    }
}