import { remixAdapter } from './remix-adaptor';

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    return await remixAdapter(request, env, ctx);
  },
};
