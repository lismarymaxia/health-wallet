import { useState } from "react";
export function useTodo(initialForm = {}) {
  const [todo, setTodo] = useState<Array<string>>([]);
  const [form, setForm] = useState(initialForm);

  const handleInputChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSet = (data: any) => {
    if (data.length > 0) setTodo(data);
  };

  const handleAdd = () => {
    if (form !== "") {
      let clone: any = { ...form };
      clone["id"] = new Date().getTime();
      setTodo((prev) => [...prev, clone]);
      setForm(initialForm);
    }
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
    handleAdd,
    handleSet,
    handleDelet,
    handleReset,
  ];
}
