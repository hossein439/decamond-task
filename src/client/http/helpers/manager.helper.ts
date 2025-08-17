import type { AxiosInstance } from 'axios';
import { default as realInstance } from '@/client/http/instances/real';

type Environment = 'development' | 'test' | 'production';

class HttpClientManager {
  private env: Environment;
  private client: AxiosInstance;
  private readonly instanceStrategy: Record<Environment, AxiosInstance> = {
    development: realInstance,
    test: realInstance,
    production: realInstance,
  };

  constructor() {
    // const mode = (import.meta.env.MODE as Environment) || 'development';
    const mode = 'development';

    if (!['development', 'test', 'production'].includes(mode)) {
      throw new Error(`Unknown environment mode: ${mode}`);
    }

    this.env = mode;
    this.client = this.instanceStrategy[this.env];
  }

  getInstance(): AxiosInstance {
    return this.client;
  }
}

export default new HttpClientManager();
