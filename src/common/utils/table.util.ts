export const modifieldTableStatus = (pagination, filters, sorter, extra) => {
  // const columnFilter = {};
  // Object.keys(filters).forEach((key) => {
  //   const field = filters[key];
  //   const isValue = field && field.length > 0 && field[0] && field[0] !== "";
  //   columnFilter[key] = isValue ? field[0] : undefined;
  // });

  return {
    page: pagination?.current || undefined,
    "per-page": pagination?.pageSize || undefined,
    sort:
      sorter && sorter.order
        ? `${sorter.order === "descend" ? "-" : ""}${sorter.field}`
        : undefined,
    // ...columnFilter,
    filter: filters,
  };
};
