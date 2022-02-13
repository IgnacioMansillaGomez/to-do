import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nota } from './nota.entity';

@Injectable()
export class NotasService {
  constructor(
    @InjectRepository(Nota) private notasRepository: Repository<Nota>,
  ) {}
  async getNotas(): Promise<Nota[]> {
    return await this.notasRepository.find();
  }

  findOne(id: string): Promise<Nota> {
    return this.notasRepository.findOne(id);
  }

  async createNota(nota: Nota) {
    this.notasRepository.save(nota);
  }

  async remove(id: string): Promise<void> {
    await this.notasRepository.delete(id);
  }

  async editNota(id: number, nota: Nota): Promise<Nota> {
    const editedNota = await this.notasRepository.findOne(id);
    if (!editedNota) {
      throw new NotFoundException('Nota no encontrada');
    }

    editedNota.titulo = nota.titulo;
    await editedNota.save();
    return editedNota;
  }
}
