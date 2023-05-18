import { combineReducers } from "redux";
import { menuReducer } from "./Ingredient-List";
import { orderReducer } from "./Order-Details";
import { burgerConsctructorReducer } from "./Burger-Constructor";

export const rootReducer = combineReducers({
  menu: menuReducer,
  order: orderReducer,
  burgerConstructor: burgerConsctructorReducer
});
