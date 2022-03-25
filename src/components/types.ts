type DaoBalanceResponse = {
  Balance: string;
};

type UserStatusResponse = {
  UserStatus: userStatus;
};

type userStatus = {
  isAdmin: boolean;
  isMember: boolean;
  isInWaitlist: boolean;
  waitForDecision: boolean;
};

export type { DaoBalanceResponse, UserStatusResponse };
