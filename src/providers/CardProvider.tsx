import React, { useEffect, useState } from "react";
import CardContext, {
  defaultValue,
  CardContextValue,
} from "../contexts/CardContext";
import useList from "../hooks/useList";
import { Card } from "../model/Card";
import { List } from "../model/List";
import { getDragAndDropIndex } from "../utils/dragAnddropHelper";
import { apiUrlHelper } from "../utils/urlHelper";
import { DragAndDropPos } from "../model/DragAndDropPos";
import { readListFetch } from "../services/read";

export interface CardProviderProps {
  children: React.ReactFragment;
}

const dummyCardId = "999";
const dummyListId = "999";

export const CardProvider: React.FC<CardProviderProps> = ({ children }) => {
  const [cards, setCards] = useState<Card[]>(defaultValue.cards);
  const [backupCards, setBackupCards] = useState<Card[]>([]);
  const { lists } = useList();

  async function fetchAPI(lists: List[]) {
    const cards: Card[] = (
      await Promise.all(
        lists.filter(x => x.id !== dummyListId).map((list) =>
          readListFetch<Card>(apiUrlHelper(`/lists/${list.id}/cards`))
        )
      )
    ).flat();

    const makeUrl = (url: string) =>
      window.location.protocol +
      window.location.host +
      url.replace("https://trello.com", "");

    setCards(cards.map((x) => ({ ...x, url: makeUrl(x.shortUrl) })));
  }

  useEffect(() => {
    fetchAPI(lists);
  }, [lists]);

  const makeCardApiCallForAllCards = () => {
    fetchAPI(lists);
  };

  const dragAndDropRearrange = (
    card: Card,
    sourceIndex: number,
    destinationIndex: number
  ) => {
    const newCards = [...cards];
    newCards.splice(sourceIndex, 1);
    newCards.splice(destinationIndex, 0, card);
    setCards(newCards);
  };

  const dragAndDropRearrangeList = (
    card: Card,
    sourceIndex: number,
    destinationIndex: number,
    idList: string,
    dragAndDropPos: DragAndDropPos
  ) => {
    const newCards = [...cards];
    newCards.splice(sourceIndex, 1);
    const newCard = { ...card, idList: idList };
    newCards.splice(
      getDragAndDropIndex(sourceIndex, destinationIndex, dragAndDropPos),
      0,
      newCard
    );
    setCards(newCards);
  };

  const dragAndDropEmptyList = (
    card: Card,
    sourceIndex: number,
    idList: string
  ) => {
    const newCards = [...cards];
    newCards.splice(sourceIndex, 1);
    const newCard = { ...card, idList: idList };
    newCards.splice(0, 0, newCard);
    setCards(newCards);
  };

  const getCardsByListId = (idList: string) =>
    cards.filter((x) => x.idList === idList);

  const optimisticAddCard = async (name: string) => {
    setBackupCards(cards);
    const data = {
      id: dummyCardId,
      name: name,
      pos: 0,
      idList: "",
      shortUrl: "",
      url: "",
    };
    setCards([...cards, data]);
  };

  const finishAddOptimisticOperation = async () => {
    await fetchAPI(lists);
    setBackupCards([]);
  };

  const optimisticRemoveCard = async (idCard: string) => {
    setBackupCards(cards);
    const updatedCards = cards.filter((card) => card.id !== idCard);
    setCards(updatedCards);
  };

  const finishRemoveOptimisticOperation = async (status: number) => {
    if (status !== 200) {
      setCards(backupCards);
      setBackupCards([]);
    }
    await fetchAPI(lists);
  };

  const context: CardContextValue = {
    cards,
    makeCardApiCallForAllCards,
    getCardsByListId,
    dragAndDropRearrange,
    dragAndDropRearrangeList,
    dragAndDropEmptyList,
    optimisticAddCard,
    finishAddOptimisticOperation,
    optimisticRemoveCard,
    finishRemoveOptimisticOperation,
  };
  return (
    <CardContext.Provider value={context}>{children}</CardContext.Provider>
  );
};
