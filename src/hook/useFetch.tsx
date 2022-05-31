import { useState, useEffect } from "react";
import { services } from "../servicios/servicios";
import axio from "axios";

export function useFetch(
  url: string,
  action: string,
  id: any,
  page: any,
  reload = ""
) {
  const [load, setLoad] = useState(true);
  const [data, setData] = useState<Array<string>>([]);
  const [totalResults, settotalResults] = useState(0);
  const [recordsFiltered, setrecordsFiltered] = useState(0);

  function concatState(response: any) {
    setData((prev) => [...prev, response]);
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
    const cancelToken = axio.CancelToken;
    const source = cancelToken.source();
    if (id !== "0") {
      services
        .get(url, {
          params: {
            op: action,
            id: id,
            page: page,
            imestamp: new Date().getTime(),
          },
          responseType: "json",
        })
        .then((rsp: any) => {
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
        .catch((e: any) => {
          console.warn(e);
        });
    }
    return () => {
      source.cancel("solicitud de axios cancelada");
    };
  }, [id, url, action, page, reload]);

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
