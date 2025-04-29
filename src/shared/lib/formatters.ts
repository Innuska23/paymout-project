export const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\s/g, "");

  const groups = [];
  for (let i = 0; i < cleaned.length; i += 4) {
    groups.push(cleaned.substring(i, i + 4));
  }

  return groups.join(" ");
};

export const formatExpiration = (value: string): string => {
  if (!value) return "";

  if (value.length === 1) {
    return value;
  }

  if (value.length >= 2) {
    let month = value.substring(0, 2);
    const monthNum = parseInt(month, 10);
    if (monthNum > 12) {
      month = "12";
    } else if (monthNum === 0) {
      month = "01";
    }
    if (value.length === 2) {
      return month;
    }

    const year = value.substring(2, 4);
    return `${month}/${year}`;
  }

  return value;
};