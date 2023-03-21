export const snakeToPrettyString = (input: string) => {
  return input
    .split("_")
    .map((str) => str[0].toUpperCase() + str.substring(1))
    .join(" ");
};

export const escapeQuotes = (input: string) => {
  return input.replace(/'/g, `\\'`).replace(/"/g, `\\"`);
};

export const replaceBr = (input: string) => {
  return input ? input.replace(/<br \/>/gi, "\n") : "";
};
