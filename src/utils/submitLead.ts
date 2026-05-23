import { GOOGLE_SCRIPT_URL } from "../constants/config";

export async function submitLead(payload: { name: string; phone: string; city: string; time: string }): Promise<any> {
  try {
    const response = await fetch(
      GOOGLE_SCRIPT_URL,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      }
    );

    return await response.json();
  } catch(error) {
    console.error(error);
    throw error;
  }
}
