import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mascotasService } from './mascotasService.js';
import { pool } from '../config/db.js';

vi.mock('../config/db.js', () => ({
  pool: {
    query: vi.fn()
  }
}));

describe('mascotasService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería persistir la información adicional al crear una mascota', async () => {
    const mascotaMock = {
      id: 1,
      nombre: 'Milo',
      especie: 'Perro',
      raza: 'Mestizo',
      sexo: 'Macho',
      edad: 3,
      info_adicional: 'Recompensa de $10.000'
    };

    pool.query.mockResolvedValueOnce({ rows: [mascotaMock] });

    const resultado = await mascotasService.crear({
      nombre: 'Milo',
      especie: 'Perro',
      raza: 'Mestizo',
      sexo: 'Macho',
      edad: 3,
      latitud: -33.5,
      longitud: -70.7,
      comuna: 'Santiago',
      usuario_id: 'user-1',
      infoAdicional: 'Recompensa de $10.000'
    });

    expect(resultado).toEqual(mascotaMock);
    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining('info_adicional'),
      expect.any(Array)
    );
  });
});
