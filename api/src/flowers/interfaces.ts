export interface Flower {
  name: string;
  description: string;
  hydrationRule: number;
  wateringRule: number; 
  nextWateringAt: Date;
  createdAt: Date;
  id: string;
  picturePath?: string;
}

interface Shelf {
  _id: string;
  location: string;
}

// this is the response struture for flower page
export interface FlowerData {
  flower: Flower,
  shelf: Shelf,
  // add log entries here
}