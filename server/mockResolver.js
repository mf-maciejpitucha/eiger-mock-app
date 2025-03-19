import { ALL_DEVICES_MOCK } from './mocks/printers.js';

const pathMapper = [
  {
    matcher: /^\/api\/printer$/,
    resolver: () => {
      return ALL_DEVICES_MOCK;
    }
  },
  {
    matcher: /^\/api\/printer\/.*$/,
    resolver: (pathname) => {
      return ALL_DEVICES_MOCK.find(device => device._id === pathname.split('/').pop());
    }
  }
];

export const getMockedData = (pathname) => {
  const matchedResolver = pathMapper.find(({ matcher }) => { 
    return matcher.test(pathname);
  });
  return matchedResolver
    ? matchedResolver.resolver(pathname)
    :undefined;
};
