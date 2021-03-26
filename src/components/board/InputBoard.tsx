import React, { ChangeEvent, useState } from "react";
import Input from "../Input";
import useBoard from "../../hooks/useBoard";
import { createFetch } from "../../services/create";
import { apiUrlHelper } from "../../utils/urlHelper";

interface InputBoardProps {
  setOpen: (boolean: boolean) => void;
}

const InputBoard: React.FC<InputBoardProps> = ({ setOpen }) => {
  const [name, setName] = useState("");
  const { optimisticAddBoard, finishAddOptimisticOperation } = useBoard();

  const handleBtnConfirm = async () => {
    if (!name) return;

    const data = {
      name: name,
    };
    await optimisticAddBoard(name);
    setName("");
    setOpen(false);
    await createFetch(apiUrlHelper(`/boards`), data);
    await finishAddOptimisticOperation();
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(e.target.value);
  };

  const handleClose = () => setOpen(false);

  return (
    <Input
      placeholder={"Enter a title of this board"}
      buttonText={"Add board"}
      onChange={handleOnChange}
      handleSave={handleBtnConfirm}
      handleClose={handleClose}
    ></Input>
  );
};

export default InputBoard;
