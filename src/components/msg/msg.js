import React from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';
import {recvMsg} from './../../redux/chatredux';

@connect(state => state,{recvMsg})

class Msg extends React.Component {


    getLast(arr) {
        return arr[arr.length - 1];
    }

    render() {
        const userid = this.props.user._id; //当前登录用户的id
        const msgGroup = {};
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v);
        });


        const chatList = Object.values(msgGroup).sort((a, b) => {
            let a_time = this.getLast(a).create_time;
            let b_time = this.getLast(b).create_time;
            return b_time - a_time;
        });


        const Item = List.Item;
        const Brief = Item.Brief;
        const userinfo = this.props.chat.users;
        return (
            <div>
                {chatList.map(v => {
                    let ItemLast = this.getLast(v);
                    let targerId = v[0].form === userid ? v[0].to : v[0].form;
                    let unread = v.filter(v => !v.read && v.to === userid).length;
                    return (<List key={new Date().getTime() + Math.random()}>
                            <Item arrow="horizontal" onClick={() => this.props.history.push(`/chat/${targerId}`)}
                                  extra={<Badge text={unread}></Badge>}
                                  thumb={require(`./../img/${userinfo[targerId].avatar}`)}>
                                {ItemLast.content}
                                <Brief>{userinfo[targerId].name}</Brief>
                            </Item>
                        </List>
                    )
                })}
            </div>
        )
    }
}

export default Msg;