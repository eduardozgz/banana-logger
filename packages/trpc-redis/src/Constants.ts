export const REQ_CHANNEL = "trpc-req";
export const RES_CHANNEL = "trpc-res";

// Message a request rejects with when no instance answers in time. Consumers
// match on it to react to "nobody serves this" (e.g. bot offline) without
// retrying a request that won't get answered.
export const REQUEST_TIMEOUT_MESSAGE = "Request timed out";
