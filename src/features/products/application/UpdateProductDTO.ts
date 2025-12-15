export interface UpdateProductDTO {
  id: number;

  // basic fields
  title?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  status?: string;

  // category fields
  category?: string;
  subCategory?: string;
}
