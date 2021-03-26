import React, { ChangeEvent, useState } from "react";
import { apiUrlHelper } from "../../utils/urlHelper";
import { Comment as CommentModel } from "../../model/Comment";
import { updateFetch } from "../../services/update";
import Comment from "./Comment";

interface UpdateCommentProps {
  idCard: string;
  comment: CommentModel;
  comments: CommentModel[];
  setComments: (comments: CommentModel[]) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const UpdateComment: React.FC<UpdateCommentProps> = ({
  idCard,
  comment,
  comments,
  setComments,
  setOpen,
  open,
}) => {
  const [text, setText] = useState(comment.text);

  const handleBtnConfirm = async () => {
    async function fetchAPI() {
      const data = {
        text: text,
      };
      const { response } = await updateFetch(
        apiUrlHelper(`/cards/${idCard}/actions/${comment.id}/comments`),
        data
      );

      const index = comments.indexOf(comment);

      setComments([
        ...comments.slice(0, index),
        { id: response.id, text: response.data.text },
        ...comments.slice(index + 1, comments.length),
      ]);
    }

    await fetchAPI();
    setOpen(!open);
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };

  const handleClose = () => setOpen(!open);

  return (
    <Comment
      placeholder={comment.text}
      text={text}
      onChange={handleOnChange}
      handleSave={handleBtnConfirm}
      handleClose={handleClose}
      isInputButtons={false}
    ></Comment>
  );
};

export default UpdateComment;
