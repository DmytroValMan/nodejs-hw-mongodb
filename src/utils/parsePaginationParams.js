const parseNumber = (number, defaultValue) => {
  const isNumber = typeof number === 'string';
  if (!isNumber) return defaultValue;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) return defaultValue;

  return parsedNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parcedPage = parseNumber(page, 1);
  const parcedPerPage = parseNumber(perPage, 10);

  return {
    page: parcedPage,
    perPage: parcedPerPage,
  };
};
