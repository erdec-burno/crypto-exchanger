export const demoCredentials = {
  email: 'admin@example.com',
  password: 'demo1234',
} as const;

export type DemoUser = {
  email: string;
  name: string;
};
