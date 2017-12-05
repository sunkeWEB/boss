import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile';
import NavLinkBar from './../../components/navlinkbar/navlinkbar';
import Boss from './../../components/boss/boss';
import Genius from './../../components/genius/genius';
import User from './../../components/user/user';
import Msg from './../../components/msg/msg';
import {getMsgList, recvMsg} from './../../redux/chatredux';


@connect(state => state, {getMsgList, recvMsg})


class DashBorad extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }

    render() {
        const navList = [{
            path: '/boss',
            text: '牛人',
            icon: 'boss',
            title: '牛人列表',
            component: Boss,
            hide: this.props.user.type === 'genius'
        }, {
            path: '/genius',
            text: 'Boss',
            icon: 'job',
            title: 'Boss列表',
            component: Genius,
            hide: this.props.user.type === 'boss'
        }, {
            path: '/msg',
            text: '消息',
            icon: 'msg',
            title: '消息列表',
            component: Msg,
        }, {
            path: '/me',
            text: '个人中心',
            icon: 'user',
            title: '个人中心',
            component: User,
        }];
        const {pathname} = this.props.location;
        return (
            <div>
                <NavBar mode="dark" className="fixd-header">{navList.find(v => v.path === pathname).title}</NavBar>
                <div style={{marginTop: 58}}>
                    <Switch>
                        {navList.map(v => (
                            <Route key={v.key + new Date().getTime() + Math.random()} component={v.component}
                                   path={v.path}/>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}/>
            </div>
        )
    }
}

export default DashBorad;