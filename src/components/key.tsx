import { ReferenceReceiver } from "@motion-canvas/core";
import {
  InsideContainer,
  OutsideContainer,
  OutsideContainerProps,
} from "./container";
import { MyText } from "./my_text";

export interface KeyProps extends OutsideContainerProps {
  text?: string;
  textSize?: Number;
  textRef?: ReferenceReceiver<any>;
}

export class Key extends OutsideContainer {
  public constructor(props?: KeyProps) {
    super({
      ...props,
    });

    this.add(
      <InsideContainer>
        <MyText
          text={props.text}
          ref={props.textRef}
          fontSize={props.textSize ? props.textSize : 48}
        />
      </InsideContainer>,
    );
  }
}
