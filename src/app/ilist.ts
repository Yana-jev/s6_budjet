export interface Ilist {
   nombre: string;
   telefono: string;
   email: string;
   fecha: string;
   services: Service [];
   totalCost: number;
   pages?: number;
   languages?: number;
   }

export interface Service {
      name: string;
      price: number;
      article: string;
   }