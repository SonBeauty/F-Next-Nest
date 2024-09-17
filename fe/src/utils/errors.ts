import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  static type: string;
  constructor(message?: any) {
    super();
    this.type = message;
  }
}

export class InvalidEmailPasswordError extends AuthError {
  static type = "Email/Password is valid";
}

export class IsActiveError extends AuthError {
  static type = "Please active your account";
}
