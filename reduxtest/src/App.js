import React, {Component} from 'react';
import {Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {addGUN, removeGun, addGunAsync} from './reduxIndex';

{
    // const mapStateToProps = (state) => {  //监听 Redux store 的变化 只要 Redux store 发生改变，mapStateToProps 函数就会被调用 必须返回一个纯对象，这个对象会与组件的 props 合并
//     return {num:state}
// };

// const actionCreators = {addGUN, removeGun, addGunAsync};

// App = connect(mapStateToProps,actionCreators)(App);

// @connect(mapStateToProps,actionCreators)
}

/**
 * 第一个参数 需要什么属性
 * 第二个参数 需要什么方法 会自动放入props中 自动dispatch
 * 点击的时候 先执行connect 里面第二个参数的方法  把结果返回 外面的Provide 会监听 store 改变  在触发 redurce  在进行connect里面的第一个参数
 */
@connect(state => {console.log("map止血哦那个");return {num:state}}, {addGUN, removeGun, addGunAsync})

class App extends Component {
    render() {
        let num = this.props.num;
        let add = this.props.addGUN;
        let remove = this.props.removeGun;
        let addGunAsync = this.props.addGunAsync;
        return (
            <div>
                <h1>现在有机抢:{num}</h1>
                <Button onClick={() => add()}>申请武器</Button>
                <Button onClick={() => remove()}>回收武器</Button>
                <Button onClick={() => addGunAsync()}>推两天再给</Button>
            </div>
        )
    }
}

export default App;
