import React from 'react';
import {Grid,List} from 'antd-mobile';

class AvatarSelect extends React.Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render() {
        const avatarList = 'boy,bull,chick,crab,girl,hedgehog,man,pig,tiger,whale,woman,zebra'.split(',').map(v=>({
            icon:require(`./../img/${v}.png`),
            text:v
        }));
      const  gridHead = this.state.icon?(<div><span>已选择头像</span>  <img src={this.state.icon} style={{width:13}} alt=""/></div>):(<div>请选择头像</div>);
        return (
            <div>
                <List renderHeader={()=>gridHead}>
                    <Grid data={avatarList} onClick={elm=>{
                        this.setState(elm);
                        this.props.selectAvatar(elm.text)
                    }} />
                </List>
            </div>
        )
    }
}

export default AvatarSelect;