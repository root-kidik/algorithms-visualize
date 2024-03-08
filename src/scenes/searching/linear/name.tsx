import { makeScene2D } from "@motion-canvas/2d";
import {
  Direction,
  all,
  finishScene,
  slideTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { Key } from "../../../components/key";

export default makeScene2D(function* (view) {
  view.add(<Key width={48 * 10} text="Linear search" />);

  view.opacity(0);
  yield* all(slideTransition(Direction.Right), view.opacity(1, 1));

  yield* waitFor(1);

  yield* waitUntil("end");

  finishScene();
  yield* view.opacity(0, 1);
});
