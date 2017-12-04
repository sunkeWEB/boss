import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {loadDate} from './../../redux/userredux';
import {connect} from 'react-redux';



@withRouter
//    用react-router-dom 里面的 withRouter  并且包裹起来  才能操作路由的history
//   责任  管理 路由跳转
@connect(state=>state.user,{loadDate})


class Auth extends React.Component {
    componentWillMount() {
        const publicArr = ['/login', '/register'];  //里面的路由可以不用调整
        const pathname = this.props.location.pathname; //获取当前的pathname
        if (publicArr.indexOf(pathname)>-1) {
            return null;
        }
        //    获取用户信息
        axios.get('/users/info').then(res => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    //有登录信息的
                    this.props.loadDate(res.data.data);
                } else {
                    //没有登录信息的
                    this.props.history.push('/login');
                }
            }
        });
    }

    render() {
        return null
    }
}

export default Auth;