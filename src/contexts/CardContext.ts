import React from "react";
import { Card } from "../model/Card";
import { DragAndDropPos } from "../model/DragAndDropPos";

export interface CardContextValue {
  cards: Card[];
  makeCardApiCallForAllCards: () => void;
  getCardsByListId: (idList: string) => Card[];
  dragAndDropRearrange: (
    card: Card,
    sourceIndex: number,
    destinationIndex: number
  ) => void;
  dragAndDropRearrangeList: (
    card: Card,
    sourceIndex: number,
    destinationIndex: number,
    idList: string,
    dragAndDropPos: DragAndDropPos
  ) => void;
  dragAndDropEmptyList: (
    card: Card,
    sourceIndex: number,
    idList: string
  ) => void;
  optimisticAddCard: (name: string) => void;
  finishAddOptimisticOperation: () => void;
  optimisticRemoveCard: (idCard: string) => void;
  finishRemoveOptimisticOperation: (status: number) => void;
}

export const defaultValue: CardContextValue = {
  cards: [],
  makeCardApiCallForAllCards: () => {},
  getCardsByListId: (idList: string) => {
    return [];
  },
  dragAndDropRearrange: (
    card: Card,
    sourceIndex: number,
    destinationIndex: number
  ) => {},
  dragAndDropRearrangeList: (
    card: Card,
    sourceIndex: number,
    destinationIndex: number,
    idList: string,
    dragAndDropPos: DragAndDropPos
  ) => {},
  dragAndDropEmptyList: (card: Card, sourceIndex: number, idList: string) => {},
  optimisticAddCard: (name: string) => {},
  finishAddOptimisticOperation: () => {},
  optimisticRemoveCard: (idCard: string) => {},
  finishRemoveOptimisticOperation: (status: number) => {},
};

export default React.createContext<CardContextValue>(defaultValue);
