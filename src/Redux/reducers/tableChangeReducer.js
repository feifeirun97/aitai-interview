
//state=1 table1
//state=2 table2
const reducer = (state=1, action) => {
  switch(action.type) {
    case 'selectT1':
      state = 1;
      return state;
    case 'selectT2':
      state = 2
      return state ;
    default:
      return state;
  }
}
export default reducer;