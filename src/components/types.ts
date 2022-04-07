type DaoBalanceResponse = {
  Balance: string;
};

type MemberPowerResponse = {
  MemberPower: string;
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

export type { DaoBalanceResponse, UserStatusResponse, MemberPowerResponse };
