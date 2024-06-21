const historyReducer = (state = [], action)=>{
    switch(action.type){
        case 'updateHistory':
            return [action.payload, ...state];
        case 'getHistory':
            return action.payload
        // case 'deleteHistory':
        //     return action.payload;
        case 'emptyLocalHistory':
            return [];
        default:
            return state;
    }
}

export default historyReducer