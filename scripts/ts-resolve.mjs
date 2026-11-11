// Permet à Node d'exécuter les fichiers TypeScript du projet dont les imports n'ont pas d'extension.
import { register } from 'node:module';
register('data:text/javascript,' + encodeURIComponent(`
export async function resolve(spec, ctx, next) {
  try { return await next(spec, ctx); }
  catch (e) {
    if (spec.startsWith('.') || spec.startsWith('/')) {
      try { return await next(spec + '.ts', ctx); } catch { return next(spec + '/index.ts', ctx); }
    }
    throw e;
  }
}`));
