import React, { useEffect, useState } from "react";
import { Typography, InputBase, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { apiUrlHelper } from "../../utils/urlHelper";
import useCard from "../../hooks/useCard";
import { updateFetch } from "../../services/update";

interface TitleProps {
  name: string;
  idCard: string;
  closeBtnConfirm: () => void;
}

const useStyle = makeStyles((theme) => ({
  editableTitleContainer: {
    margin: theme.spacing(1),
    display: "flex",
  },
  editableTitle: {
    flexGrow: 1,
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  input: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    margin: theme.spacing(1),
    "&:focus": {
      background: "#ddd",
    },
  },
}));

const CardTitle: React.FC<TitleProps> = ({ name, idCard, closeBtnConfirm }) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(name);
  const { makeCardApiCallForAllCards } = useCard();

  useEffect(() => {
    setTitle(name);
  }, [name]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const updateTitleConfirm = async () => {
    if (!title) return;

    async function fetchAPI() {
      const data = {
        name: title,
      };
      await updateFetch(apiUrlHelper(`/cards/${idCard}`), data);
    }

    await fetchAPI();
    makeCardApiCallForAllCards();
    setOpen(!open);
  };

  const keyPressUpdateTitleConfirm = async (e: any) => {
    if (e.charCode === 13) {
      await updateTitleConfirm();
    }
  };

  return (
    <div>
      {open && (
        <div>
          <InputBase
            onChange={handleOnChange}
            autoFocus
            fullWidth
            value={title}
            inputProps={{
              className: classes.input,
            }}
            onBlur={updateTitleConfirm}
            onKeyPress={keyPressUpdateTitleConfirm}
          />
        </div>
      )}
      {!open && (
        <div className={classes.editableTitleContainer}>
          <Typography
            onClick={() => setOpen(!open)}
            className={classes.editableTitle}
          >
            {title}
          </Typography>
          <IconButton onClick={closeBtnConfirm}>
            <CloseIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default CardTitle;
