import update from "immutability-helper";

import {
    ADD_ITEM,
    DELETE_ITEM,
    DELETE_BUN,
    MOVING_ITEM,
    CLEAR_CART

  } from "../actions/Burger-Constructor.js";
  
  const initialState = {
    constructorIngredients: [],
    constructorBuns: null
  };


  export const burgerConsctructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM: {
            if (action.payload.type === 'bun') {
              return {
                ...state,
                constructorBuns: action.payload,
              };
            }
            else {
              return {
                ...state,
                constructorIngredients: [...state.constructorIngredients, action.payload],
              };
            } 
          }
      
          case DELETE_ITEM: {
            return {
              ...state,
              constructorIngredients: [
                ...state.constructorIngredients.filter(
                  (ingredient, index) => index !== action.index
                ),
              ],
            };
          }
      
          case DELETE_BUN: {
            return {
              ...state,
              constructorBuns: null
            };
          }

          case MOVING_ITEM:
      return {
        ...state,
        constructorIngredients: update(state.constructorIngredients, {
          $splice: [
            [action.dragIndex, 1],
            [action.hoverIndex, 0, state.constructorIngredients[action.dragIndex]],
          ],
        }),
      };

      case CLEAR_CART:
      return {
        ...state,
        constructorIngredients: [],
        constructorBuns: null
      };

      default: {
        return state;
      }
        }
    }
