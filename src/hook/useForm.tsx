import { useState } from "react";
export const useForm = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInputReset = () => {
    setFormData(initialState);
  };

  const handleInsert = (data: any) => {
    setFormData(data);
  };

  return [formData, handleInputChange, handleInputReset, handleInsert];
};
