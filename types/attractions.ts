export interface TagSectionContent {
  sectionTag: string;
  title: string;
  description: string;
  bg: TagSectionBg;
}

export const AttractionLayout = {
  layout1: "layout_1",
  layout2: "layout_2",
  layout3: "layout_3",
};
export type TagSectionBg = "white" | "color" | "color-light";
