import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import thunk from 'redux-thunk';
import redurce from './redurces';
import './config';
import BossInfo from './container/bossinfo/bossinfo';
import Login from './container/login/login';
import Resigter from './container/register/register';
import AuthRouter from './components/authrouter/authrouter';
import GeniusInfo from "./container/geniusinfo/geniusinfo";
import DashBoard from './container/dashboard/dashborad';
import './index.css';
import Chat from './components/chat/chat';
//AuthRouter 本身是一个普通路由 没办法 操作history  详情 Auth
const store = createStore(redurce, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));


ReactDom.render((<Provider store={store}>
    <BrowserRouter>
        <div>
            <AuthRouter></AuthRouter>
            <Switch>
                <Route path="/bossinfo" component={BossInfo}/>
                <Route path="/geniusinfo" component={GeniusInfo}/>
                <Route path='/login' component={Login}/>
                <Route path='/resigter' component={Resigter}/>
                <Route path='/chat/:user' component={Chat}></Route>
                <Route component={DashBoard}/>
            </Switch>
        </div>
    </BrowserRouter>
</Provider>), document.getElementById('root'));