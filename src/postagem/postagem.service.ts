import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Postagem } from './entities/postagem.entity';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
  ) {}

  async findAll(): Promise<Postagem[]> {
    return this.postagemRepository.find();
  }

async findById(id: number): Promise<Postagem | null> {
  return this.postagemRepository.findOne({
    where: { id }
  });
}


  async findByTitulo(titulo: string): Promise<Postagem[]> {
    return this.postagemRepository.find({
      where: { titulo: ILike(`%${titulo}%`) },
    });
  }

  async create(postagem: Postagem): Promise<Postagem> {
    return this.postagemRepository.save(postagem);
  }

  async update(postagem: Postagem): Promise<Postagem> {
    return this.postagemRepository.save(postagem);
  }

  async delete(id: number): Promise<void> {
    await this.postagemRepository.delete(id);
  }
}
