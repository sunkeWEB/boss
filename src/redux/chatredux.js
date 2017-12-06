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
        case MSG_READ:
            let {from, num} = action.payload;
            return {...state,unread:state.unread-num,chatmsg:state.chatmsg.map(v=>({...v,read:from===v.form?true:v.read}))};
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

// 跟新消息已读列表  from 是谁发送的消息的id  通过getState 获取当前登录的id
export function readMsg(from) {
    return (dispatch,getState)=>{
        axios.post('/users/readmsg',{from}).then(res=>{
            const userid = getState().user._id;
            if (res.status===200 && res.data.code===0) {
                dispatch(msgRead({userid,from,num:res.data.num}));
            }
        });
    }
}

// 是从from 发送给 to
function msgRead({from,to,num}) {
    return {type: MSG_READ, payload: {from, to, num}};
}