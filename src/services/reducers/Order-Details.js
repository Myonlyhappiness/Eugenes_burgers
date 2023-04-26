import {
  GET_INFO_ORDER_REQUEST,
  GET_INFO_ORDER_FAILED,
  GET_INFO_ORDER_SUCCESS,
} from "../actions/Order-Details";

import { initialState } from "./index";

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INFO_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_INFO_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderRequest: false,
        orderInfo: action.orderInfo,
      };
    }

    case GET_INFO_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
        textError: action.error,
      };
    }

    default: {
      return state;
    }
  }
};
