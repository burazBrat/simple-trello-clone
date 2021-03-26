import { DragAndDropPos } from "../model/DragAndDropPos";

export const getDragAndDropIndex = (
  sourceIndex: number,
  destinationIndex: number,
  dragAndDropPos: DragAndDropPos
) => {
  if (destinationIndex === 0) return 0;

  if (destinationIndex > sourceIndex && dragAndDropPos === DragAndDropPos.Top)
    return destinationIndex - 1;

  if (
    destinationIndex > sourceIndex &&
    dragAndDropPos === DragAndDropPos.Bottom
  )
    return destinationIndex;

  if (
    destinationIndex < sourceIndex &&
    dragAndDropPos === DragAndDropPos.Bottom
  )
    return destinationIndex + 1;

  if (
    destinationIndex > sourceIndex &&
    dragAndDropPos === DragAndDropPos.Middle
  )
    return destinationIndex - 1;

  if (
    destinationIndex < sourceIndex &&
    dragAndDropPos === DragAndDropPos.Middle
  )
    return destinationIndex;

  return destinationIndex;
};
