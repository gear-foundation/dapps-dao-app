type DaoBalanceResponse = {
  Balance: string;
};

type MemberPowerResponse = {
  MemberPower: string;
};

type UserStatusResponse = {
  UserStatus: 'Admin' | 'None' | 'Member';
};


export type { DaoBalanceResponse, UserStatusResponse, MemberPowerResponse };
