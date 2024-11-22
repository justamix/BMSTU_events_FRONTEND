declare global {
  interface Window {
    __TAURI__?: {
      tauri: {
        invoke: (command: string, args?: Record<string, unknown>) => Promise<any>;
      };
    };
  }
}

export {};