export async function deleteFetch(url: string): Promise<any> {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return { status: response.status, response: await response.json() };
  } catch (error) {
    console.log(console.error(error));
    return undefined;
  }
}
