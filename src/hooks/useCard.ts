import { useContext } from "react";
import CardContext from "../contexts/CardContext";

export default function useCard() {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error("useCard must be used within a CardProvider");
  }
  return context;
}
