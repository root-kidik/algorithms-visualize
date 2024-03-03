import { Reference, createRef, range, useRandom } from "@motion-canvas/core";
import { gapNormal } from "./theme";
import { Key } from "./key";
import { Layout, LayoutProps } from "@motion-canvas/2d";
import { MyText } from "./my_text";
import { InsideContainer } from "./container";

export interface MyArrayProps extends LayoutProps {
  count: number;
}

export class MyArray extends Layout {
  private count: number;

  private array = createRef<Layout>();

  public arr: Key[];
  public arr_first: Key;
  public arr_last: Key;

  public constructor(props?: MyArrayProps) {
    super({ ...props });
    this.count = props.count;

    const random = useRandom(1);
    let i = 1;

    const pool = range(this.count).map(() => (
      // <Key text={random.nextInt(1, 100).toString()} />
      <Key text={String(i++)} />
    ));

    this.add(
      <Layout direction="row" gap={gapNormal} ref={this.array} layout>
        {pool.slice(0, this.count)}
      </Layout>,
    );

    this.arr = this.array().childrenAs<Key>();
    this.arr_first = this.arr[0];
    this.arr_last = this.arr[this.arr.length - 1];
  }

  public *setArrTextKey(i: number, text: string, time: number = 1) {
    yield* this.arr[i]
      .childAs<InsideContainer>(0)
      .childAs<MyText>(0)
      .text(text, time);
  }

  public getArrTextKey(i: number) {
    return this.arr[i].childAs<InsideContainer>(0).childAs<MyText>(0).text();
  }

  public *setPositionLeft(el1: Reference<Key>, el2: Key, time: number = 1) {
    yield* el1().position(
      [el2.position().x - el2.width() - gapNormal, el2.position().y],
      time,
    );
  }

  public *setPositionUpper(el1: Reference<Key>, el2: Key, time: number = 1) {
    yield* el1().position(
      [el2.position().x, el2.position().y - el2.height() - gapNormal],
      time,
    );
  }

  public *setPositionDowner(el1: Reference<Key>, el2: Key, time: number = 1) {
    yield* el1().position(
      [el2.position().x, el2.position().y + el2.height() + gapNormal],
      time,
    );
  }
}
