import { makeScene2D } from "@motion-canvas/2d";
import {
  Direction,
  all,
  createRef,
  finishScene,
  slideTransition,
} from "@motion-canvas/core";
import { Table } from "../../../components/table";

export default makeScene2D(function* (view) {
  const cols = [
    ["O", "Ω", "θ"],
    ["⏳", "logN", "1", "logN"],
    ["💾", "1", "1", "1"],
  ];

  const table = createRef<Table>();

  view.add(
    <>
      <Table ref={table} cols={cols} />
    </>,
  );

  view.opacity(0);
  yield* all(slideTransition(Direction.Right), view.opacity(1, 1));

  yield* table().showNext();

  finishScene();
  yield* view.opacity(0, 1);
});
