"use server";
interface PropsTypes {
    endpoint: string,
    title: string,
    body: Object
}
interface ReturnType {
    success: boolean;
    message: string;
    data: []
}
export async function usePost<T>( props : PropsTypes ): Promise<T | ReturnType> {

    const {endpoint, title, body } = props
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
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
