import React, { useState } from "react";
import { Typography, InputBase, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { apiUrlHelper } from "../../utils/urlHelper";
import useList from "../../hooks/useList";
import { updateFetch } from "../../services/update";

interface TitleProps {
  name: string;
  idList: string;
}

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editableTitleContainer: {
    margin: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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

const ListTitle: React.FC<TitleProps> = ({ name, idList }) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(name);
  const { optimisticRemoveList, finishRemoveOptimisticOperation } = useList();

  const deleteBtnConfirm = async () => {
    async function fetchAPI() {
      const data = {
        value: true,
      };

      await optimisticRemoveList(idList);
      const { status } = await updateFetch(
        apiUrlHelper(`/lists/${idList}/closed`),
        data
      );
      await finishRemoveOptimisticOperation(status);
    }
    await fetchAPI();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const updateTitleConfirm = async () => {
    if (!title) return;

    async function fetchAPI() {
      const data = {
        name: title,
      };
      await updateFetch(apiUrlHelper(`/lists/${idList}`), data);
    }
    await fetchAPI();
    setOpen(!open);
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
          <IconButton onClick={deleteBtnConfirm}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default ListTitle;
