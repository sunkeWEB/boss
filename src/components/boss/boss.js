import React from 'react';
import {getUserList} from './../../redux/userchat';
import {connect} from 'react-redux';
import UserInfo from './../userinfo/userinfo';
@connect(state=>state.chatuser,{getUserList})
class Boss extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount () {
        this.props.getUserList('genius');
    }

    render() {
        const data = this.props.userList;
        return (
            <div>
                <UserInfo data={data} />
            </div>
        )
    }
}

export default Boss;