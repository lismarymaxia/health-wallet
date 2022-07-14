export const handleNombre = (id: any, data: any) => {
  let filter: any = data.filter((item: any) => item.value === id);
  if (filter.length > 0) {
    const [item] = filter;
    return item.label;
  }
};
export const formtFechaCorta = (fecha: any) => {
  let f = new Date(fecha);
  if (f != null) {
    let nueva = "";
    const [dia, mes, yy] = f.toLocaleDateString().split("/");
    nueva = `${yy}-${mes}-${dia}`;
    return nueva;
  }
};
