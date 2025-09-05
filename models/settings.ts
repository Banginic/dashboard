
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
