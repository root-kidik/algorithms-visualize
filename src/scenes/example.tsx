import { Layout, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import { all, createRef, createSignal, range } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const count = createSignal(10);

  const pool = range(5).map((i) => (
    <Rect
      width={120}
      fill={"#ff6470"}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      layout
    >
      <Txt text={i.toString()} />
    </Rect>
  ));

  const layout = createRef<Layout>();

  view.add(
    <>
      <Layout direction={"row"} height={120} gap={40} ref={layout} layout>
        {() => pool.slice(0, count())}
      </Layout>
    </>,
  );

  let spawnedCircles = layout().childrenAs<Rect>();
  yield* all(spawnedCircles[0].scale(1.5, 1).to(1, 1));
});
