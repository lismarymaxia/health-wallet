import { useState } from "react";
export function useModal() {
  const [state, setState] = useState(false);

  const handleOpen = () => {
    setState(true);
  };

  const handleClose = () => {
    setState(false);
  };

  return [state, handleOpen, handleClose];
}
