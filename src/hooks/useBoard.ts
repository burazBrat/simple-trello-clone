import { useContext } from "react";
import BoardContext from "../contexts/BoardContext";

export default function useBoard() {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
}
