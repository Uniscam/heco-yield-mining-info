interface RequestArguments {
    method: string;
    params?: unknown[] | object;
}

type Callback = (...params) => void;

export type Ethereum = {
    async request(request: RequestArguments): Promise<any>;
    on(eventName: string, callback: Callback): void;
    selectedAddress?: string;
}

export declare global {
    interface Window {
      // add you custom properties and methods
      ethereum?: Ethereum
    }
  }
  