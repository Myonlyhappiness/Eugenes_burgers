import {SET_TAB} from '../actions/Tab'
import {initialState} from './index'

export const tabsReducer= (state = initialState, action) => {

    switch (action.type) {
        case SET_TAB: {
            return {
              ...state,
              currentTab: 'two'
            }
          }
          default: 
          {return state;}
    }
  }
