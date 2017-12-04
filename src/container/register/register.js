import React from 'react';
import {Button, List, InputItem, WingBlank, WhiteSpace, Radio, Toast} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import Logo from './../../components/logo/logo';
import {register} from './../../redux/userredux';
import {connect} from 'react-redux';

@connect(state => state.user, {register})

class Resiter extends React.Component {
    constructor(props) {
        super(props);
        this.selectType = this.selectType.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius' // boss 两种选择
        };
    }

    handleRegister() {
        this.props.register(this.state);
    }

    selectType(e) {
        this.setState({
            type: e.target.name
        });
    }

    handleInput(key, value) {
        this.setState({
            [key]: value  // 这里key要[] 包裹  要不就是字符串 key
        });
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {/*注册之后跳转根据选择*/}
                {this.props.redireact ? <Redirect to={this.props.redireact}/> : null}
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem onChange={v => {
                            this.handleInput('user', v)
                        }}>用&nbsp;&nbsp;户&nbsp;&nbsp;名</InputItem>
                        <InputItem type="password" onChange={v => {
                            this.handleInput('pwd', v)
                        }}>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</InputItem>
                        <InputItem type="password" onChange={v => {
                            this.handleInput('repeatpwd', v)
                        }}>确认密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <RadioItem onChange={this.selectType} name="genius"
                               checked={this.state.type === 'genius' ? true : false}>牛人</RadioItem>
                    <RadioItem onChange={this.selectType} name="boss"
                               checked={this.state.type === 'boss' ? true : false}>Boss</RadioItem>
                    <WhiteSpace/>
                    <Button type="primary">登录</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Resiter;