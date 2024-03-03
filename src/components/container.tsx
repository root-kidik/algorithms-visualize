import { Rect, RectProps } from "@motion-canvas/2d";
import { blackColor, greyColor, paddingNormal, raduisNormal } from "./theme";

export interface OutsideContainerProps extends RectProps {}

export class OutsideContainer extends Rect {
  public constructor(props?: OutsideContainerProps) {
    super({
      radius: raduisNormal,
      fill: greyColor,
      padding: paddingNormal,
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
      radius: raduisNormal,
      fill: blackColor,
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
