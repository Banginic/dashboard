
type APIResponse = { success: boolean, error?: string, message?: string}

export interface ProfileInfoType {
    id: string;
    projectName: string;
    tagLine: string;
    adminId: string;
    createdAt: Date;
    updatedAt: Date;
  }
export interface ProfileInfoTypes extends APIResponse {
  data : ProfileInfoType [] | []
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
    updatedAt: Date
  }
export interface AddressTypes extends APIResponse {
  data : AddressType [] | []
}
