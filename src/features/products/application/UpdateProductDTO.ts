export interface UpdateProductDTO {
  id: number;
  title?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  status?: string;
  category?: string;
}
