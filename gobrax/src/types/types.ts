export interface Driver {
    id: number;
    name: string;
    document: string;
    vehicleId: number | null;
  }
  
  export interface Vehicle {
    id: number;
    brand: string;
    plate: string;
    model: string;
  }
  