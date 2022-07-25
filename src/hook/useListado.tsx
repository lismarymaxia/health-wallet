import { useState } from "react";

export const useListado = () => {
  const [listado, setListado] = useState<any>([]);

  const handleAddAll = (data: any) => {
    setListado(data);
  };

  const handleAddItem = (state: any) => {
    setListado((prev: any) => [...prev, state]);
  };

  const handleDeletItem = (id: any) => {
    let filter = listado.filter((item: any) => item.id !== id);
    setListado(filter);
  };

  const handleUpdateItem = (item: any) => {
    let nuevo = listado.map((items: any) =>
      items.id === item.id ? (items = item) : items
    );
    setListado(nuevo);
  };

  return [
    handleAddAll,
    handleAddItem,
    handleDeletItem,
    handleUpdateItem,
    listado,
  ];
};
