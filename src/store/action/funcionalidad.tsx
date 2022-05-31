export const SELECT_INSITUCION: string = "[AUT] SELECT_INSITUCION";
export const SELECT_DETALLE: string = "[AUT] SELECT_DETALLE";

export const selectInstitucion = (data: string): {} => ({
  type: SELECT_INSITUCION,
  payload: {
    data: data,
  },
});

export const selectDetalle = (data: string): {} => ({
  type: SELECT_DETALLE,
  payload: {
    data: data,
  },
});
