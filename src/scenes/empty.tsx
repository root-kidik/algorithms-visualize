import { makeScene2D } from "@motion-canvas/2d";
import { Direction, slideTransition } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  view.add(<> </>);
  yield* slideTransition(Direction.Right);
});
