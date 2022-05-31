import { useState, useEffect } from "react";
import { services } from "../servicios/servicios";
import axio from "axios";
export function useFetchParams(
  url: string,
  id: any,
  params: any,
  tipo: any,
  reload = ""
) {
  const [load, setLoad] = useState(true);
  const [data, setData] = useState<any>(tipo);
  const [totalResults, settotalResults] = useState(0);
  const [recordsFiltered, setrecordsFiltered] = useState(0);

  function concatState(response: any) {
    setData((prev: any) => [...prev, response]);
  }

  function deletState(id: any) {
    let nuevo = data.filter((item: any) => item.id !== id);
    setData(nuevo);
  }

  const updateState = (item: any) => {
    let nuevo = data.map((items: any) =>
      items.id === item.id ? (items = item) : items
    );
    setData(nuevo);
  };

  useEffect(() => {
    setLoad(true);
    const cancelToken = axio.CancelToken;
    const source = cancelToken.source();
    if (id === "0" || id === null || id === 0 || id === undefined) {
      return;
    }
    services
      .get(url, {
        params: params,
        responseType: "json",
      })
      .then((rsp) => {
        const { data, totalResults, estatus, recordsFiltered } = rsp.data;
        if (estatus === "ok") {
          if (data) {
            setLoad(false);
            setData(data);
            settotalResults(totalResults);
            setrecordsFiltered(recordsFiltered);
          } else {
            setLoad(false);
            setData([]);
            settotalResults(0);
            setrecordsFiltered(0);
          }
        }
      })
      .catch((e) => {
        console.warn(e);
      });

    return () => {
      source.cancel("solicitud de axios cancelada");
    };
  }, [url, id, reload]);

  return [
    data,
    load,
    totalResults,
    recordsFiltered,
    concatState,
    deletState,
    updateState,
  ];
}
