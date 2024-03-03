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
  l_: Reference<Key>,
  r_: Reference<Key>,
  m_: Reference<Key>,
  array: Reference<MyArray>,
  key: Reference<Key>,
  answer: number,
  time: number = 1,
) {
  let l = 0;
  yield* array().setPositionUpper(l_, array().arr_first);
  let r = array().arr.length - 1;
  yield* array().setPositionUpper(r_, array().arr_last);

  while (l <= r) {
    let m = Math.floor((l + r) / 2);
    yield* array().setPositionUpper(m_, array().arr[m]);

    yield* array().setPositionDowner(key, array().arr[m], time);
    if (Number(array().getArrTextKey(m)) == answer) {
      for (let i = l; i < m; i++) yield array().arr[i].opacity(0.25, 1);
      for (let i = r; i > m; i--) yield array().arr[i].opacity(0.25, 1);

      yield* array().arr[m].fill(greenColor, time);
      yield* waitFor(time);
      return;
    }

    yield* array().arr[m].fill(redColor, time);
    if (answer > Number(array().getArrTextKey(m))) {
      for (let i = l; i < m; i++) yield array().arr[i].opacity(0.25, 1);
      l = m + 1;
      yield* array().setPositionUpper(l_, array().arr[l]);
    } else {
      for (let i = r; i > m; i--) yield array().arr[i].opacity(0.25, 1);
      r = m - 1;
      yield* array().setPositionUpper(r_, array().arr[r]);
    }
  }
}

export default makeScene2D(function* (view) {
  const arr_layout = createRef<MyArray>();
  const key = createRef<Key>();
  const key_text = createRef<MyText>();
  const l = createRef<Key>();
  const r = createRef<Key>();
  const m = createRef<Key>();

  const count = 10;

  view.add(
    <MyArray count={count} ref={arr_layout}>
      <Key ref={key} text="7" textRef={key_text} fill={greenColor} />
      <Key ref={l} width={80} height={80} textSize={32} text="l" />
      <Key ref={r} width={80} height={80} textSize={32} text="r" />
      <Key ref={m} width={80} height={80} textSize={32} text="m" />
    </MyArray>,
  );
  yield* arr_layout().setPositionLeft(key, arr_layout().arr_first, 0);
  yield* arr_layout().setPositionUpper(l, key(), 0);
  yield* arr_layout().setPositionUpper(r, l(), 0);
  yield* arr_layout().setPositionUpper(m, r(), 0);

  view.opacity(0);
  yield* all(slideTransition(Direction.Right), view.opacity(1, 1));

  yield* search(l, r, m, arr_layout, key, 7);

  yield* waitFor(1);

  yield* view.opacity(0, 1);
  yield* all(
    arr_layout().setPositionLeft(key, arr_layout().arr_first, 0),
    arr_layout().setPositionUpper(l, key(), 0),
    arr_layout().setPositionUpper(r, l(), 0),
    arr_layout().setPositionUpper(m, r(), 0),
    key_text().text("3", 0),
  );
  for (let i = 0; i < arr_layout().arr.length; i++) {
    yield* arr_layout().arr[i].fill(greyColor, 0);
    yield* arr_layout().arr[i].opacity(1, 0);
  }
  yield* all(slideTransition(Direction.Right), view.opacity(1, 1));
  yield* view.opacity(1, 1);

  yield* search(l, r, m, arr_layout, key, 3);

  finishScene();
  yield* view.opacity(0, 1);
});
