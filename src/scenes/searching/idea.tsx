import { Layout, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import {
  Direction,
  createRef,
  createSignal,
  range,
  slideTransition,
  useRandom,
  waitFor,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
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

  const arr_layout = createRef<Layout>();
  const key_layout = createRef<Layout>();

  view.add(
    <>
      <Layout
        direction={"column"}
        alignItems={"center"}
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
            text={"93"}
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
      <Layout direction={"row"} height={120} gap={40} ref={arr_layout} layout>
        {() => pool.slice(0, count())}
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
      (key_layout().height() / 2 - first_child.height() / 2),
  ]);

  yield* slideTransition(Direction.Right);

  for (let i = 0; i < count(); i++) {
    yield* key_layout().position(
      arr_childs[i]
        .position()
        .addY(key_layout().height() / 2 + arr_childs[i].height() / 2 + 40),
      1,
    );
    if (i > 2) {
      yield* arr_childs[i].fill("#4CBB17", 0.2);
      break;
    } else {
      yield* arr_childs[i].fill("#FF3131", 0.2);
    }
    yield* waitFor(1);
  }
});
