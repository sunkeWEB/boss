import React from 'react';
import {NavBar, InputItem, WhiteSpace, WingBlank, TextareaItem, Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import AvatarSelect from './../../components/avatarSelect/avatarSelect';
import {connect} from 'react-redux';
import {update} from './../../redux/userredux';

@connect(state=>state.user,{update})


class GeniusInfo extends React.Component {
    constructor(props) {
        super(props);
        this.selectAvatar = this.selectAvatar.bind(this);
        this.state = {
            avatar: '',
            title: '',
            company: '',
            money: '',
            desc: ''
        };
    }

    onChange(key, value) {
        this.setState({
            [key]: value
        });
    }

    selectAvatar(e) {
        console.log(e);
        this.setState({
            avatar: `${e}.png`
        });
    }

    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redireact;
        return (
            <div>
                {redirect && redirect !==path ?<Redirect to={this.props.redireact} />:null}
                <NavBar mode="dark" leftContent="返回">牛人信息完善</NavBar>
                <WingBlank>
                    <WhiteSpace/>
                    <AvatarSelect selectAvatar={this.selectAvatar}/>
                    <WhiteSpace/>
                    <InputItem onChange={v => {
                        this.onChange('title', v)
                    }}>求职岗位</InputItem>
                    <WhiteSpace/>
                    {/*<InputItem onChange={v=>{this.onChange('desc',v)}}>职位要求</InputItem>*/}
                    <TextareaItem onChange={v => {
                        this.onChange('desc', v)
                    }} rows="4" title="个人简历" placeholder="" editable="true" clear="true"
                                  autoHeight="true"></TextareaItem>
                    <WhiteSpace/>
                    <Button type="primary" onClick={() => {
                        this.props.update(this.state)
                    }}>保存</Button>
                    <WhiteSpace/><WhiteSpace/><WhiteSpace/><WhiteSpace/>
                </WingBlank>
            </div>
        )
    }
}

export default GeniusInfo;