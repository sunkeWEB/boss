import {createStore} from 'redux';

// 1 创建规则

//通过 reducer   根据老的state和action 生成新的state  也就是规则
function counter(state = 0, action) {
   switch (action.type) {
       case '加':
           return state + 1;
       case '减':
           return state + 1;
       default:
           return 10;
   }
}

//2 根据规则新建stote
const stote = createStore(counter);

// 3




