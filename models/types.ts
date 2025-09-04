
type APIResponse = { success: boolean, error?: string, message?: string}

export interface MessageType {
    id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string
    createdAt: Date;
    updatedAt: Date;
  }
export interface MessageTypes extends APIResponse {
  data : MessageType [] | []
}

export interface ProductType {
    id: string;
    name: string;
    category: string;
    subCategory: string;
    isInStock: boolean;
    price: number;
    rating: number;
    reviews: number;
    description: string
    photos: string[]
    alergies: string
    createdAt: Date;
    updatedAt: Date;
  }
export interface ProductTypes extends APIResponse {
  data : ProductType [] | []
}
export interface TestimonialType {
    id: string;
    name: string;
    project: string;
    phone: string;
    message: string;
    photo: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
  }
export interface TestimonialTypes extends APIResponse {
  data : TestimonialType [] | []
}
export interface EmployeeType {
    id: string;
    name: string;
    position: string;
    qualification: string;
    bio: string;
    isActive: boolean;
    phone: string;
    email: string;
    photo: string
    createdAt: Date;
    updatedAt: Date;
  }
export interface EmployeeTypes extends APIResponse {
  data : EmployeeType [] | []
}

export interface OrderType {
    id: string;
    name: string;
    location: string;
    phone: string;
    status: string;
    orderDetails: {
      product: string;
      quantity: number;
      amount: number;
    }[];
    price: number;
    note: string
    createdAt: Date;
    updatedAt: Date;
  }
export interface OrdersTypes extends APIResponse {
  data : OrderType  [] | []
}
export interface NewsType {
    id: string;
    subject: string;
    body: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
export interface NewsTypes extends APIResponse {
  data : NewsType  [] | []
}