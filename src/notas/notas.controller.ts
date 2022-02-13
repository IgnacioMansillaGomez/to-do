import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { Nota } from './nota.entity';
import { NotasService } from './notas.service';

@Controller('notas')
export class NotasController {
  constructor(private notasService: NotasService) {}

  @Get()
  findAll() {
    return this.notasService.getNotas();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.notasService.findOne(id);
  }

  @Post() create(@Body() nota: Nota) {
    return this.notasService.createNota(nota);
  }

  @Patch(':id')
  async editNota(@Body() nota: Nota, @Param('id') id: number): Promise<Nota> {
    const notaEdited = await this.notasService.editNota(id, nota);
    return notaEdited;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id) {
    this.notasService.remove(id);
  }
}
