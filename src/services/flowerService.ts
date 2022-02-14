import instance from './httpClient';
import { ShelfCardData } from '../modules/ShelvesManagement/interfaces';
import { FlowerData } from '../../api/src/flowers/interfaces';

export type FlowerModalData = {
  name: string;
  description: string;
  nextWateringAt: Date;
  shelfId: string;
  wateringRule: number;
};

type WaterFlowerPropsType = {
  shelfId: string;
  flowerId: string;
};

const ENDPOINT_FLOWERS = '/flowers';

export const addFlower = async (data: FlowerModalData):Promise<any> => instance.post(ENDPOINT_FLOWERS, data);

export const editFlower = async (data: FlowerModalData):Promise<any> => instance.patch(ENDPOINT_FLOWERS, data);

export const removeFlowerService = async (flowerId?: string): Promise<any> => instance.delete(`${ENDPOINT_FLOWERS}/${flowerId}`);

export async function waterFlower({ shelfId, flowerId }: WaterFlowerPropsType) : Promise<any> {
  const response = await instance.get<ShelfCardData>(`${ENDPOINT_FLOWERS}/${shelfId}/water/${flowerId}`);
  return response.data;
}

export async function getFlowerData(flowerId: string): Promise<FlowerData> {
  const { data } = await instance.get<FlowerData>(`${ENDPOINT_FLOWERS}/${flowerId}`);
  return data;
}
