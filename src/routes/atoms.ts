import { atom, selector } from "recoil";
export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

export const fontSizeState = atom({
  key: "fontSizeState",
  default: 40,
});

export const fontSizeLabelState = selector({
  key: "fontSizeLabelState",
  get: ({ get }) => {
    const fontSize = get(fontSizeState);
    const unit = "px";
    return `${fontSize}${unit}`;
  },
});
