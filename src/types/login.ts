export type LoginForm = {
  email: string;
  password: string;
};

export type LoginField = {
  key: keyof LoginForm;
  label: string;
  type?: string;
  placeholder?: string;
};
