import {
  GET_INFO_ORDER_REQUEST,
  GET_INFO_ORDER_FAILED,
  GET_INFO_ORDER_SUCCESS,
  CLEAR_INFO_ORDER
} from "../actions/Order-Details";

const initialState = {
  orderRequest: false,
  orderFailed: false,
  orderInfo: {},
  textError: "",

};

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
        orderInfo: {},
        textError: action.error,
      };
    }

    case CLEAR_INFO_ORDER: {
      return {
        ...state,
        orderInfo: {}
      };
    }

    default: {
      return state;
    }
  }
};
