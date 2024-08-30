export const convertToObject = (data: string): any => {
  const pairs = data.split("|");

  const obj = pairs.reduce((acc: Record<string, string>, pair) => {
    const [key, value] = pair.split("=");
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {});

  return obj;
};
