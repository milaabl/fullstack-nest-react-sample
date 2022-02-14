export interface ShelfCardData {
  _id: string;
  location: string;
  description?: string;
  createdAt?: Date;
  users: any[] ;
  flowers: FlowerCardData[];
  ownerId: string;
  picturePath?: string;
  onShelfAddEditModalOpen?: (id?: string) => void;
}

export interface FlowerCardData {
  id: string;
  description?: string;
  imageUrl: string;
  name: string;
  nextWateringAt: Date;
  wateringRule: number;
  picturePath?: string;
}

export interface ShelfFromMove {
  flowerId: string;
  shelfFromId: string;
  shelfFromLocation: string;
  nameOfFlower: string;
}
export interface ShelfToMove {
  shelfToId: string;
  shelfToLocation: string;
}
