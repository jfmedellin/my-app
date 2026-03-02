import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('should merge class names', () => {
    const result = cn('foo', 'bar');
    expect(result).toBe('foo bar');
  });

  it('should handle conditional classes', () => {
    const result = cn('foo', false && 'bar', 'baz');
    expect(result).toBe('foo baz');
  });

  it('should handle arrays', () => {
    const result = cn(['foo', 'bar'], 'baz');
    expect(result).toBe('foo bar baz');
  });

  it('should handle empty inputs', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('should handle objects with boolean values', () => {
    const result = cn('foo', { bar: true, baz: false });
    expect(result).toBe('foo bar');
  });

  it('should handle mixed inputs', () => {
    const result = cn('foo', ['bar', 'baz'], { qux: true }, false && 'quux');
    expect(result).toBe('foo bar baz qux');
  });
});
