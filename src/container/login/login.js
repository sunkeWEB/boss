import React from 'react';
import Logo from './../../components/logo/logo';
import {Button, List, InputItem, WingBlank, WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login} from './../../redux/userredux';

@connect(state => state.user, {login})
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.resigter = this.resigter.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            user: '',
            pwd: ''
        };
    }

    resigter() {
        this.props.history.push('/resigter');  // 路由跳转
    }

    handleLogin() {
        this.props.login(this.state);
    }

    handleInput(key, value) {
        this.setState({
            [key]: value  // 这里key要[] 包裹  要不就是字符串 key
        });
    }

    render() {
        return (
            <div>
                {/*登录之后跳转根据选择*/}
                {this.props.redireact ? <Redirect to={this.props.redireact}/> : null}
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem onChange={v => {
                            this.handleInput('user', v)
                        }}>用户名</InputItem>
                        <InputItem type="password" onChange={v => {
                            this.handleInput('pwd', v)
                        }}>密&nbsp;&nbsp;&nbsp;码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.resigter}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;