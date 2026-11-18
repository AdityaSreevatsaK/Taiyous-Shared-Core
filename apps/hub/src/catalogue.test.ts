import { describe, expect, it } from 'vitest';
import { modules } from './catalogue';
describe('hub navigation registry', () => {
  it('has four modules and no broken planned links', () => {
    expect(modules.map(m => m.key)).toEqual(['novels','manga','anime','movies-tv']);
    for (const module of modules) {
      expect(module.availability).toBe(module.href ? 'available' : 'planned');
      if (module.href) expect(new URL(module.href).protocol).toBe('https:');
    }
  });
});
