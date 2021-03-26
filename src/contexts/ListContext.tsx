import React from "react";
import { List } from "../model/List";

export interface ListContextValue {
  lists: List[];
  makeListApiCall: () => void;
  optimisticAddList: (name: string) => void;
  finishAddOptimisticOperation: () => void;
  optimisticRemoveList: (idList: string) => void;
  finishRemoveOptimisticOperation: (status: number) => void;
}

export const defaultValue: ListContextValue = {
  lists: [],
  makeListApiCall: () => {},
  optimisticAddList: (name: string) => {},
  finishAddOptimisticOperation: () => {},
  optimisticRemoveList: (idList: string) => {},
  finishRemoveOptimisticOperation: (status: number) => {},
};

export default React.createContext<ListContextValue>(defaultValue);
