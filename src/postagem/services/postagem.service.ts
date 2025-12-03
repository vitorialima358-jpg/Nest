import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, DeleteResult } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';
import { TemaService } from '../../tema/services/tema.service'; 

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,

    private readonly temaService: TemaService // 
  ) {}


  async findAll(): Promise<Postagem[]> {
    return this.postagemRepository.find({
      relations: { tema: true }
    });
  }


  async findById(id: number): Promise<Postagem | null> {
    return this.postagemRepository.findOne({
      where: { id },
      relations: { tema: true }
    });
  }


  async findByTitulo(titulo: string): Promise<Postagem[]> {
    return this.postagemRepository.find({
      where: { titulo: ILike(`%${titulo}%`) },
      relations: { tema: true }
    });
  }


  async create(postagem: Postagem): Promise<Postagem> {
    // ✔️ VERIFICA SE O TEMA EXISTE ANTES DE SALVAR
    await this.temaService.findById(postagem.tema.id);

    return this.postagemRepository.save(postagem);
  }


  async update(postagem: Postagem): Promise<Postagem> {

  
    await this.findById(postagem.id);

  
    await this.temaService.findById(postagem.tema.id);

    return this.postagemRepository.save(postagem);
  }


  async delete(id: number): Promise<DeleteResult | null> {
    const busca = await this.findById(id);

    if (!busca) {
      return null;
    }

    return this.postagemRepository.delete(id);
  }
}
