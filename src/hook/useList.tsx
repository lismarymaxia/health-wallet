import { useState } from "react";
export function useList(initialForm = {}) {
  const [todo, setTodo] = useState<Array<string>>([]);
  const [form, setForm] = useState(initialForm);

  const handleInputChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSet = (data: any) => {
    if (data.length > 0) setTodo(data);
  };

  const handleAdd = (state: any) => {
    setTodo((prev) => [...prev, state]);
    setForm(initialForm);
  };

  const handleUpdate = (item: any) => {
    let nuevo = todo.map((items: any) =>
      items.id === item.id ? (items = item) : items
    );
    setTodo(nuevo);
  };

  const handleDelet = (id: any) => {
    let filter = todo.filter((item: any) => item.id !== id);
    setTodo(filter);
  };

  const handleReset = () => {
    setTodo([]);
  };

  return [
    todo,
    form,
    handleInputChange,
    handleSet,
    handleAdd,
    handleUpdate,
    handleDelet,
    handleReset,
  ];
}
