import AuthRepository from '@/repository/auth';

class AuthService {
  static #instance: AuthService;
  private readonly repository;

  private constructor() {
    this.repository = AuthRepository.getInstance();
  }

  public static getInstance(): AuthService {
    if (!AuthService.#instance) {
      AuthService.#instance = new AuthService();
    }

    return AuthService.#instance;
  }

  login() {
    return this.repository.login();
  }
}

export default AuthService;
