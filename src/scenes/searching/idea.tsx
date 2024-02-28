import { Layout, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import {
  Direction,
  all,
  createRef,
  createSignal,
  finishScene,
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
      radius={10}
      fill={"rgb(20,20,20)"}
      padding={10}
      width={120}
      height={120}
      alignItems={"center"}
      justifyContent={"center"}
      smoothCorners
      layout
    >
      <Rect
        fill={"rgb(0, 0, 0)"}
        direction={"column"}
        width={"100%"}
        height={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        radius={10}
        smoothCorners
        layout
      >
        <Txt
          fontFamily={"Jetbrains Mono"}
          fontWeight={800}
          fontSize={48}
          fill={"#ffffff"}
          text={random.nextInt(1, 100).toString()}
        />
      </Rect>
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
          radius={10}
          padding={10}
          smoothCorners
          fill={"#4CBB17"}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          layout
        >
          <Rect
            width={"100%"}
            height={"100%"}
            radius={10}
            smoothCorners
            fill={"rgb(0,0,0)"}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            layout
          >
            <Txt
              fontFamily={"Jetbrains Mono"}
              fontWeight={800}
              fill={"white"}
              fontSize={48}
              text={"93"}
            />
          </Rect>
        </Rect>
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

  view.opacity(0);
  yield* all(slideTransition(Direction.Right), view.opacity(1, 1));

  for (let i = 0; i < count(); i++) {
    yield* key_layout().position(
      arr_childs[i]
        .position()
        .addY(key_layout().height() / 2 + arr_childs[i].height() / 2 + 40),
      1,
    );
    if (i > 2) {
      yield* arr_childs[i].fill("#4CBB17", 1);
      yield* waitFor(1);
      break;
    } else {
      yield* arr_childs[i].fill("#FF3131", 1);
    }
  }

  finishScene();
  yield* view.opacity(0, 1);
});
