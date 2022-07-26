import { useState } from "react";
export const useForm = (initialState: any) => {
  const [formulario, setFormulario] = useState(initialState);

  const handleInputChange = (value: any, prop: any) => {
    setFormulario({ ...formulario, [prop]: value });
  };

  const handleInputReset = () => {
    setFormulario(initialState);
  };

  return [formulario, handleInputChange, handleInputReset, setFormulario];
};
