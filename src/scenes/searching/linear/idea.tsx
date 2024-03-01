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
import {
  InsideContainer,
  OutsideContainer,
} from "../../../components/container";

export default makeScene2D(function* (view) {
  const count = createSignal(5);

  const random = useRandom();

  const pool = range(count()).map(() => (
    <OutsideContainer>
      <InsideContainer>
        <Txt
          fontFamily={"Jetbrains Mono"}
          fontWeight={800}
          fontSize={48}
          fill={"#ffffff"}
          text={random.nextInt(1, 100).toString()}
        />
      </InsideContainer>
    </OutsideContainer>
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
        <OutsideContainer fill={"#4CBB17"}>
          <InsideContainer>
            <Txt
              fontFamily={"Jetbrains Mono"}
              fontWeight={800}
              fill={"white"}
              fontSize={48}
              text={"93"}
            />
          </InsideContainer>
        </OutsideContainer>
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
