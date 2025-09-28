import {TextEncoder, TextDecoder} from 'util';
import fetch, {Response, Request, Headers} from 'node-fetch';

if (typeof global.TextEncoder === 'undefined') {
	(global as any).TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
	(global as any).TextDecoder = TextDecoder;
}

if (typeof global.fetch === 'undefined') {
	(global as any).fetch = fetch;
	(global as any).Response = Response;
	(global as any).Request = Request;
	(global as any).Headers = Headers;
}
