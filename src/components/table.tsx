import { Layout, LayoutProps, Txt } from "@motion-canvas/2d";
import { InsideContainer, OutsideContainer } from "./container";

export interface TableProps extends LayoutProps {
  cols: string[][];
}

export class Table extends Layout {
  private colors = new Map<string, string>([["1", "#4CBB17"]]);

  public constructor(props?: TableProps) {
    super({
      justifyContent: "center",
      alignItems: "center",
      gap: 40,
      layout: true,
      ...props,
    });

    this.add(
      props.cols.map((col, i) => (
        <Layout direction={"column"} alignSelf={"end"} gap={20} layout>
          {col.map((text, j) => (
            <OutsideContainer
              fill={
                this.colors.has(text) ? this.colors.get(text) : "rgb(20,20,20)"
              }
              opacity={i == 0 || j == 0 ? 1 : 0}
            >
              <InsideContainer>
                <Txt
                  fontFamily={"Jetbrains Mono"}
                  fontWeight={800}
                  fontSize={48}
                  padding={10}
                  fill={"white"}
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
