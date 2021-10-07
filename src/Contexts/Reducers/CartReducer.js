export const cartReducer = (state, { type, payload }) => {

  switch (type) {
    case "LOAD_DATA":
      return state = payload;

    case "ADD":
      return state = [...state, {...payload, qty: 1}];

    case "INCREMENT":
      return state = state.map(item => {
        if(item._id === payload._id){
          return {...payload, qty: payload.qty + 1}
        } else {
          return item
        }
      })

    case "DECREMENT":
      return state = state.map(item => {
        if(item._id === payload._id){
          return {...payload, qty: payload.qty - 1}
        } else {
          return item
        }
      })

    case "REMOVE":
      return state = state.filter(item => item._id !== payload._id);
      
    default:
      break;
  }
  };

