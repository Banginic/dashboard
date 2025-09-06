import { string } from "zod";

type APIResponse = { success: boolean; error?: string; message?: string };

export interface ProfileInfoType {
  id: string;
  projectName: string;
  tagLine: string;
  adminId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ProfileInfoTypes extends APIResponse {
  data: ProfileInfoType[] | [];
}

export interface ContactType {
  id: string;
  phone: string;
  email: string;
  whatsApp: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ContactTypes extends APIResponse {
  data: ContactType[] | [];
}
export interface AddressType {
  id: string;
  country: string;
  state: string;
  city: string;
  address: string;
  currency: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface AddressTypes extends APIResponse {
  data: AddressType[] | [];
}

export interface ProjectDetail {
  id: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  whatsApp: string;
  twitter: string;
  youTube: string;
  email: string;
  phone: string;
  projectName: string;
  address: string;
  city: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ProjectDetails extends APIResponse {
  data: ProjectDetail[] | [];
}
