import React, { ChangeEvent } from "react";
import { Paper, InputBase, Button, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles, fade } from "@material-ui/core/styles";

interface InputProps {
  placeholder: string;
  buttonText: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSave: () => void;
  handleClose: () => void;
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

const InputCard: React.FC<InputProps> = ({
  placeholder,
  buttonText,
  onChange,
  handleSave,
  handleClose,
}) => {
  const classes = useStyle();

  return (
    <div>
      <div className={classes.card}>
        <Paper>
          <InputBase
            autoFocus
            multiline
            fullWidth
            inputProps={{
              classes: classes.input,
            }}
            placeholder={placeholder}
            onChange={onChange}
          />
        </Paper>
      </div>
      <div className={classes.confirm}>
        <Button className={classes.btnConfirm} onClick={handleSave}>
          {buttonText}
        </Button>
        <IconButton onClick={handleClose}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default InputCard;
