import { vi } from 'vitest';

declare module 'vitest' {
  export const describe: any;
  export const it: any;
  export const expect: any;
  export const vi: any;
  export const beforeEach: any;
  export const afterEach: any;
}

declare module '@testing-library/react' {
  export const render: any;
  export const screen: any;
  export const fireEvent: any;
  export const waitFor: any;
}

declare module '@vitejs/plugin-react' {
  const plugin: any;
  export default plugin;
}
