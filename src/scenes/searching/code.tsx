import { Layout, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import {
  Direction,
  PossibleVector2,
  Vector2,
  all,
  createRef,
  createSignal,
  range,
  slideTransition,
  useRandom,
  waitFor,
} from "@motion-canvas/core";
import {
  CodeBlock,
  lines,
  word,
} from "@motion-canvas/2d/lib/components/CodeBlock";

const getBottomPosition = (
  node1: Layout,
  node2: Layout,
  paddig: number,
): PossibleVector2 => {
  return [
    node2.position().x,
    node2.position().y +
      (node1.height() / 2 +
        node2.height() / 2 +
        paddig +
        node2.parentAs<Layout>().height() / 2 -
        node2.parent().parentAs<Layout>().height() / 2),
  ];
};

export default makeScene2D(function* (view) {
  const code = createRef<CodeBlock>();

  const count = createSignal(5);
  const random = useRandom();

  const pool = range(count()).map(() => (
    <Rect
      width={120}
      height={120}
      fill={"#ffffff"}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      layout
    >
      <Txt
        fontFamily={"Jetbrains Mono"}
        fontWeight={800}
        fontSize={48}
        text={random.nextInt(1, 100).toString()}
      />
    </Rect>
  ));

  const key_layout = createRef<Layout>();
  const arr_layout = createRef<Layout>();

  view.add(
    <>
      <Layout
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={40}
        ref={key_layout}
        layout
      >
        <Rect
          width={120}
          height={120}
          fill={"#4CBB17"}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          layout
        >
          <Txt
            fontFamily={"Jetbrains Mono"}
            fontWeight={800}
            fontSize={48}
            text={"11"}
          />
        </Rect>
        <Txt
          fontFamily={"Jetbrains Mono"}
          fontWeight={800}
          fontSize={40}
          fill={"#4CBB17"}
          text={"key"}
        />
      </Layout>

      <Layout direction={"column"} gap={300} layout>
        <Layout
          direction={"row"}
          height={120}
          gap={40}
          ref={arr_layout}
          alignItems={"center"}
          justifyContent={"center"}
          layout
        >
          {() => pool.slice(0, count())}
        </Layout>

        <CodeBlock
          fontFamily={"Jetbrains Mono"}
          fontWeight={800}
          fontSize={32}
          language="c++"
          code={`int linear_search(vector<int> arr, int key)
{
  for (size_t i = 0; i < arr.size(); i++)
    if (arr[i] == key)
      return i;

  return -1;
}`}
          ref={code}
        />
      </Layout>
    </>,
  );

  const arr_childs = arr_layout().childrenAs<Rect>();

  const first_child = arr_childs[0];
  key_layout().position([
    first_child.position().x -
      (first_child.width() / 2 + key_layout().width() / 2) -
      40,
    first_child.position().y +
      (key_layout().height() / 2 -
        first_child.height() / 2 +
        first_child.parentAs<Layout>().height() / 2 -
        first_child.parent().parentAs<Layout>().height() / 2),
  ]);

  yield* slideTransition(Direction.Right);

  yield* all(
    code().selection(word(2, 7, 12), 1), // size_t i = 0
    key_layout().position(
      getBottomPosition(key_layout(), arr_childs[0], 40),
      1,
    ),
  );
  yield* code().selection(word(2, 20, 15), 1); // i < arr.size()

  yield* all(
    code().selection(lines(3, 3), 1), // if
    arr_childs[0].fill("#FF3131", 1),
  );

  yield* all(
    code().selection(word(2, 37, 3), 1), // i++
    key_layout().position(
      getBottomPosition(key_layout(), arr_childs[1], 40),
      1,
    ),
  );

  for (let i = 1; i < count(); i++) {
    yield* code().selection(word(2, 20, 15), 1); // i < arr.size()

    if (i > 2) {
      yield* code().selection(lines(3), 1); // if
      yield* all(
        code().selection(lines(4), 1), // return i;
        arr_childs[i].fill("#4CBB17", 1),
      );
      break;
    } else {
      yield* all(
        code().selection(lines(3), 1), // if
        arr_childs[i].fill("#FF3131", 1),
      );
    }

    yield* all(
      code().selection(word(2, 37, 3), 1), // i++
      key_layout().position(
        getBottomPosition(key_layout(), arr_childs[i + 1], 40),
        1,
      ),
    );
  }

  yield* waitFor(1);
});
