import React from 'react';
import {Card, WhiteSpace, WingBlank} from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

//  这个页面只显示数据 boss和牛人数据
@withRouter
class UserInfo extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    };

    handleChat(v) {
        this.props.history.push(`/chat/${v._id}`);
    }

    render() {
        const data = this.props.data;
        const Header = Card.Header;
        const Body = Card.Body;
        return (
            <WingBlank>
                {data.map(v => (
                    v.avatar ? <div key={new Date().getTime()+Math.random()+10}><Card onClick={() => this.handleChat(v)}
                                          key={v._id + new Date().getTime() + Math.random()}><Header title={v.user}
                                                                                                     thumb={require(`./../img/${v.avatar}`)}
                                                                                                     extra={<span><span
                                                                                                         style={{color: 'red'}}>{v.type === 'boss' ? v.money : null}</span> {v.title}</span>}></Header><Body>
                    <span
                        style={{color: 'red'}}>{v.company === '' ? '' : '公司: ' + v.company}</span>{v.desc.split('\n').map(v => (
                        <div key={new Date().getTime()+Math.random()}><span style={{lineHeight: 1.5}}>{v}</span></div>))}</Body></Card>
                        <WhiteSpace/></div> : null
                ))}
            </WingBlank>
        );
    }
}

export default UserInfo;