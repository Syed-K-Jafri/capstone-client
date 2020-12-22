
const initialState = {
  route: false,
  navigation: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SIGN_IN':
      return {...state, user: action.payload};
    case 'SIGN_OUT': 
      return {...state, user: initialState };
    case 'SET_ROUTE':
      return {...state, route: action.payload };
    case 'SIDE_NAVIGATION':
      return {...state, navigation: action.payload };
  
    default:
      return state;
  }
}