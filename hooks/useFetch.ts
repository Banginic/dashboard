"use server";
import { cookies } from "next/headers";
interface PropsTypes {
    endpoint: string,
    method: string,
    title: string,
}
interface ReturnType {
    success: boolean;
    message: string;
    data: []
}
export async function useFetch<T>( props : PropsTypes ): Promise<T | ReturnType> {
    const cookieStore = await cookies();
  const cookieHeader = cookieStore.get("next-auth.session-token")?.value;

    const {endpoint, method, title } = props
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    const response = await fetch(`${baseUrl}/api/v1${endpoint}`, {
      method: method,
      credentials: 'include',
      cache: 'force-cache',
      next: { revalidate: 120 },
      headers: { "Content-Type": "application/json" ,
        Cookie: cookieHeader ? `next-auth.session-token=${cookieHeader}` : "",
      },
    });
    const data = await response.json();
    return data;
  } catch (ex) {
    if (ex instanceof Error) {
      return { success: false, message: ex.message, data: [] };
    }
    return {
      success: false,
      message: `Error occoured fetching ${title}`,
      data: [],
    };
  }
}
