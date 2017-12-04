const ADD_GUN = '加机关枪';
const REMOVE_GUN = '减机关枪';

// reducer 中维护state
export function counter(state = 0, action) {
    console.log("counter----");
    switch (action.type) {
        case ADD_GUN:
            return state + 1;
        case REMOVE_GUN:
            return state - 1;
        default:
            return 10;
    }
}

// 这里变化 执行上面代码
export function addGUN() {
    console.log("addGUN执行");
    return {
        type:ADD_GUN
    }
}

export function removeGun() {
    return {
        type:REMOVE_GUN
    }
}

// 异步
export function addGunAsync() {
    return dispatch => {
        setTimeout(()=>{
            dispatch(addGUN());
        },2000)
    }
}