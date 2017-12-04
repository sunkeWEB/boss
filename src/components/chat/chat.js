import React from 'react';
import io from 'socket.io-client';
import {List, InputItem} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList,sendMsg} from './../../redux/chatredux';

let socket = io('ws://127.0.0.1:3030');

@connect(state=>state,{getMsgList,sendMsg})
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            msg: []
        };
    }

    componentWillMount() {
        this.props.getMsgList();
        // // socket.on('resvmsg', (data) => {
        // //     console.log(data);
        // //     this.setState({
        // //         msg: [...this.state.msg, data.text]
        // //     });
        // // });
    }

    handleSubmit() {
        const form = this.props.user._id;
        console.log(form);
        const to = this.props.match.params.user;
        const content = this.state.text;
        this.props.sendMsg({form,to,content});
        this.setState({
            text: ''
        });
    }

    render() {
        return (
            <div>
                {this.state.msg.map(v => {
                    return <p key={v}>{v}</p>
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem extra={<span onClick={() => this.handleSubmit()}>发送</span>} plachholder="请输入"
                                   value={this.state.text} onChange={v => this.setState({text: v})}/>
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat;