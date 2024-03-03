import { makeScene2D } from "@motion-canvas/2d";
import { Reference } from "@motion-canvas/core";
import {
  Direction,
  all,
  createRef,
  finishScene,
  slideTransition,
  waitFor,
} from "@motion-canvas/core";
import { MyArray } from "../../../components/my_array";
import { greenColor, greyColor, redColor } from "../../../components/theme";
import { Key } from "../../../components/key";
import { MyText } from "../../../components/my_text";

function* search(
  array: Reference<MyArray>,
  key: Reference<Key>,
  begin: number,
  end: number,
  time: number = 1,
) {
  for (let i = begin; i < end; i++) {
    yield* array().setPositionDowner(key, array().arr[i], time);
    if (array().getArrTextKey(i) == "98") {
      yield* array().arr[i].fill(greenColor, time);
      yield* waitFor(time);
      break;
    } else {
      yield* array().arr[i].fill(redColor, time);
    }
  }
}

export default makeScene2D(function* (view) {
  const arr_layout = createRef<MyArray>();
  const key = createRef<Key>();
  const temp = createRef<Key>();
  const temp_text = createRef<MyText>();

  const count = 5;

  view.add(
    <MyArray count={count} ref={arr_layout}>
      <Key ref={key} text="98" fill={greenColor} />
      <Key ref={temp} textRef={temp_text} />
    </MyArray>,
  );
  yield* arr_layout().setPositionLeft(key, arr_layout().arr_first, 0);
  yield* arr_layout().setPositionLeft(temp, key(), 0);

  view.opacity(0);
  yield* all(slideTransition(Direction.Right), view.opacity(1, 1));

  yield* arr_layout().setPositionUpper(temp, arr_layout().arr_last);
  yield* temp_text().text("96", 1);

  yield* arr_layout().setPositionDowner(key, arr_layout().arr_last);

  yield* arr_layout().setArrTextKey(4, "98");
  yield* search(arr_layout, key, 0, 4);

  yield* view.opacity(0, 1);
  yield* arr_layout().setArrTextKey(3, "99", 0);
  yield* search(arr_layout, key, 0, 4, 0);
  yield* all(slideTransition(Direction.Right), view.opacity(1, 1));
  yield* view.opacity(1, 1);

  yield* search(arr_layout, key, 4, 5);
  yield* arr_layout().arr_last.fill(greyColor, 1);

  yield* all(temp_text().text("", 1), arr_layout().setArrTextKey(4, "96"));

  yield* waitFor(1);
  yield* arr_layout().arr_last.fill(redColor, 1);

  yield* waitFor(1);

  finishScene();
  yield* view.opacity(0, 1);
});
