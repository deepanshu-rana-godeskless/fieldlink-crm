// services/gpt.ts
import api from "./api";

export async function askIsra(
  prompt: string
): Promise<
  { answer: string; from_vector_db: boolean; docs: any; time: number } | { error: string }
> {
  try {
    const { data } = await api.post("/isra/ask/", { prompt });

    if (data?.data?.error) {
      return { error: data.data.error };
    }

    return data.data;
  } catch (err) {
    return { error: "Network error" };
  }
}
