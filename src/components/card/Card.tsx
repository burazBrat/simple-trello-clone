import React from "react";
import { IconButton, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { Draggable } from "react-beautiful-dnd";
import { Card as CardModel } from "../../model/Card";
import { apiUrlHelper } from "../../utils/urlHelper";
import useCard from "../../hooks/useCard";
import { useHistory, useRouteMatch } from "react-router-dom";
import { updateFetch } from "../../services/update";

interface CardProps {
  card: CardModel;
  index: number;
}

const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editableTitleContainer: {
    margin: theme.spacing(1),
    display: "flex",
  },
}));

const Card: React.FC<CardProps> = ({ card, index }) => {
  const classes = useStyle();
  const { optimisticRemoveCard, finishRemoveOptimisticOperation } = useCard();
  const history = useHistory();
  let { url } = useRouteMatch();

  const deleteBtnConfirm = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const data = {
      value: true,
    };
    await optimisticRemoveCard(card.id);
    const { status } = await updateFetch(
      apiUrlHelper(`/card/${card.id}/closed`),
      data
    );
    await finishRemoveOptimisticOperation(status);
  };

  const openCardDialog = (idCard: string) => {
    history.push(`${url}/${idCard}`);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div>
            <Paper
              className={classes.card}
              onClick={() => openCardDialog(card.id)}
            >
              <Typography>{card.name}</Typography>
              <IconButton onClick={(e) => deleteBtnConfirm(e)}>
                <DeleteIcon />
              </IconButton>
            </Paper>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
