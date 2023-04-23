import { combineReducers } from 'redux';
import { menuReducer} from './Ingredient-List' 
import { handleActiveModal } from './Modal'
import { orderReducer } from './Order-Details'

export const initialState = {
  ingredients: [],
  itemsRequest: false,
  itemsFailed: false,

  orderRequest: false,
  orderFailed: false,
  orderInfo: {},

  textError: '',
  constructorItems: [],
  currentIngredient: "",
  currentTab: 'one',
  modalActive: false,
 
}

export const rootReducer = combineReducers({
    menu: menuReducer,
    order: orderReducer,
    modal: handleActiveModal
  });