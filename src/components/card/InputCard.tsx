import React, { ChangeEvent, useState } from "react";
import Input from "../Input";
import useCard from "../../hooks/useCard";
import { createFetch } from "../../services/create";
import { apiUrlHelper } from "../../utils/urlHelper";

interface InputCardProps {
  setOpen: (boolean: boolean) => void;
  idList: string;
}

const InputCard: React.FC<InputCardProps> = ({ setOpen, idList }) => {
  const [name, setName] = useState("");
  const { optimisticAddCard, finishAddOptimisticOperation } = useCard();

  const handleBtnConfirm = async () => {
    if (!name) return;

    async function fetchAPI() {
      const data = {
        idList: idList,
        name: name,
      };
      await optimisticAddCard(name);
      setName("");
      setOpen(false);
      await createFetch(apiUrlHelper(`/cards`), data);
      await finishAddOptimisticOperation();
    }

    await fetchAPI();
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(e.target.value);
  };

  const handleClose = () => setOpen(false);

  return (
    <Input
      placeholder={"Enter a title of this card"}
      buttonText={"Add card"}
      onChange={handleOnChange}
      handleSave={handleBtnConfirm}
      handleClose={handleClose}
    ></Input>
  );
};

export default InputCard;
