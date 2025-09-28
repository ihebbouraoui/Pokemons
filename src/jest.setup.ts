import {TextEncoder, TextDecoder} from 'util';

if (typeof global.BroadcastChannel === 'undefined') {
	class BroadcastChannelMock {
		name: string;
		onmessage: ((this: BroadcastChannel, ev: MessageEvent) => any) | null = null;
		onmessageerror: ((this: BroadcastChannel, ev: MessageEvent) => any) | null = null;

		private listeners: Array<(ev: MessageEvent) => void> = [];

		constructor(name: string) {
			this.name = name;
		}


		close() {
			this.listeners = [];
			this.onmessage = null;
			this.onmessageerror = null;
		}

		addEventListener(type: string, listener: EventListenerOrEventListenerObject) {
			if (type === 'message' && typeof listener === 'function') {
				this.listeners.push(listener);
			}
		}

		removeEventListener(type: string, listener: EventListenerOrEventListenerObject) {
			if (type === 'message' && typeof listener === 'function') {
				this.listeners = this.listeners.filter((l) => l !== listener);
			}
		}

		dispatchEvent(event: Event): boolean {
			return true;
		}
	}

	global.BroadcastChannel = BroadcastChannelMock as any;
}

if (typeof global.TextEncoder === 'undefined') {
	(global as any).TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
	(global as any).TextDecoder = TextDecoder;
}

if (typeof global.TransformStream === 'undefined') {
	const {TransformStream} = require('web-streams-polyfill/dist/ponyfill');
	(global as any).TransformStream = TransformStream;
}

export {};
