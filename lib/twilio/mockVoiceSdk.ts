export class Call {
  private listeners: Record<string, Function[]> = {};
  public customParameters: Map<string, string>;
  
  constructor(public parameters: Record<string, string>) {
    this.customParameters = new Map(Object.entries(parameters));
  }

  on(event: string, callback: Function) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
    return this;
  }

  emit(event: string, ...args: any[]) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(...args));
    }
  }

  disconnect() {
    this.emit('disconnect', this);
  }
  
  mute(isMuted: boolean) {
    this.emit('mute', isMuted, this);
  }
}

export class Device {
  private token: string;
  private options: any;
  private listeners: Record<string, Function[]> = {};

  constructor(token: string, options?: any) {
    this.token = token;
    this.options = options;
    console.log('[Twilio Mock SDK] Device initialized with token');
    
    // Auto register for demo purposes
    setTimeout(() => {
      this.emit('registered');
    }, 500);
  }

  on(event: string, callback: Function) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
    return this;
  }

  emit(event: string, ...args: any[]) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(...args));
    }
  }

  async connect(options: { params: Record<string, string> }): Promise<Call> {
    console.log(`[Twilio Mock SDK] Connecting to ${options.params.To}`);
    const call = new Call(options.params);
    
    // Simulate network delay and answer
    setTimeout(() => {
      call.emit('accept', call);
    }, 2500);

    return call;
  }

  disconnectAll() {
    console.log('[Twilio Mock SDK] Disconnected all calls');
  }
  
  destroy() {
    console.log('[Twilio Mock SDK] Device destroyed');
  }
}
