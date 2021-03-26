import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";

interface InputContainerProps {
  inputComponent: any;
  text: string;
  open: boolean;
  handleClose: () => void;
}

const useStyle = makeStyles((theme) => ({
  root: {
    width: "300px",
    marginTop: theme.spacing(1),
  },
  addCard: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
    background: "#EBECF0",
    "&:hover": {
      backgroundColor: fade("#000", 0.25),
    },
  },
}));

const InputContainer: React.FC<InputContainerProps> = ({
  inputComponent,
  text,
  open,
  handleClose,
}) => {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      {open && <div>{inputComponent}</div>}
      {!open && (
        <Paper className={classes.addCard} onClick={handleClose}>
          <Typography>{text}</Typography>
        </Paper>
      )}
    </div>
  );
};

export default InputContainer;
