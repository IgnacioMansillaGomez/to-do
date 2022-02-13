import { Module } from '@nestjs/common';
import { NotasService } from './notas.service';
import { NotasController } from './notas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { nota } from './nota.entity';

@Module({
  imports: [TypeOrmModule.forFeature([nota])],
  providers: [NotasService],
  controllers: [NotasController],
})
export class NotasModule {}
