import update from "immutability-helper";

import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  ADD_ITEM,
  DELETE_ITEM,
  DELETE_BUN,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  INCREASE_COUNTER_BUN,
  DECREASE_COUNTER_BUN,
  MOVING_ITEM,
} from "../actions/Ingredient-List";

import { initialState } from "./index";

export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        itemsRequest: false,
        ingredients: action.ingredients,
      };
    }

    case GET_ITEMS_FAILED: {
      return {
        ...state,
        itemsFailed: true,
        itemsRequest: false,
        textError: action.error,
      };
    }

    case ADD_ITEM: {
      return {
        ...state,
        constructorItems: [...state.constructorItems, action.payload],
      };
    }

    case DELETE_ITEM: {
      return {
        ...state,
        constructorItems: [
          ...state.constructorItems.filter(
            (ingredient, index) => index !== action.index
          ),
        ],
      };
    }

    case DELETE_BUN: {
      return {
        ...state,
        constructorItems: [
          ...state.constructorItems.filter(
            (ingredient) => ingredient.type !== "bun"
          ),
        ],
      };
    }

    case INCREASE_COUNTER: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients.map((ingredient) =>
            ingredient._id === action._id
              ? { ...ingredient, __v: ingredient.__v + 1 }
              : { ...ingredient }
          ),
        ],
      };
    }

    case INCREASE_COUNTER_BUN: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients.map((ingredient) =>
            ingredient._id === action._id && action.__v === 0
              ? { ...ingredient, __v: ingredient.__v + 2 }
              : { ...ingredient }
          ),
        ],
      };
    }

    case DECREASE_COUNTER: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients.map((ingredient) =>
            ingredient._id === action._id
              ? { ...ingredient, __v: ingredient.__v - 1 }
              : ingredient
          ),
        ],
      };
    }

    case DECREASE_COUNTER_BUN: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients.map((ingredient) =>
            ingredient._id !== action._id && ingredient.type === "bun"
              ? { ...ingredient, __v: 0 }
              : ingredient
          ),
        ],
      };
    }

    case MOVING_ITEM:
      return {
        ...state,
        constructorItems: update(state.constructorItems, {
          $splice: [
            [action.dragIndex, 1],
            [action.hoverIndex, 0, state.constructorItems[action.dragIndex]],
          ],
        }),
      };

    default: {
      return state;
    }
  }
};
