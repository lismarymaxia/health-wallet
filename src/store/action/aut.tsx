export const CERRAR_S: string = "[AUT] CERRAR_S";
export const STORE_SAVE: string = "[AUT] STORE_SAVE";
export const StoreLocal = (data: any): {} => {
  return (dispatch: any) => {
    const sessionStore = {
      user: data,
      stdAuth: true,
    };
    let isSession: any[] = [];
    isSession.push(sessionStore);
    sessionStorage.setItem("session", JSON.stringify(isSession));
    dispatch(StoreSave(data, true));
  };
};

export const StoreSave = (data: any, stdAuth: boolean): {} => ({
  type: STORE_SAVE,
  payload: {
    data: data,
    stdAuth: stdAuth,
  },
});

export const isStore = (): {} => {
  return (dispatch: any) => {
    if (sessionStorage.getItem("session") !== null) {
      let session: any = sessionStorage.getItem("session");
      let parseado = JSON.parse(session);
      const [{ user, stdAuth }] = parseado;
      dispatch(StoreSave(user, stdAuth));
    }
  };
};

export const logout = (): {} => {
  return (dispatch: any) => {
    if (sessionStorage.getItem("session") !== null) {
      sessionStorage.removeItem("session");
      console.log("eliminando");
      dispatch(logoutAuth());
    }
  };
};

const logoutAuth = (): {} => ({
  type: CERRAR_S,
});
