import { Layout, LayoutProps } from "@motion-canvas/2d";
import { InsideContainer, OutsideContainer } from "./container";
import { MyText } from "./my_text";
import {
  gapNormal,
  gapSmall,
  greenColor,
  greyColor,
  paddingNormal,
} from "./theme";

export interface TableProps extends LayoutProps {
  cols: string[][];
}

export class Table extends Layout {
  private colors = new Map<string, string>([
    ["1", greenColor],
    ["logN", greenColor],
  ]);
  private fontSizes = new Map<string, number>([["logN", 32]]);

  public constructor(props?: TableProps) {
    super({
      justifyContent: "center",
      alignItems: "center",
      gap: gapNormal,
      layout: true,
      ...props,
    });

    this.add(
      props.cols.map((col, i) => (
        <Layout direction={"column"} alignSelf={"end"} gap={gapSmall} layout>
          {col.map((text, j) => (
            <OutsideContainer
              fill={this.colors.has(text) ? this.colors.get(text) : greyColor}
              opacity={i == 0 || j == 0 ? 1 : 0}
            >
              <InsideContainer>
                <MyText
                  padding={paddingNormal}
                  fontSize={
                    this.fontSizes.has(text) ? this.fontSizes.get(text) : 48
                  }
                  text={text}
                />
              </InsideContainer>
            </OutsideContainer>
          ))}
        </Layout>
      )),
    );
  }

  public *showNext() {
    const childrens = this.children();
    for (let i = 1; i < childrens.length; i++) {
      const inner_childrens = childrens[i].children();
      for (let j = 1; j < inner_childrens.length; j++) {
        yield* inner_childrens[j].opacity(1, 1);
      }
    }
  }
}
