export async function updateFetch(url: string, data: any): Promise<any> {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return { status: response.status, response: await response.json() };
  } catch (error) {
    console.log(console.error(error));
    return undefined;
  }
}
