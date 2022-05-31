import { SELECT_INSITUCION } from "../action/funcionalidad";
let initial: any = {
  institutcion: "",
  detalle: {},
};

const reducerFuncionalidad = (state = initial, actions: any) => {
  switch (actions.type) {
    case SELECT_INSITUCION:
      return {
        ...state,
        institutcion: actions.payload.data,
      };
    default:
      return state;
  }
};
export default reducerFuncionalidad;
