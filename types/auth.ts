export type IChangePassword = {
    old_password: string;
    new_password: string;
    confirm_password: string;
  };
  
  export type IResetPassword = {
    email: string;
    new_password: string;
    confirm_password: string;
  };
  
  export type IVerifyCode = {
    email: string;
    code: string;
  };
  
  export type IGenerateCode = {
    email: string;
  };