interface Account {
  accountId?: string;
  username?: string;
  password?: string;
  email?: string;
  displayName?: string;
  avatar?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  delFlag?: boolean;
  rootId?: string;
  parentId?: string;
}

export default Account;