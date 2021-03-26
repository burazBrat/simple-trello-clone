import React, { ChangeEvent, useState } from "react";
import useBoard from "../../hooks/useBoard";
import useList from "../../hooks/useList";
import { createFetch } from "../../services/create";
import { apiUrlHelper } from "../../utils/urlHelper";
import Input from "../Input";

interface InputListProps {
  setOpen: (boolean: boolean) => void;
}

const InputList: React.FC<InputListProps> = ({ setOpen }) => {
  const { boardId } = useBoard();
  const [name, setName] = useState("");
  const { optimisticAddList, finishAddOptimisticOperation } = useList();

  const handleBtnConfirm = async () => {
    if (!name) return;

    const data = {
      idBoard: boardId,
      name: name,
    };
    await optimisticAddList(name);
    setName("");
    setOpen(false);
    await createFetch(apiUrlHelper(`/lists`), data);
    finishAddOptimisticOperation();
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(e.target.value);
  };

  const handleClose = () => setOpen(false);

  return (
    <Input
      placeholder={"Enter a title of this list"}
      buttonText={"Add list"}
      onChange={handleOnChange}
      handleSave={handleBtnConfirm}
      handleClose={handleClose}
    ></Input>
  );
};

export default InputList;
