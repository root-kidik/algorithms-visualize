import { makeScene2D } from "@motion-canvas/2d";
import {
  Direction,
  all,
  chain,
  createRef,
  finishScene,
  slideTransition,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import {
  CodeBlock,
  lines,
  word,
} from "@motion-canvas/2d/lib/components/CodeBlock";
import { MyArray } from "../../../components/my_array";
import { greenColor, greyColor, redColor } from "../../../components/theme";
import { Reference } from "@motion-canvas/core";
import { Key } from "../../../components/key";
import { MyText } from "../../../components/my_text";

function* search(
  code: Reference<CodeBlock>,
  array: Reference<MyArray>,
  key: Reference<Key>,
  begin: number,
  end: number,
  time: number = 1,
) {
  for (let i = begin; i < end; i++) {
    yield* chain(
      code().selection(word(7, 24, 3), time),
      array().setPositionDowner(key, array().arr[i], time),
    );
    if (array().getArrTextKey(i) == "98") {
      yield* waitUntil("нашли" + i);
      yield* chain(
        code().selection(word(7, 9, 13), time),
        array().arr[i].fill(greenColor, time),
      );
      yield* waitFor(time);
      break;
    } else {
      yield* chain(
        code().selection(word(7, 9, 13), time),
        array().arr[i].fill(redColor, time),
      );
    }
  }
}

export default makeScene2D(function* (view) {
  const code = createRef<CodeBlock>();

  const arr_layout = createRef<MyArray>();
  const key = createRef<Key>();
  const temp = createRef<Key>();
  const temp_text = createRef<MyText>();

  const count = 5;

  view.add(
    <>
      <MyArray position={[0, -250]} count={count} ref={arr_layout}>
        <Key ref={key} text="98" fill={greenColor} />
        <Key ref={temp} textRef={temp_text} />
      </MyArray>
      <CodeBlock
        fontFamily={"Jetbrains Mono"}
        fontWeight={800}
        fontSize={32}
        language="c++"
        position={[0, 250]}
        code={`int sentinel_linear_search(vector<int> arr, int key)
{
  if (arr.empty()) return -1;
  int temp = arr.back();
  arr.back() = key;

  int i = 0;
  while (arr[i] != key) i++;

  arr.back() = temp;
  if (i < arr.size() - 1 || arr[i] == key) return i;
  return -1;
}`}
        ref={code}
      />
    </>,
  );

  yield* arr_layout().setPositionLeft(key, arr_layout().arr_first, 0);
  yield* arr_layout().setPositionLeft(temp, key(), 0);

  view.opacity(0);
  yield* all(slideTransition(Direction.Right), view.opacity(1, 1));

  yield* waitUntil("empty");
  yield* code().selection(lines(2), 1);

  yield* waitUntil("back");
  yield* arr_layout().setPositionUpper(temp, arr_layout().arr_last);
  yield* chain(code().selection(lines(3), 1), temp_text().text("96", 1));

  yield* arr_layout().setPositionDowner(key, arr_layout().arr_last);

  yield* waitUntil("замена");
  yield* chain(
    code().selection(lines(4), 1),
    arr_layout().setArrTextKey(4, "98"),
  );

  yield* waitUntil("перебор");
  yield* chain(
    code().selection(lines(6), 1),
    arr_layout().setPositionDowner(key, arr_layout().arr[0], 1),
  );

  yield* chain(
    code().selection(word(7, 9, 13), 1),
    arr_layout().arr[0].fill(redColor, 1),
  );
  yield* waitFor(1);

  yield* search(code, arr_layout, key, 1, 4);

  yield* waitUntil("возвращаем");
  yield* chain(
    code().selection(lines(9), 1),
    temp_text().text("", 1),
    arr_layout().setArrTextKey(4, "96"),
  );

  yield* waitUntil("if");
  yield* code().selection(word(10, 6, 18), 1);

  yield* waitUntil("return");
  yield* code().selection(word(10, 43, 8), 1);

  yield* view.opacity(0, 1);
  yield* arr_layout().setArrTextKey(3, "99", 0);
  yield* temp_text().text("96", 0);
  yield* arr_layout().setArrTextKey(4, "98", 0);
  yield* search(code, arr_layout, key, 0, 4, 0);
  yield* all(slideTransition(Direction.Right), view.opacity(1, 1));
  yield* view.opacity(1, 1);

  yield* search(code, arr_layout, key, 4, 5);
  yield* arr_layout().arr_last.fill(greyColor, 1);

  yield* code().selection(lines(9), 1);
  yield* all(temp_text().text("", 1), arr_layout().setArrTextKey(4, "96"));

  yield* waitUntil("if2");
  yield* code().selection(word(10, 6, 18), 1);
  yield* code().selection(word(10, 28, 13), 1);

  yield* arr_layout().arr_last.fill(redColor, 1);
  yield* code().selection(lines(11), 1);

  yield* waitFor(1);

  yield* waitUntil("end");
  finishScene();
  yield* view.opacity(0, 1);
});
