import React, { useEffect, useState } from "react";
import { Dialog, Divider } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CardTitle from "../components/card/CardTitle";
import InputComment from "../components/comment/InputComment";
import { apiUrlHelper, apiUrlHelperWithFilter } from "../utils/urlHelper";
import { Card } from "../model/Card";
import { Comment as CommentModel } from "../model/Comment";
import { readListFetch, readSingleElementFetch } from "../services/read";
import CommentContainer from "../components/comment/CommentContainer";

const useStyle = makeStyles((theme) => ({
  root: {
    color: "red",
    paddingTop: "100px",
    width: "500px",
    height: "100%",
  },
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
    minWidth: "60vh",
    maxWidth: "100vh",
  },
}));

const CardPage = () => {
  const classes = useStyle();
  const { idCard } = useParams<Record<string, string | undefined>>();
  const history = useHistory();
  const [name, setName] = useState("");
  const [comments, setComments] = useState<CommentModel[]>([]);

  useEffect(() => {
    async function fetchAPI() {
      const card: Card = await readSingleElementFetch(
        apiUrlHelper(`/cards/${idCard}`)
      );
      setName(card.name);

      const data: CommentModel[] = (
        await readListFetch<any>(
          apiUrlHelperWithFilter(`/cards/${idCard}/actions`, `limit=10`)
        )
      )
        .filter((x) => x.type === "commentCard")
        .map((x) => ({ id: x.id, text: x.data.text }));
      setComments(data);
    }

    if (idCard) fetchAPI();
  }, [setName, idCard]);

  if (!idCard) return null;

  const handleClose = () => history.goBack();

  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  return (
    <div className={classes.root}>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        onClose={handleClose}
        open={true}
      >
        <CardTitle name={name} idCard={idCard} closeBtnConfirm={handleClose} />
        <InputComment
          idCard={idCard}
          comments={comments}
          setComments={setComments}
        ></InputComment>
        <DialogContent dividers>
          {comments.map((x) => (
            <div key={x.id}>
              <CommentContainer
                idCard={idCard}
                comment={x}
                comments={comments}
                setComments={setComments}
              />
              <Divider />
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CardPage;
