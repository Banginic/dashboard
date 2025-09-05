"use server";
interface PropsTypes {
    endpoint: string,
    title?: string,
    method: string;
    body: Object
}
interface ReturnType {
    success: boolean;
    message: string;
    data: []
}
export async function usePost<T>( props : PropsTypes ): Promise<T | ReturnType> {

    const {endpoint, title, body, method } = props
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    const response = await fetch(`${baseUrl}/api/v1${endpoint}`, {
      method: method || 'POST',
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (ex) {
    if (ex instanceof Error) {
      return { success: false, message: ex.message, data: [] };
    }
    return {
      success: false,
      message: `Error occoured ${title}`,
      data: [],
    };
  }
}
