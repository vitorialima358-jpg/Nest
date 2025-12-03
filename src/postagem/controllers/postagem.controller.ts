import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe
} from '@nestjs/common';
import { PostagemService } from '../services/postagem.service';
import { Postagem } from '../entities/postagem.entity';

@Controller('/postagens')
export class PostagemController {
  constructor(private readonly service: PostagemService) {}

  @Get()
  findAll(): Promise<Postagem[]> {
    return this.service.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: number): Promise<Postagem | null> {
    return this.service.findById(id);
  }

  @Get('/titulo/:titulo')
  findByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
    return this.service.findByTitulo(titulo);
  }

  @Post()
  create(@Body() postagem: Postagem): Promise<Postagem> {
    return this.service.create(postagem);
  }

  @Put()
  update(@Body() postagem: Postagem): Promise<Postagem> {
    return this.service.update(postagem);
  }

  @Delete('/:id')
@HttpCode(HttpStatus.NO_CONTENT)
delete(@Param('id', ParseIntPipe) id: number) {
  return this.service.delete(id);

}
}
