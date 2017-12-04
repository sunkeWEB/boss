// 合并所有的redux 并且返回总的store
import {combineReducers} from 'redux';
import {user} from './redux/userredux';
import {chatuser} from './redux/userchat';
import {chat} from './redux/chatredux';

export default combineReducers({user, chatuser,chat});