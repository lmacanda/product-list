export interface ProductImage {
  thumbnail: string;
  mobile:    string;
  tablet:    string;
  desktop:   string;
}

export interface Product {
  name:        string;
  description: string;
  price:       number;
  image:       ProductImage;
  category:    string;
}

export interface CartItem extends Product {
  quantity: number;  // only new field
}