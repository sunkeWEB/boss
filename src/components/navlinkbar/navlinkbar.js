import React from 'react';
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

@withRouter
@connect(
    state => state.chat
)
class NavLinkBar extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    };

    render() {
        const navList = this.props.data.filter(v => !v.hide);
        return (
            <div>
                <TabBar>
                    {navList.map(v => (
                        <TabBar.Item badge={v.path === '/msg' ? this.props.unread : ''} key={v.path} title={v.title}
                                     icon={{uri: require(`./image/${v.icon}.png`)}}
                                     selectedIcon={{uri: require(`./image/${v.icon}-active.png`)}}
                                     selected={this.props.location.pathname === v.path}
                                     onPress={() => (this.props.history.push(v.path))}/>
                    ))}
                </TabBar>
            </div>
        )
    }
}

export default NavLinkBar;