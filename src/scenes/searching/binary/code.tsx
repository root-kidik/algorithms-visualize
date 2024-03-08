import { makeScene2D } from "@motion-canvas/2d";
import { Reference, chain, waitUntil } from "@motion-canvas/core";
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
import {
  CodeBlock,
  lines,
  word,
} from "@motion-canvas/2d/lib/components/CodeBlock";

function* search(
  code: Reference<CodeBlock>,
  l_: Reference<Key>,
  r_: Reference<Key>,
  m_: Reference<Key>,
  array: Reference<MyArray>,
  key: Reference<Key>,
  answer: number,
  time: number = 1,
) {
  let l = 0;
  yield* waitUntil("l");
  yield* chain(
    code().selection(lines(2), 1),
    array().setPositionUpper(l_, array().arr_first),
  );
  let r = array().arr.length - 1;
  yield* waitUntil("r");
  yield* chain(
    code().selection(lines(3), 1),
    array().setPositionUpper(r_, array().arr_last),
  );

  while (l <= r) {
    yield* waitUntil("while" + l + r);
    yield* code().selection(lines(5), 1);
    let m = Math.floor((l + r) / 2);
    yield* waitUntil("m" + l + r);
    yield* chain(
      code().selection(lines(7), 1),
      array().setPositionUpper(m_, array().arr[m]),
    );

    yield* chain(
      code().selection(word(9, 8, 13), 1),
      array().setPositionDowner(key, array().arr[m], time),
    );
    if (Number(array().getArrTextKey(m)) == answer) {
      yield* waitUntil("return");
      for (let i = l; i < m; i++) yield array().arr[i].opacity(0.25, 1);
      for (let i = r; i > m; i--) yield array().arr[i].opacity(0.25, 1);

      yield* chain(
        code().selection(word(9, 22, 10), 1),
        array().arr[m].fill(greenColor, time),
      );
      yield* waitFor(time);
      return;
    }

    yield* waitUntil("?" + m);
    yield* chain(
      code().selection(word(11, 4, 14), 1),
      array().arr[m].fill(redColor, time),
    );
    if (answer > Number(array().getArrTextKey(m))) {
      yield* waitUntil("l + 1" + m);
      for (let i = l; i < m; i++) yield array().arr[i].opacity(0.25, 1);
      l = m + 1;
      yield* chain(
        code().selection(word(11, 19, 10), 1),
        array().setPositionUpper(l_, array().arr[l]),
      );
    } else {
      yield* waitUntil("r - 1" + m);
      for (let i = r; i > m; i--) yield array().arr[i].opacity(0.25, 1);
      r = m - 1;
      yield* chain(
        code().selection(word(11, 31, 9), 1),
        array().setPositionUpper(r_, array().arr[r]),
      );
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

  const code = createRef<CodeBlock>();

  const count = 10;

  view.add(
    <>
      <MyArray count={count} ref={arr_layout} position={[0, -300]}>
        <Key ref={key} text="7" textRef={key_text} fill={greenColor} />
        <Key ref={l} width={80} height={80} textSize={32} text="l" />
        <Key ref={r} width={80} height={80} textSize={32} text="r" />
        <Key ref={m} width={80} height={80} textSize={32} text="m" />
      </MyArray>

      <CodeBlock
        fontFamily={"Jetbrains Mono"}
        fontWeight={800}
        fontSize={28}
        language="c++"
        position={[0, 250]}
        code={`int binary_search(vector<int> arr, int key)
{
  int l = 0;
  int r = arr.size() - 1;

  while (l <= r) 
  {
    int m = (l + r) / 2;

    if (arr[m] == key) return m;
    
    key > arr[m] ? l = m + 1 : r = m - 1;
  }

  return -1;
}`}
        ref={code}
      />
    </>,
  );
  yield* arr_layout().setPositionLeft(key, arr_layout().arr_first, 0);
  yield* arr_layout().setPositionUpper(l, key(), 0);
  yield* arr_layout().setPositionUpper(r, l(), 0);
  yield* arr_layout().setPositionUpper(m, r(), 0);

  view.opacity(0);
  yield* all(slideTransition(Direction.Right), view.opacity(1, 1));

  yield* search(code, l, r, m, arr_layout, key, 7);

  yield* waitFor(1);

  finishScene();
  yield* view.opacity(0, 1);
});
