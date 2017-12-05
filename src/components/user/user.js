import React from 'react';
// 用户登录的时候已经有啦数据 直接在redux中获取
import {connect} from 'react-redux';
import {Result, WhiteSpace, WingBlank, List, Button, Modal} from 'antd-mobile';
import BrowserCookies from 'browser-cookies';
import {logoutSubmit} from './../../redux/userredux';
import {Redirect} from 'react-router-dom';

@connect(state => state.user, {logoutSubmit})


class User extends React.Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        const alert = Modal.alert;
        alert('注销', '是否退出当前登录信息?', [
            {
                text: '退出', onPress: () => {
                    BrowserCookies.erase('userid');
                    this.props.logoutSubmit()
                }
            },
            {
                text: '取消', onPress: () => {
                    console.log("取消")
                }
            }
        ]);

        // BrowserCookies.erase('userid');
        // console.log('logout');
    }

    render() {
        const userinfo = this.props;
        const company = userinfo.company;
        const title = userinfo.title;
        const Item = List.Item;
        const Brief = List.Item.Brief;
        return userinfo.user?(
            <WingBlank>
                <Result
                    img={<img src={require(`./../img/${userinfo.avatar}`)} style={{width: 60}}/>}
                    title={userinfo.user}
                    message={company ? <div>{company}</div> : title ? <div>{title}</div> : null}/>
                <List renderHeader={() => '个人信息'} className="my-list">
                    <Item extra={userinfo.title}>{userinfo.type === 'boss' ? '招聘岗位' : '求职岗位'}</Item>
                </List>
                <List className="my-list">
                    <Item>
                        {userinfo.desc.split('\n').map(v => (
                            <Brief key={v}><span style={{lineHeight: 2}}>{v}</span></Brief>))}
                    </Item>
                </List>
                <WhiteSpace/><WhiteSpace/>
                <Button type="primary" onClick={this.logout}>退出</Button>
            </WingBlank>
        ):<Redirect to={userinfo.redireact} />
    }
}

export default User;