import React from 'react';
import {List, InputItem,NavBar,Icon,Grid,Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList,sendMsg,recvMsg,readMsg} from './../../redux/chatredux';
import {getChatId} from "../../util/util";

@connect(state=>state,{getMsgList,sendMsg,recvMsg,readMsg})
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            msg: [],
            showEmoij:false
        };
    }

    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }

    componentWillUnmount () {
        this.props.readMsg(this.props.match.params.user);
    }

    handleSubmit() {
        const form = this.props.user._id;
        const to = this.props.match.params.user;
        const content = this.state.text;

        if (content!=='') {
            this.props.sendMsg({form,to,content});
            this.setState({
                text: ''
            });
        }else{

        }
    }

    showEmo () {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));   // 手动派发事件  解决bug
        }, 0);
        this.setState({showEmoij: !this.state.showEmoij});
    }

    render() {
        const emoji = '😄 😊 😂 😎 😯 😛 😫 😨 😄 😊 😂 😎 😯 😛 😫 😨 😄 😊 😂 😎 😯 😛 😫 😨 😄 😊 😂 😎 😯 😛 😫 😨 😄 😊 😂 😎 😯 😛 😫 😨 😄 😊 😂 😎 😯 😛 😫 😨 😄 😊 😂 😎 😯 😛 😫 😨 😄 😊 😂 😎 😯 😛 😫 😨 😄 😊 😂 😎 😯 😛 😫 😨 😄 😊 😂 😎 😯 😛 😫 😨'.split(' ').filter(v => v).map(v => ({text:v}));

        const userid = this.props.match.params.user; // 聊天的目标
        const Item = List.Item;
        const users = this.props.chat.users;
        const useravatar = require(`./../../components/img/${users[userid].avatar}`);
        if (!users[userid]) {
            return null;
        }
        //聊天数据过滤
        const chatid = getChatId(userid,this.props.user._id);
        const chatmsgs = this.props.chat.chatmsg.filter(v => {
            return v.chatid === chatid;
          }
        );
        return (
            <div id="chat-page">
                <NavBar className="navbar" icon={<Icon type="left" />} onLeftClick={()=>{this.props.history.goBack()}}>
                    {users[userid].name}
                </NavBar>
                {chatmsgs.map(v => {
                    return v.form === userid ? (
                        <List key={v.chatid+new Date().getTime()+Math.random()}>
                            <Item multipleLine={true} wrap={true} thumb={useravatar}>
                                {v.content}
                            </Item>
                        </List>
                    ) : (
                        <List key={v.chatid+new Date().getTime()+Math.random()}>
                            <Item wrap={true}  multipleLine={true} className='chat-me' extra={<img src={require(`./../../components/img/${this.props.user.avatar}`)} alt=""/>}>
                                {v.content}
                            </Item>
                        </List>
                    )
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem onKeyUp={(e) => {if(e.which===13){this.handleSubmit()}}} extra={<div><span style={{marginRight:15}} onClick={()=>this.showEmo()} >😄</span><span onClick={() => this.handleSubmit()}>发送</span></div>} plachholder="请输入"
                                   value={this.state.text} onChange={v => this.setState({text: v})}/>
                    </List>
                    {this.state.showEmoij ? <Grid data={emoji} columnNum={9} isCarousel={true} carouselMaxRow={4} onClick={(e)=>this.setState({text:this.state.text+e.text})}  /> : null}
                </div>
            </div>
        )
    }
}

export default Chat;