import { CERRAR_S, STORE_SAVE, getStoreSesion } from "../action/aut";

let initial = getStoreSesion();
const reducerAuth = (state = initial, actions: any) => {
  switch (actions.type) {
    case STORE_SAVE:
      return {
        ...state,
        user: actions.payload.data,
        stdAuth: actions.payload.stdAuth,
      };
    case CERRAR_S:
      let logout = {
        ...state,
        user: {},
        stdAuth: false,
      };
      return logout;
    default:
      return state;
  }
};
export default reducerAuth;
