export async function readListFetch<T>(url: string): Promise<T[]> {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    return (await response.json()) as T[];
  } catch (error) {
    console.log(console.error(error));
    return [] as T[];
  }
}

export async function readSingleElementFetch<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    return (await response.json()) as T;
  } catch (error) {
    console.log(console.error(error));
    return {} as T;
  }
}
