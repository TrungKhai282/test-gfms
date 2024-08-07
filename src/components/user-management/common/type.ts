export type SearchBoxFormType = {
  loginName?: string;
  userName?: string;
  status?: string;
  creater?: string;
  create_date?: Array<string | null | undefined> | null;
  updater?: string;
  update_date?: Array<string | null | undefined> | null;
};

export type CreateFormType = {
  phone?: string;
  display_name: string;
  email: string;
  username: string;
  roles: string[];
};

export type UserListTablePropTypes = {
  tableData: any;
  isLoading: boolean;
  setUserListParams: React.SetStateAction<any>;
  reFetchUserList: any;
  openDetail: (id: number, type: string) => void;
};
