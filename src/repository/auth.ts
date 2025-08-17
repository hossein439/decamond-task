import HttpClientManager from '@/client/http/helpers/manager.helper';

class AuthRepository {
  httpClient: any;
  static #instance: AuthRepository;

  private constructor() {
    this.httpClient = HttpClientManager.getInstance();
  }

  public static getInstance(): AuthRepository {
    if (!AuthRepository.#instance) {
      AuthRepository.#instance = new AuthRepository();
    }

    return AuthRepository.#instance;
  }

  login() {
    return this.httpClient(`?results=1&nat=us`, {
      method: 'get',
    });
  }
}

export default AuthRepository;
