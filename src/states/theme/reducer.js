import { ActionType } from "./action";

function themeReducer(theme = "light", action = {}) {
  switch (action.type) {
    case ActionType.SET_THEME:
      return action.payload.theme;
    default:
      return localStorage.getItem("theme") || theme;
  }
}

export default themeReducer;
