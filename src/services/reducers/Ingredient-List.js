import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
} from '../actions/Ingredient-List'

import {initialState} from './index'



export const menuReducer= (state = initialState, action) => {

    switch (action.type) {

        case GET_ITEMS_REQUEST: {
            return {
              ...state,
              itemsRequest: true
            };
          }
          case GET_ITEMS_SUCCESS: {
            return { ...state, 
                itemsFailed: false, 
                itemsRequest: false,  
                ingredients: action.ingredients,
                constructorItems: action.ingredients};
          }

          case GET_ITEMS_FAILED: {
            return { ...state, 
              itemsFailed: true, 
              itemsRequest: false, 
              textError: action.error
            };
          }

          default: {
            return state;
    }
}
}

