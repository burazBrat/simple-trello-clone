import React, { useEffect, useState } from "react";
import BoardContext, { defaultValue } from "../contexts/BoardContext";
import { apiUrlHelper } from "../utils/urlHelper";
import { Board } from "../model/Board";
import { Organization } from "../model/Organization";
import { readListFetch } from "../services/read";

export interface BoardProviderProps {
  children: React.ReactFragment;
}

const dummyBoardId = "999";

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
  const [boardId, setBoardId] = useState<string>(defaultValue.boardId);
  const [boards, setBoards] = useState<Board[]>(defaultValue.boards);
  const [backupBoards, setBackupBoards] = useState<Board[]>([]);

  async function fetchAPI() {
    const username = "ivanmihajlov5";

    const organizations: Organization[] = await readListFetch<Board>(
      apiUrlHelper(`/members/${username}/organizations`)
    );

    const boards: Board[] = (
      await Promise.all(
        organizations.map((organization) =>
          readListFetch<Board>(
            apiUrlHelper(`/organizations/${organization.id}/boards`)
          )
        )
      )
    ).flat();

    setBoards(boards);
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  const optimisticAddBoard = async (name: string) => {
    setBackupBoards(boards);
    setBoards(
      [...boards, { id: dummyBoardId, name: name }].sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
    );
  };

  const finishAddOptimisticOperation = async () => {
    await fetchAPI();
    setBackupBoards([]);
  };

  const optimisticRemoveBoard = async (idBoard: string) => {
    setBackupBoards(boards);
    const updatedBoards = boards.filter((board) => board.id !== idBoard);
    setBoards(updatedBoards);
  };

  const finishRemoveOptimisticOperation = async (status: number) => {
    if (status !== 200) {
      setBoards(backupBoards);
      setBackupBoards([]);
      await fetchAPI();
    }
  };

  const context = {
    boardId,
    setBoardId,
    boards,
    optimisticAddBoard,
    finishAddOptimisticOperation,
    optimisticRemoveBoard,
    finishRemoveOptimisticOperation,
  };
  return (
    <BoardContext.Provider value={context}>{children}</BoardContext.Provider>
  );
};
