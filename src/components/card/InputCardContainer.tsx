import React, { useState } from "react";
import InputCard from "./InputCard";
import InputContainer from "../InputContainer";

interface InputContainerProps {
  idList: string;
}

const InputCardContainer: React.FC<InputContainerProps> = ({ idList }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(!open);

  return (
    <InputContainer
      inputComponent={<InputCard setOpen={setOpen} idList={idList}></InputCard>}
      text={"Add another card"}
      open={open}
      handleClose={handleClose}
    ></InputContainer>
  );
};

export default InputCardContainer;
