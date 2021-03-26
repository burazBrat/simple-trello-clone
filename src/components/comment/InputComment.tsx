import React, { ChangeEvent, useState } from "react";
import { apiUrlHelper } from "../../utils/urlHelper";
import { Comment as CommentModel } from "../../model/Comment";
import { createFetch } from "../../services/create";
import Comment from "./Comment";

interface InputCommentProps {
  idCard: string;
  comments: CommentModel[];
  setComments: (comments: CommentModel[]) => void;
}

const InputComment: React.FC<InputCommentProps> = ({
  idCard,
  comments,
  setComments,
}) => {
  const [text, setText] = useState<string>("");

  const handleBtnConfirm = async () => {
    if (!text) return;

    async function fetchAPI() {
      const data = {
        text: text,
      };
      const { response } = await createFetch(
        apiUrlHelper(`/cards/${idCard}/actions/comments`),
        data
      );
      setComments([...comments, { id: response.id, text: response.data.text }]);
    }

    await fetchAPI();
    setText("");
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };

  const closeBtnConfirm = async () => setText("");

  return (
    <Comment
      placeholder={"Write a comment..."}
      text={text}
      onChange={handleOnChange}
      handleSave={handleBtnConfirm}
      handleClose={closeBtnConfirm}
      isInputButtons={true}
    ></Comment>
  );
};

export default InputComment;
