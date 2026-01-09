export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterField {
  key: keyof RegisterForm;
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  minlength?: number;
}
