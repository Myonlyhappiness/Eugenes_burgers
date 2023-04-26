import { combineReducers } from "redux";
import { menuReducer } from "./Ingredient-List";
import { orderReducer } from "./Order-Details";

export const rootReducer = combineReducers({
  menu: menuReducer,
  order: orderReducer
});
