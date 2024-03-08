import { ReferenceReceiver } from "@motion-canvas/core";
import {
  InsideContainer,
  OutsideContainer,
  OutsideContainerProps,
} from "./container";
import { MyText } from "./my_text";

export interface ElementProps extends OutsideContainerProps {
  elementText?: string;
  elementFontSize?: number;
  elementTextRef?: ReferenceReceiver<any>;
}

export class Element extends OutsideContainer {
  public constructor(props?: ElementProps) {
    super({
      ...props,
    });

    this.add(
      <InsideContainer>
        <MyText
          text={props.elementText}
          ref={props.elementTextRef}
          fontSize={props.elementFontSize ? props.elementFontSize : 48}
        />
      </InsideContainer>,
    );
  }
}

export interface ElementIndexedProps extends ElementProps {
  indexText?: string;
  indexFontSize?: number;
  indexTextRef?: ReferenceReceiver<any>;
}

export class ElementIndexed extends Element {
  public constructor(props?: ElementIndexedProps) {
    super({ ...props });

    this.add(
      <InsideContainer>
        <MyText
          text={props.indexText}
          ref={props.indexTextRef}
          fontSize={props.indexFontSize ? props.indexFontSize : 48}
        />
      </InsideContainer>,
    );
  }
}
