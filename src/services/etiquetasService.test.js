import { describe, it, expect, vi, beforeEach } from 'vitest';
import { etiquetasService } from './etiquetasService.js';
import { pool } from '../config/db.js';

// 1. EL MOCK (La simulación)
vi.mock('../config/db.js', () => ({
    pool: {
        query: vi.fn()
    }
}));

describe('Pruebas Unitarias - etiquetasService', () => {
    
    // 2. LIMPIEZA ANTES DE CADA TEST
    beforeEach(() => {
        vi.clearAllMocks(); 
    });

    // 3. PRIMER TEST: CASO EXITOSO
    it('Debería retornar todas las etiquetas correctamente', async () => {
        const mockRows = [
            { id: 1, nombre_etiqueta: 'Cachorro' },
            { id: 2, nombre_etiqueta: 'Adulto' }
        ];
        // Simulamos que la base de datos responde exitosamente con este arreglo
        pool.query.mockResolvedValueOnce({ rows: mockRows });

        const resultado = await etiquetasService.obtenerTodas();

        // Verificaciones (Asserts)
        expect(resultado).toHaveLength(2);
        expect(resultado[0].nombre_etiqueta).toBe('Cachorro');
        expect(pool.query).toHaveBeenCalledWith('SELECT * FROM etiquetas ORDER BY id ASC');
    });

    // 4. SEGUNDO TEST: BÚSQUEDA EXITOSA POR ID
    it('Debería retornar una etiqueta específica por su ID', async () => {
        const mockEtiqueta = { id: 3, nombre_etiqueta: 'Exótico' };
        pool.query.mockResolvedValueOnce({ rows: [mockEtiqueta] });

        const resultado = await etiquetasService.obtenerPorId(3);

        expect(resultado).not.toBeNull();
        expect(resultado.nombre_etiqueta).toBe('Exótico');
        expect(pool.query).toHaveBeenCalledWith('SELECT * FROM etiquetas WHERE id = $1;', [3]);
    });

    // 5. TERCER TEST: CASO DE ERROR / NO ENCONTRADO
    it('Debería retornar null si la etiqueta no existe', async () => {
        // Simulamos que la base de datos no encontró filas (rows vacío)
        pool.query.mockResolvedValueOnce({ rows: [] });

        const resultado = await etiquetasService.obtenerPorId(999);

        expect(resultado).toBeNull();
    });
});