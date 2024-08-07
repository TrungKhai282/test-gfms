import { assocPathStatus } from "@/common/utils/interactor.util";

export const modifieldTableStatus = (pagination, filters, sorter, extra) => {
  const columnFilter = {
    ...assocPathStatus(["username", "like"], filters.username),
    ...assocPathStatus(["display_name", "like"], filters.display_name),
    ...assocPathStatus(["user_type"], filters.roles),
    ...assocPathStatus(["record_status"], filters.record_status),
  };

  return {
    page: pagination?.current || undefined,
    "per-page": pagination?.pageSize || undefined,
    sort:
      sorter && sorter.order
        ? `${sorter.order === "descend" ? "-" : ""}${sorter.field}`
        : undefined,
    // ...columnFilter,
    filter: columnFilter,
  };
};
