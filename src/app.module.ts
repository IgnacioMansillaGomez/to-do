import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { nota } from './notas/nota.entity';
import { NotasModule } from './notas/notas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '4787474',
      database: 'list-to-do',
      entities: [nota],
      synchronize: true,
      logging: false,
    }),
    NotasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
