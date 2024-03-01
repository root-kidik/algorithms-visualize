import { Rect, RectProps } from "@motion-canvas/2d";

export interface OutsideContainerProps extends RectProps {}

export class OutsideContainer extends Rect {
  public constructor(props?: OutsideContainerProps) {
    super({
      radius: 10,
      fill: "rgb(20,20,20)",
      padding: 10,
      width: 120,
      height: 120,
      alignItems: "center",
      justifyContent: "center",
      smoothCorners: true,
      layout: true,
      ...props,
    });
  }
}

export interface InsideContainerProps extends RectProps {}

export class InsideContainer extends Rect {
  public constructor(props?: InsideContainerProps) {
    super({
      radius: 10,
      fill: "rgb(0,0, 0)",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      smoothCorners: true,
      layout: true,
      ...props,
    });
  }
}
