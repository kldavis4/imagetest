import {cacheGet} from "@/app/runtimepoc/cache";

type Context = {
  cacheGet?: (key: string) => Promise<unknown>;
  cacheSet?: (key: string, value: unknown) => Promise<void>;
  headers?: Record<string, string>;
};

export const SYMBOL_FOR_REQ_CONTEXT = Symbol.for('@vercel/request-context');

export function getContext(): Context {
  const fromSymbol: typeof globalThis & {
    [SYMBOL_FOR_REQ_CONTEXT]?: { get?: () => Context };
  } = globalThis;
  return fromSymbol[SYMBOL_FOR_REQ_CONTEXT]?.get?.() ?? {};
}