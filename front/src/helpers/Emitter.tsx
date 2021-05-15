import EventEmitter from "eventemitter3";

const eventEmitter = new EventEmitter();

const Emitter = {
  on: (event: any, fn: any) => eventEmitter.on(event, fn),
  once: (event: any, fn: any) => eventEmitter.once(event, fn),
  off: (event: any) => eventEmitter.off(event),
  emit: (event: any, payload: any) => eventEmitter.emit(event, payload),
};

Object.freeze(Emitter);

export { Emitter };
