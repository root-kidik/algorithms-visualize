import { Reference, createRef, range } from "@motion-canvas/core";
import { gapNormal } from "./theme";
import { Layout, LayoutProps } from "@motion-canvas/2d";
import { MyText } from "./my_text";
import { InsideContainer } from "./container";
import { NamedKey } from "./named_key";

export interface NamedMyArrayProps extends LayoutProps {
  count: number;
}

export class NamedMyArray extends Layout {
  private count: number;

  private array = createRef<Layout>();

  public arr: NamedKey[];
  public arr_first: NamedKey;
  public arr_last: NamedKey;

  public constructor(props?: NamedMyArrayProps) {
    super({ ...props });
    this.count = props.count;

    let i = 1;
    const pool = range(this.count).map(() => (
      <NamedKey namedText={this.dec2bin(i)} text={String(i++)} />
    ));

    this.add(
      <Layout direction="row" gap={gapNormal} ref={this.array} layout>
        {pool.slice(0, this.count)}
      </Layout>,
    );

    this.arr = this.array().childrenAs<NamedKey>();
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

  public *setPositionLeft(
    el1: Reference<NamedKey>,
    el2: NamedKey,
    time: number = 1,
  ) {
    yield* el1().position(
      [el2.position().x - el2.width() - gapNormal, el2.position().y],
      time,
    );
  }

  public *setPositionUpper(
    el1: Reference<NamedKey>,
    el2: NamedKey,
    time: number = 1,
  ) {
    yield* el1().position(
      [el2.position().x, el2.position().y - el2.height() - gapNormal],
      time,
    );
  }

  public *setPositionDowner(
    el1: Reference<NamedKey>,
    el2: NamedKey,
    time: number = 1,
  ) {
    yield* el1().position(
      [el2.position().x, el2.position().y + el2.height() + gapNormal],
      time,
    );
  }

  private dec2bin(dec: number) {
    return (dec >>> 0).toString(2);
  }
}
