import React, { useEffect, useState } from "react";
import ListContext, {
  defaultValue,
  ListContextValue,
} from "../contexts/ListContext";
import useBoard from "../hooks/useBoard";
import { List } from "../model/List";
import { readListFetch } from "../services/read";
import { apiUrlHelper } from "../utils/urlHelper";

const dummyListId = "999";

export interface ListProviderProps {
  children: React.ReactFragment;
}

export const ListProvider: React.FC<ListProviderProps> = ({ children }) => {
  const [lists, setLists] = useState<List[]>(defaultValue.lists);
  const [backupLists, setBackupLists] = useState<List[]>([]);
  const { boardId, setBoardId } = useBoard();

  async function fetchAPI(boardId: string) {
    if (!boardId) return;

    let response = await readListFetch<List>(
      apiUrlHelper(`/boards/${boardId}/lists`)
    );
    setLists(response);
  }

  useEffect(() => {
    const pathname = window.location.pathname;

    if (pathname.includes("board")) {
      const numberOfChar =
        pathname.match(new RegExp("/", "g") || [])?.length ?? 0;

      if (numberOfChar === 2)
        setBoardId(pathname.slice(pathname.lastIndexOf("/") + 1));

      if (numberOfChar === 3) {
        const subPathname = pathname.replace("/", "");
        const c = subPathname.slice(
          subPathname.indexOf("/") + 1,
          subPathname.lastIndexOf("/")
        );
        setBoardId(c);
      }
    }
  }, [setBoardId]);

  useEffect(() => {
    fetchAPI(boardId);
  }, [boardId]);

  const makeListApiCall = () => {
    fetchAPI(boardId);
  };

  const optimisticAddList = async (name: string) => {
    setBackupLists(lists);
    setLists([{ id: dummyListId, name: name }, ...lists]);
  };

  const finishAddOptimisticOperation = async () => {
    await fetchAPI(boardId);
    setBackupLists([]);
  };

  const optimisticRemoveList = async (idList: string) => {
    setBackupLists(lists);
    const updatedLists = lists.filter((lists) => lists.id !== idList);
    setLists(updatedLists);
  };

  const finishRemoveOptimisticOperation = async (status: number) => {
    if (status !== 200) {
      setLists(backupLists);
      setBackupLists([]);
    }
    await fetchAPI(boardId);
  };

  const context: ListContextValue = {
    lists,
    makeListApiCall,
    optimisticAddList,
    finishAddOptimisticOperation,
    optimisticRemoveList,
    finishRemoveOptimisticOperation,
  };
  return (
    <ListContext.Provider value={context}>{children}</ListContext.Provider>
  );
};
