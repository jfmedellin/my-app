import { describe, it, expect } from 'vitest';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().email('Debe ser un email válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

describe('loginSchema validation', () => {
  it('should validate correct credentials', () => {
    const validData = {
      username: 'test@example.com',
      password: '123456',
    };
    const result = loginSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.username).toBe('test@example.com');
      expect(result.data.password).toBe('123456');
    }
  });

  it('should reject invalid email', () => {
    const invalidData = {
      username: 'not-an-email',
      password: '123456',
    };
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Debe ser un email válido');
    }
  });

  it('should reject short password', () => {
    const invalidData = {
      username: 'test@example.com',
      password: '123',
    };
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('La contraseña debe tener al menos 6 caracteres');
    }
  });

  it('should reject empty username', () => {
    const invalidData = {
      username: '',
      password: '123456',
    };
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject empty password', () => {
    const invalidData = {
      username: 'test@example.com',
      password: '',
    };
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject missing fields', () => {
    const invalidData = {
      username: 'test@example.com',
    };
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should return multiple validation errors', () => {
    const invalidData = {
      username: 'invalid',
      password: '123',
    };
    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThanOrEqual(2);
    }
  });
});
