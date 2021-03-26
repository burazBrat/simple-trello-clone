import React from "react";
import { Board } from "../model/Board";

export interface BoardContextValue {
  boardId: string;
  setBoardId: (boardId: string) => void;
  boards: Board[];
  optimisticAddBoard: (name: string) => void;
  finishAddOptimisticOperation: () => void;
  optimisticRemoveBoard: (idBoard: string) => void;
  finishRemoveOptimisticOperation: (status: number) => void;
}

export const defaultValue: BoardContextValue = {
  boardId: "",
  setBoardId: () => {},
  boards: [],
  optimisticAddBoard: (name: string) => {},
  finishAddOptimisticOperation: () => {},
  optimisticRemoveBoard: (idBoard: string) => {},
  finishRemoveOptimisticOperation: (status: number) => {},
};

export default React.createContext<BoardContextValue>(defaultValue);
