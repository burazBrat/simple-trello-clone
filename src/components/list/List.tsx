import React from "react";
import { Paper, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Droppable } from "react-beautiful-dnd";
import ListTitle from "./ListTitle";
import Card from "../card/Card";
import { List as ListModel } from "../../model/List";
import useCard from "../../hooks/useCard";
import InputCardContainer from "../card/InputCardContainer";

interface ListProps {
  list: ListModel;
}

const useStyle = makeStyles((theme) => ({
  root: {
    minWidth: "300px",
    maxWidth: "400px",
    backgroundColor: "#EBECF0",
    marginLeft: theme.spacing(1),
  },
  cardContainer: {
    marginTop: theme.spacing(4),
  },
}));

const List: React.FC<ListProps> = ({ list }) => {
  const classes = useStyle();
  const { getCardsByListId } = useCard();
  const lists = getCardsByListId(list.id);

  return (
    <div>
      <Paper className={classes.root}>
        <CssBaseline />
        <ListTitle name={list.name} idList={list.id} />
        <Droppable droppableId={list.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={classes.cardContainer}
            >
              {lists.map((card, index) => {
                return (
                  <div key={card.id}>
                    <Card card={card} index={index} />
                  </div>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <InputCardContainer idList={list.id} />
      </Paper>
    </div>
  );
};

export default List;
