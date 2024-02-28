import { Layout, Txt, makeScene2D } from "@motion-canvas/2d";
import {
  Direction,
  all,
  createRef,
  slideTransition,
  waitFor,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const time_column = createRef<Layout>();
  const space_column = createRef<Layout>();

  view.add(
    <>
      <Layout
        justifyContent={"center"}
        alignItems={"center"}
        direction={"row"}
        gap={40}
        layout
      >
        <Layout direction={"column"} alignSelf={"end"} gap={20} layout>
          <Txt
            fontFamily={"Jetbrains Mono"}
            fontWeight={800}
            fontSize={48}
            fill={"#ffffff"}
            text={"O"}
          />
          <Txt
            fontFamily={"Jetbrains Mono"}
            fontWeight={800}
            fontSize={48}
            fill={"#ffffff"}
            text={"Ω"}
          />
          <Txt
            fontFamily={"Jetbrains Mono"}
            fontWeight={800}
            fontSize={48}
            fill={"#ffffff"}
            text={"θ"}
          />
        </Layout>
        <Layout
          direction={"column"}
          alignItems={"center"}
          gap={20}
          ref={time_column}
          layout
        >
          <Txt
            fontFamily={"Jetbrains Mono"}
            fontWeight={800}
            fontSize={48}
            padding={40}
            fill={"#ffffff"}
            text={"⏳"}
          />
          <Txt
            fontFamily={"Jetbrains Mono"}
            fontWeight={800}
            fontSize={48}
            fill={"#ffffff"}
            opacity={0}
            text={"N"}
          />
          <Txt
            fontFamily={"Jetbrains Mono"}
            fontWeight={800}
            fontSize={48}
            fill={"#4CBB17"}
            opacity={0}
            text={"1"}
          />
          <Txt
            fontFamily={"Jetbrains Mono"}
            fontWeight={800}
            fontSize={48}
            fill={"#ffffff"}
            opacity={0}
            text={"N"}
          />
        </Layout>
        <Layout
          direction={"column"}
          alignItems={"center"}
          gap={20}
          ref={space_column}
          layout
        >
          <Txt
            fontFamily={"Jetbrains Mono"}
            fontWeight={800}
            fontSize={48}
            padding={40}
            fill={"#ffffff"}
            text={"💾"}
          />
          <Txt
            fontFamily={"Jetbrains Mono"}
            fontWeight={800}
            fontSize={48}
            fill={"#4CBB17"}
            opacity={0}
            text={"1"}
          />
          <Txt
            fontFamily={"Jetbrains Mono"}
            fontWeight={800}
            fontSize={48}
            fill={"#4CBB17"}
            opacity={0}
            text={"1"}
          />
          <Txt
            fontFamily={"Jetbrains Mono"}
            fontWeight={800}
            fontSize={48}
            fill={"#4CBB17"}
            opacity={0}
            text={"1"}
          />
        </Layout>
      </Layout>
    </>,
  );

  yield* slideTransition(Direction.Right);

  const time_children = time_column().childrenAs<Txt>();

  yield* time_children[1].opacity(1, 1);
  yield* time_children[2].opacity(1, 1);
  yield* time_children[3].opacity(1, 1);

  const space_children = space_column().childrenAs<Txt>();

  yield* all(
    space_children[1].opacity(1, 1),
    space_children[2].opacity(1, 1),
    space_children[3].opacity(1, 1),
  );
});
