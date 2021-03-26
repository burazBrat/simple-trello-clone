import React, { useState } from "react";
import InputList from "./InputList";
import InputContainer from "../InputContainer";

const InputListContainer = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(!open);

  return (
    <InputContainer
      inputComponent={<InputList setOpen={setOpen} />}
      text={"Add another list"}
      open={open}
      handleClose={handleClose}
    ></InputContainer>
  );
};

export default InputListContainer;
