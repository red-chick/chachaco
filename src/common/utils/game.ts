export const replaceBrTagWithLineBreak = (string: string) => {
  return string.replace(/\<br \/\>/g, "\n") || "";
};

export const replaceLineBreakWithBrTag = (string: string) => {
  return string.replace(/\r\n|\r|\n/g, "<br />") || "";
};
