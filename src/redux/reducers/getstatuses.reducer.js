const getStatusesReducer = (state = [], action) => {
  switch (action.type) {    
  case 'SET_ALL_STATUSES':
        return action.payload;
      default:
        return state;
  };
}
  
  // user will be on the redux state at:
  // state.user
  export default getStatusesReducer;