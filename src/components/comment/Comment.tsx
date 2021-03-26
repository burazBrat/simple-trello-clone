import React, { ChangeEvent } from "react";
import { Paper, Button, TextField, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, fade } from "@material-ui/core/styles";

interface CommentProps {
  placeholder: string;
  text: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSave: () => void;
  handleClose: () => void;
  isInputButtons: boolean;
}

const useStyle = makeStyles((theme) => ({
  card: {
    width: "280px",
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(1),
  },
  btnConfirm: {
    background: "#5AAC44",
    color: "#fff",
    "&:hover": {
      background: fade("#5AAC44", 0.75),
    },
  },
  confirm: {
    margin: theme.spacing(0, 1, 1, 1),
  },
}));

const Comment: React.FC<CommentProps> = ({
  placeholder,
  text,
  onChange,
  handleSave,
  handleClose,
  isInputButtons,
}) => {
  const classes = useStyle();

  return (
    <div>
      <div className={classes.card}>
        <Paper>
          <TextField
            autoFocus
            multiline
            fullWidth
            inputProps={{
              classes: classes.input,
            }}
            placeholder={placeholder}
            value={text}
            onChange={onChange}
          />
        </Paper>
      </div>
      <div className={classes.confirm}>
        {isInputButtons && (
          <InputButtons
            text={text}
            handleSave={handleSave}
            handleClose={handleClose}
          ></InputButtons>
        )}
        {!isInputButtons && (
          <UpdateButtons
            text={text}
            handleSave={handleSave}
            handleClose={handleClose}
          ></UpdateButtons>
        )}
      </div>
    </div>
  );
};

interface InputButtonsProps {
  text: string;
  handleSave: () => void;
  handleClose: () => void;
}

const InputButtons: React.FC<InputButtonsProps> = ({
  text,
  handleSave,
  handleClose,
}) => {
  const classes = useStyle();

  if (text.length === 0) return null;

  return (
    <div>
      <Button className={classes.btnConfirm} onClick={handleSave}>
        Save
      </Button>
      <IconButton onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </div>
  );
};

interface UpdateButtonsProps {
  text: string;
  handleSave: () => void;
  handleClose: () => void;
}

const UpdateButtons: React.FC<UpdateButtonsProps> = ({
  text,
  handleSave,
  handleClose,
}) => {
  const classes = useStyle();

  const isEmptyText = text.length === 0;

  return (
    <div>
      <Button
        disabled={isEmptyText}
        className={classes.btnConfirm}
        onClick={handleSave}
      >
        Save
      </Button>
      <IconButton onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </div>
  );
};

export default Comment;
