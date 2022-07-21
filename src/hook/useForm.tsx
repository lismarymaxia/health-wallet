import { useState } from "react";
export const useForm = (initialState: any) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (value: any, prop: any) => {
    setFormData({ ...formData, [prop]: value });
  };

  const handleInputReset = () => {
    setFormData(initialState);
  };

  const handleInsert = (data: any) => {
    setFormData(data);
  };

  return [formData, handleInputChange, handleInputReset, handleInsert];
};
