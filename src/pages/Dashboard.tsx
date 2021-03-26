import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { Grid, Badge, Card, CardHeader, IconButton } from "@material-ui/core";
import useBoard from "../hooks/useBoard";
import InputBoardContainer from "../components/board/InputBoardContainer";
import { apiUrlHelper } from "../utils/urlHelper";
import { deleteFetch } from "../services/delete";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "blue",
    width: "100%",
    overflowY: "auto",
    flexGrow: 1,
  },
  grid: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    color: "white",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const {
    boards,
    setBoardId,
    optimisticRemoveBoard,
    finishRemoveOptimisticOperation,
  } = useBoard();
  const history = useHistory();

  const openBoard = (idBoard: string) => {
    setBoardId(idBoard);
    history.push(`/board/${idBoard}`);
  };

  const deleteBtnConfirm = async (boardId: string) => {
    await optimisticRemoveBoard(boardId);
    const { status } = await deleteFetch(apiUrlHelper(`/boards/${boardId}`));
    await finishRemoveOptimisticOperation(status);
  };

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Dashboard</h1>
      <Grid container spacing={3} className={classes.grid}>
        {boards.map((board) => {
          return (
            <Grid item xs={3} key={board.id}>
              <Card>
                <CardHeader
                  action={
                    <div>
                      <IconButton
                        aria-label="settings"
                        onClick={() => deleteBtnConfirm(board.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  }
                  title={
                    <Badge
                      color="secondary"
                      onClick={() => openBoard(board.id)}
                    >
                      {board.name}
                    </Badge>
                  }
                />
              </Card>
            </Grid>
          );
        })}

        <Grid item xs={3}>
          <InputBoardContainer />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
