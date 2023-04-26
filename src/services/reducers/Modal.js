import { OPEN_MODAL, CLOSE_MODAL } from "../actions/Ingredient-List";
import { initialState } from "./index";

export const handleActiveModal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        modalActive: true,
        currentIngredient: action.item ? action.item : "",
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        modalActive: false,
        currentIngredient: "",
        textError: "",
        orderInfo: {},
      };
    }

    default: {
      return state;
    }
  }
};
