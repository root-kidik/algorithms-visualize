import { Layout, LayoutProps } from "@motion-canvas/2d";
import { gapNormal } from "./theme";
import { Key } from "./key";
import { all } from "@motion-canvas/core";

export interface KeyProps extends LayoutProps {
  namedText?: string;
  fill?: string;
  text?: string;
}

export class NamedKey extends Layout {
  public constructor(props?: KeyProps) {
    super({
      direction: "column",
      gap: gapNormal,
      ...props,
    });

    this.add(<Key fill={props.fill} textSize={32} text={props.namedText} />);
    this.add(<Key fill={props.fill} textSize={32} text={props.text} />);
  }

  public *fill(color: string, time: number) {
    yield* all(
      this.childAs<NamedKey>(0).fill(color, time),
      this.childAs<NamedKey>(0).fill(color, time),
    );
  }
}
