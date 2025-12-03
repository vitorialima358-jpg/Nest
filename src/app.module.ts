import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';

import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/tema.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'hanna23', // sua senha
      database: 'db_blogpessoal',
      entities: [Postagem, Tema], // <-- registre as duas entidades aqui
      synchronize: true,
    }),

    // Módulos da aplicação
    PostagemModule,
    TemaModule,
  ],
})
export class AppModule {}
