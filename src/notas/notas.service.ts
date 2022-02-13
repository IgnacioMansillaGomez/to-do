import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nota } from './nota.entity';

@Injectable()
export class NotasService {
  constructor(
    @InjectRepository(nota) private notasRepository: Repository<nota>,
  ) {}
  async getNotas(): Promise<nota[]> {
    return await this.notasRepository.find();
  }

  findOne(id: string): Promise<nota> {
    return this.notasRepository.findOne(id);
  }

  async createNota(nota: nota) {
    this.notasRepository.save(nota);
  }

  async remove(id: string): Promise<void> {
    await this.notasRepository.delete(id);
  }

  async editNota(id: number, nota: nota): Promise<nota> {
    const editedNota = await this.notasRepository.findOne(id);
    if (!editedNota) {
      throw new NotFoundException('Nota no encontrada');
    }

    editedNota.titulo = nota.titulo;
    await editedNota.save();
    return editedNota;
  }
}
