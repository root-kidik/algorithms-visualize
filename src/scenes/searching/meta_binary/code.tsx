import { makeScene2D } from "@motion-canvas/2d";
import {
  Direction,
  all,
  finishScene,
  slideTransition,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  view.add(<> </>);

  view.opacity(0);
  yield* all(slideTransition(Direction.Right), view.opacity(1, 1));

  finishScene();
  yield* view.opacity(0, 1);
});
