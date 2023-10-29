export interface IpayLoadLogin {
  email: string;
  password: string;
}

export interface IuserInfo {
  email: string;
  id: string;
  role: string;
  mobile: string;
  status: string;
  firstName: string;
  lastName: string;
  middleName: string;
  code?: string;
  accessToken: string;
}
