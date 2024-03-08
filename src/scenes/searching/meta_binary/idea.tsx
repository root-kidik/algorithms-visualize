import { makeScene2D } from "@motion-canvas/2d";
import {
  Direction,
  all,
  createRef,
  finishScene,
  slideTransition,
} from "@motion-canvas/core";
import { greenColor } from "../../../components/theme";
import { NamedKey } from "../../../components/named_key";
import { NamedMyArray } from "../../../components/named_my_array";

export default makeScene2D(function* (view) {
  const arr_layout = createRef<NamedMyArray>();
  const key = createRef<NamedKey>();

  const count = 10;

  view.add(
    <NamedMyArray count={count} ref={arr_layout}>
      <NamedKey ref={key} text="7" namedText="1111" fill={greenColor} />
    </NamedMyArray>,
  );
  yield* arr_layout().setPositionLeft(key, arr_layout().arr_first, 0);

  view.opacity(0);
  yield* all(slideTransition(Direction.Right), view.opacity(1, 1));

  finishScene();
  yield* view.opacity(0, 1);
});
