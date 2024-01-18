export type User = {
  enable: boolean;
  username: string;
  password: string;
  role: string;
  commercial_code: string;
  personal_info: {
    ci: string,
    full_name: string,
    phone: string,
    address: string,
  };
}
