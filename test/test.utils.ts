import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    findAll: jest.fn((entities) => entities),
    create: jest.fn((entity) => entity),
    update: jest.fn((entity) => entity),
    remove: jest.fn((entity) => entity),
  }),
);
