
interface Detail {
  productoId: number;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

interface Order {
  fecha: Date; // Asegúrate de que LocalDate esté definido o importado correctamente
  total: number; // Cambié Double a number, que es el tipo de dato en TypeScript
  tipo: string; // Este campo es obligatorio
  direccion: string; // Este campo es obligatorio
  hora: Date; // Asegúrate de que LocalDateTime esté definido o importado correctamente
  estado: string; // Cambié StateOrder a string, puedes definir un tipo específico si lo deseas
  DetailProduct: Detail[]; // Lista de detalles de productos
}

export type {Order}