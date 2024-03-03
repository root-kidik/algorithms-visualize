import { Txt, TxtProps } from "@motion-canvas/2d";
import {
  fontFamily,
  fontNormalSize,
  fontNormalWeight,
  whiteColor,
} from "./theme";

export interface MyTextProps extends TxtProps {}

export class MyText extends Txt {
  public constructor(props?: MyTextProps) {
    super({
      fontFamily: fontFamily,
      fontWeight: fontNormalWeight,
      fontSize: fontNormalSize,
      fill: whiteColor,
      ...props,
    });
  }
}
