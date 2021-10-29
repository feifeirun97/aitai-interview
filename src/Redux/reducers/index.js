import { combineReducers } from "redux";
import tableChangeReducer from "./tableChangeReducer"

const reducers = combineReducers({
  tableChange: tableChangeReducer
})


export default reducers