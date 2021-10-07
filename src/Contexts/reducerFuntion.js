export default function reducerFunc(state, {type, payload}){
    switch (type) {
        case "INITIAL_LOAD":
            return state = payload;
            
        case "LOG_OUT":
            return state= undefined
        default:
            return state
    }
}