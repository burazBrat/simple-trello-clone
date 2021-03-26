import React, { useEffect, useState } from "react";
import { Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { apiUrlHelper } from "../../utils/urlHelper";
import { Comment as CommentModel } from "../../model/Comment";
import UpdateComment from "./UpdateComment";
import { deleteFetch } from "../../services/delete";

interface CommentContainerProps {
  idCard: string;
  comment: CommentModel;
  comments: CommentModel[];
  setComments: (comments: CommentModel[]) => void;
}

const useStyle = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    flexGrow: 1,
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
}));

const CommentContainer: React.FC<CommentContainerProps> = ({
  idCard,
  comment,
  comments,
  setComments,
}) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(comment.text);

  useEffect(() => {
    setText(comment.text);
  }, [comment]);

  const deleteBtnConfirm = async () => {
    async function fetchAPI() {
      await deleteFetch(
        apiUrlHelper(`/cards/${idCard}/actions/${comment.id}/comments`)
      );
    }

    await fetchAPI();
    setComments(comments.filter((x) => x.id !== comment.id));
    setText("");
  };

  return (
    <div>
      {!open && (
        <div className={classes.root}>
          <Typography className={classes.text}>{text}</Typography>
          <div>
            <IconButton onClick={() => setOpen(!open)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={deleteBtnConfirm}>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      )}
      {open && (
        <UpdateComment
          idCard={idCard}
          comment={comment}
          comments={comments}
          setComments={setComments}
          setOpen={setOpen}
          open={open}
        ></UpdateComment>
      )}
    </div>
  );
};

export default CommentContainer;
