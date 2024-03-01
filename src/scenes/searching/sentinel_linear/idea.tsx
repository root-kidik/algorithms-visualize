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
  const temp_layout = createRef<Layout>();
  const temp_text = createRef<Txt>();

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
              text={"45"}
            />
          </InsideContainer>
        </OutsideContainer>
      </Layout>

      <Layout
        direction={"column"}
        alignItems={"center"}
        gap={40}
        ref={temp_layout}
        layout
      >
        <OutsideContainer>
          <InsideContainer>
            <Txt
              fontFamily={"Jetbrains Mono"}
              fontWeight={800}
              fill={"white"}
              fontSize={48}
              text={""}
              ref={temp_text}
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

  temp_layout().position([
    key_layout().position().x - key_layout().width() - 40,
    key_layout().position().y,
  ]);

  view.opacity(0);
  yield* all(slideTransition(Direction.Right), view.opacity(1, 1));

  yield* temp_layout().position(
    arr_childs[arr_childs.length - 1]
      .position()
      .addY(
        -(
          key_layout().height() / 2 +
          arr_childs[arr_childs.length - 1].height() / 2 +
          40
        ),
      ),
    1,
  );

  yield* temp_text().text("50", 1);

  yield* key_layout().position(
    arr_childs[arr_childs.length - 1]
      .position()
      .addY(
        key_layout().height() / 2 +
          arr_childs[arr_childs.length - 1].height() / 2 +
          40,
      ),
    1,
  );

  yield* arr_childs[arr_childs.length - 1]
    .childrenAs<Rect>()[0]
    .childrenAs<Txt>()[0]
    .text("45", 1);

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

  arr_childs[arr_childs.length - 2]
    .childrenAs<Rect>()[0]
    .childrenAs<Txt>()[0]
    .text("46");
  arr_childs[3].fill("#FF3131");

  yield* slideTransition(Direction.Right);

  yield* key_layout().position(
    arr_childs[4]
      .position()
      .addY(key_layout().height() / 2 + arr_childs[4].height() / 2 + 40),
    1,
  );

  yield* arr_childs[4].fill("#4CBB17", 1);
  yield* waitFor(1);

  yield* arr_childs[4].fill("rgb(20,20,20)", 1);

  yield* all(
    temp_text().text("", 1),
    arr_childs[arr_childs.length - 1]
      .childrenAs<Rect>()[0]
      .childrenAs<Txt>()[0]
      .text("50", 1),
  );

  yield* waitFor(1);

  yield* arr_childs[4].fill("#FF3131", 1);

  yield* waitFor(1);

  finishScene();
  yield* view.opacity(0, 1);
});
