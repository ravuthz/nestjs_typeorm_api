import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

// @Inject(NoteRepository) // private repository: NoteRepository,

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private repository: Repository<Note>,
  ) {}
  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const item = await this.repository.create(createNoteDto);
    await this.repository.save(item);
    return item;
  }

  async findAll(): Promise<any> {
    return await this.repository.find({
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Note> {
    const item = await this.repository.findOneBy({ id });
    if (item) {
      return item;
    }
    throw new NotFoundException(`Note ${id} not found`);
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    await this.repository.update(id, updateNoteDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<Note> {
    await this.repository.delete(id);
    return await this.findOne(id);
  }
}
