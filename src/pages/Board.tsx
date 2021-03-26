import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { DragDropContext } from "react-beautiful-dnd";
import InputListContainer from "../components/list/InputListContainer";
import useList from "../hooks/useList";
import useCard from "../hooks/useCard";
import { apiUrlHelper } from "../utils/urlHelper";
import { DragAndDropPos } from "../model/DragAndDropPos";
import CardPage from "./CardPage";
import List from "../components/list/List";
import { updateFetch } from "../services/update";

const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "blue",
    width: "100%",
    overflowY: "auto",
  },
  listContainer: {
    display: "flex",
  },
}));

const Board = () => {
  const classes = useStyle();
  const { lists, makeListApiCall } = useList();
  const {
    getCardsByListId,
    cards,
    dragAndDropRearrange,
    dragAndDropRearrangeList,
    dragAndDropEmptyList,
  } = useCard();
  let { path } = useRouteMatch();

  const updatePosition = async (id: string, data: any) => {
    async function fetchAPI() {
      await updateFetch(apiUrlHelper(`/cards/${id}`), data);
      makeListApiCall();
    }

    await fetchAPI();
  };

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const cardsFromCurrentList = getCardsByListId(source.droppableId);

      if (destination.index === 0) {
        const destinationCard = cardsFromCurrentList[destination.index];
        const pos = destinationCard.pos / 2;

        const sourceCard = cardsFromCurrentList[source.index];

        const data = {
          pos: pos,
        };

        updatePosition(sourceCard.id, data);

        const sourceGlobalIndex = cards.indexOf(sourceCard);
        const destinationGlobalIndex = cards.indexOf(destinationCard);

        dragAndDropRearrange(
          sourceCard,
          sourceGlobalIndex,
          destinationGlobalIndex
        );
      } else if (destination.index === cardsFromCurrentList.length - 1) {
        const destinationCard = cardsFromCurrentList[destination.index];
        const pos = destinationCard.pos * 2;

        const sourceCard = cardsFromCurrentList[source.index];

        const data = {
          pos: pos,
        };

        updatePosition(sourceCard.id, data);

        const sourceGlobalIndex = cards.indexOf(sourceCard);
        const destinationGlobalIndex = cards.indexOf(destinationCard);

        dragAndDropRearrange(
          sourceCard,
          sourceGlobalIndex,
          destinationGlobalIndex
        );
      } else {
        const destinationCard = cardsFromCurrentList[destination.index];

        const sourceCard = cardsFromCurrentList[source.index];

        const sourceGlobalIndex = cards.indexOf(sourceCard);
        const destinationGlobalIndex = cards.indexOf(destinationCard);

        const index =
          destinationGlobalIndex > sourceGlobalIndex
            ? destination.index + 1
            : destination.index - 1;
        const destinationNextToCard = cardsFromCurrentList[index];
        const pos = (destinationCard.pos + destinationNextToCard.pos) / 2;

        const data = {
          pos: pos,
        };

        updatePosition(sourceCard.id, data);
        dragAndDropRearrange(
          sourceCard,
          sourceGlobalIndex,
          destinationGlobalIndex
        );
      }
    }

    if (source.droppableId !== destination.droppableId) {
      const sourceCurrentList = getCardsByListId(source.droppableId);
      const destinationCurrentList = getCardsByListId(destination.droppableId);

      if (destinationCurrentList.length === 0) {
        const sourceCard = sourceCurrentList[source.index];

        const data = {
          idList: destination.droppableId,
        };

        updatePosition(sourceCard.id, data);

        const sourceGlobalIndex = cards.indexOf(sourceCard);

        dragAndDropEmptyList(
          sourceCard,
          sourceGlobalIndex,
          destination.droppableId
        );
      } else if (destination.index === 0) {
        const destinationCard = destinationCurrentList[destination.index];
        const pos = destinationCard.pos / 2;

        const sourceCard = sourceCurrentList[source.index];

        const data = {
          pos: pos,
          idList: destination.droppableId,
        };

        updatePosition(sourceCard.id, data);

        const sourceGlobalIndex = cards.indexOf(sourceCard);
        const destinationGlobalIndex = cards.indexOf(destinationCard);

        dragAndDropRearrangeList(
          sourceCard,
          sourceGlobalIndex,
          destinationGlobalIndex,
          destination.droppableId,
          DragAndDropPos.Top
        );
      } else if (destination.index === destinationCurrentList.length) {
        const destinationCard = destinationCurrentList[destination.index - 1];
        const pos = destinationCard.pos * 2;

        const sourceCard = sourceCurrentList[source.index];

        const data = {
          pos: pos,
          idList: destination.droppableId,
        };

        updatePosition(sourceCard.id, data);

        const sourceGlobalIndex = cards.indexOf(sourceCard);
        const destinationGlobalIndex = cards.indexOf(destinationCard) + 1;

        dragAndDropRearrangeList(
          sourceCard,
          sourceGlobalIndex,
          destinationGlobalIndex,
          destination.droppableId,
          DragAndDropPos.Bottom
        );
      } else {
        const destinationCard = destinationCurrentList[destination.index];
        const sourceCard = sourceCurrentList[source.index];

        const sourceGlobalIndex = cards.indexOf(sourceCard);
        const destinationGlobalIndex = cards.indexOf(destinationCard);

        const index =
          destinationGlobalIndex > sourceGlobalIndex
            ? destination.index - 1
            : destination.index - 1;
        const destinationNextToCard = destinationCurrentList[index];
        const pos = (destinationCard.pos + destinationNextToCard.pos) / 2;

        const data = {
          pos: pos,
          idList: destination.droppableId,
        };

        updatePosition(sourceCard.id, data);
        dragAndDropRearrangeList(
          sourceCard,
          sourceGlobalIndex,
          destinationGlobalIndex,
          destination.droppableId,
          DragAndDropPos.Middle
        );
      }
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          className={classes.root}
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className={classes.listContainer}>
            {lists.map((list) => {
              return (
                <div key={list.id}>
                  <List list={list} />
                </div>
              );
            })}
            <InputListContainer />
          </div>
        </div>
      </DragDropContext>

      <Switch>
        <Route path={`${path}/:idCard`}>
          <CardPage />
        </Route>
      </Switch>
    </div>
  );
};

export default Board;
