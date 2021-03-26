import React, { useState } from "react";
import InputBoard from "./InputBoard";
import InputContainer from "../InputContainer";

const InputBoardContainer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(!open);

  return (
    <InputContainer
      inputComponent={<InputBoard setOpen={setOpen} />}
      text={"Create new board"}
      open={open}
      handleClose={handleClose}
    ></InputContainer>
  );
};

export default InputBoardContainer;
