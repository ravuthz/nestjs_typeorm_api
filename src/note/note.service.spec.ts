import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { NoteService } from './note.service';
import { repositoryMockFactory } from '../../test/test.utils';
import { TestModule } from '../../test/test.module';
import { Repository } from 'typeorm';

jest.setTimeout(100_000);

describe('NoteService', () => {
  let repository: Repository<Note>;
  let service: NoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestModule, TypeOrmModule.forFeature([Note])],
      providers: [
        {
          provide: getRepositoryToken(Note),
          useFactory: repositoryMockFactory,
        },
        NoteService,
      ],
    }).compile();

    repository = module.get<Repository<Note>>(getRepositoryToken(Note));
    service = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(service).toBeDefined();
  });
});
