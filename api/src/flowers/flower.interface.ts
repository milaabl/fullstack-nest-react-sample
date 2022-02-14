export interface Flower {
  name: string;
  description: string;
  hydrationRule: number;
  wateringRule: number; 
  nextWateringAt: Date;
  createdAt: Date;
  id: string;
  flowerPath?: string;
}
