import { Layout, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import {
  Direction,
  all,
  createRef,
  finishScene,
  slideTransition,
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
        <Layout
          width={100}
          direction={"column"}
          alignSelf={"end"}
          gap={20}
          layout
        >
          <Rect
            opacity={0}
            radius={10}
            fill={"rgb(20,20,20)"}
            padding={10}
            smoothCorners
            layout
          >
            <Rect
              fill={"rgb(0,0,0)"}
              direction={"column"}
              radius={10}
              smoothCorners
              layout
            >
              <Txt
                fontFamily={"Jetbrains Mono"}
                fontWeight={800}
                fontSize={48}
                padding={10}
                fill={"#ffffff"}
                text={"O"}
              />
            </Rect>
          </Rect>

          <Rect
            radius={10}
            fill={"rgb(20,20,20)"}
            padding={10}
            smoothCorners
            layout
          >
            <Rect
              alignItems={"center"}
              width={"100%"}
              fill={"rgb(0,0,0)"}
              direction={"column"}
              radius={10}
              smoothCorners
              layout
            >
              <Txt
                fontFamily={"Jetbrains Mono"}
                fontWeight={800}
                fontSize={48}
                padding={10}
                fill={"#ffffff"}
                text={"O"}
              />
            </Rect>
          </Rect>

          <Rect
            radius={10}
            fill={"rgb(20,20,20)"}
            padding={10}
            smoothCorners
            layout
          >
            <Rect
              alignItems={"center"}
              width={"100%"}
              fill={"rgb(0,0,0)"}
              direction={"column"}
              radius={10}
              smoothCorners
              layout
            >
              <Txt
                fontFamily={"Jetbrains Mono"}
                fontWeight={800}
                fontSize={48}
                padding={10}
                fill={"#ffffff"}
                text={"Ω"}
              />
            </Rect>
          </Rect>

          <Rect
            radius={10}
            fill={"rgb(20,20,20)"}
            padding={10}
            smoothCorners
            layout
          >
            <Rect
              alignItems={"center"}
              width={"100%"}
              fill={"rgb(0,0,0)"}
              direction={"column"}
              radius={10}
              smoothCorners
              layout
            >
              <Txt
                fontFamily={"Jetbrains Mono"}
                fontWeight={800}
                fontSize={48}
                padding={10}
                fill={"#ffffff"}
                text={"θ"}
              />
            </Rect>
          </Rect>
        </Layout>
        <Layout
          width={100}
          direction={"column"}
          alignItems={"center"}
          gap={20}
          ref={time_column}
          layout
        >
          <Rect
            radius={10}
            width={"100%"}
            fill={"rgb(20,20,20)"}
            padding={10}
            smoothCorners
            layout
          >
            <Rect
              alignItems={"center"}
              width={"100%"}
              fill={"rgb(0,0,0)"}
              direction={"column"}
              radius={10}
              smoothCorners
              layout
            >
              <Txt
                fontFamily={"Jetbrains Mono"}
                fontWeight={800}
                fontSize={48}
                padding={10}
                fill={"#ffffff"}
                text={"⏳"}
              />
            </Rect>
          </Rect>

          <Rect
            opacity={0}
            radius={10}
            width={"100%"}
            fill={"rgb(20,20,20)"}
            padding={10}
            smoothCorners
            layout
          >
            <Rect
              alignItems={"center"}
              width={"100%"}
              fill={"rgb(0,0,0)"}
              direction={"column"}
              radius={10}
              smoothCorners
              layout
            >
              <Txt
                fontFamily={"Jetbrains Mono"}
                fontWeight={800}
                fontSize={48}
                padding={10}
                fill={"#ffffff"}
                text={"N"}
              />
            </Rect>
          </Rect>

          <Rect
            opacity={0}
            radius={10}
            width={"100%"}
            fill={"#4CBB17"}
            padding={10}
            smoothCorners
            layout
          >
            <Rect
              alignItems={"center"}
              width={"100%"}
              fill={"rgb(0,0,0)"}
              direction={"column"}
              radius={10}
              smoothCorners
              layout
            >
              <Txt
                fontFamily={"Jetbrains Mono"}
                fontWeight={800}
                fontSize={48}
                padding={10}
                fill={"#ffffff"}
                text={"1"}
              />
            </Rect>
          </Rect>

          <Rect
            opacity={0}
            radius={10}
            width={"100%"}
            fill={"rgb(20,20,20)"}
            padding={10}
            smoothCorners
            layout
          >
            <Rect
              alignItems={"center"}
              width={"100%"}
              fill={"rgb(0,0,0)"}
              direction={"column"}
              radius={10}
              smoothCorners
              layout
            >
              <Txt
                fontFamily={"Jetbrains Mono"}
                fontWeight={800}
                fontSize={48}
                padding={10}
                fill={"#ffffff"}
                text={"N"}
              />
            </Rect>
          </Rect>
        </Layout>
        <Layout
          width={100}
          direction={"column"}
          alignItems={"center"}
          gap={20}
          ref={space_column}
          layout
        >
          <Rect
            radius={10}
            width={"100%"}
            fill={"rgb(20,20,20)"}
            padding={10}
            smoothCorners
            layout
          >
            <Rect
              alignItems={"center"}
              width={"100%"}
              fill={"rgb(0,0,0)"}
              direction={"column"}
              radius={10}
              smoothCorners
              layout
            >
              <Txt
                fontFamily={"Jetbrains Mono"}
                fontWeight={800}
                fontSize={48}
                padding={10}
                fill={"#ffffff"}
                text={"💾"}
              />
            </Rect>
          </Rect>

          <Rect
            opacity={0}
            radius={10}
            width={"100%"}
            fill={"#4CBB17"}
            padding={10}
            smoothCorners
            layout
          >
            <Rect
              alignItems={"center"}
              width={"100%"}
              fill={"rgb(0,0,0)"}
              direction={"column"}
              radius={10}
              smoothCorners
              layout
            >
              <Txt
                fontFamily={"Jetbrains Mono"}
                fontWeight={800}
                fontSize={48}
                padding={10}
                fill={"#ffffff"}
                text={"1"}
              />
            </Rect>
          </Rect>

          <Rect
            opacity={0}
            radius={10}
            width={"100%"}
            fill={"#4CBB17"}
            padding={10}
            smoothCorners
            layout
          >
            <Rect
              alignItems={"center"}
              width={"100%"}
              fill={"rgb(0,0,0)"}
              direction={"column"}
              radius={10}
              smoothCorners
              layout
            >
              <Txt
                fontFamily={"Jetbrains Mono"}
                fontWeight={800}
                fontSize={48}
                padding={10}
                fill={"#ffffff"}
                text={"1"}
              />
            </Rect>
          </Rect>

          <Rect
            opacity={0}
            radius={10}
            width={"100%"}
            fill={"#4CBB17"}
            padding={10}
            smoothCorners
            layout
          >
            <Rect
              alignItems={"center"}
              width={"100%"}
              fill={"rgb(0,0,0)"}
              direction={"column"}
              radius={10}
              smoothCorners
              layout
            >
              <Txt
                fontFamily={"Jetbrains Mono"}
                fontWeight={800}
                fontSize={48}
                padding={10}
                fill={"#ffffff"}
                text={"1"}
              />
            </Rect>
          </Rect>
        </Layout>
      </Layout>
    </>,
  );

  view.opacity(0);
  yield* all(slideTransition(Direction.Right), view.opacity(1, 1));

  const time_children = time_column().childrenAs<Layout>();

  yield* time_children[1].opacity(1, 1);
  yield* time_children[2].opacity(1, 1);
  yield* time_children[3].opacity(1, 1);

  const space_children = space_column().childrenAs<Layout>();

  yield* all(
    space_children[1].opacity(1, 1),
    space_children[2].opacity(1, 1),
    space_children[3].opacity(1, 1),
  );

  finishScene();
  yield* view.opacity(0, 1);
});
