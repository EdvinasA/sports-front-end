const ROOT_URL = process.env.REACT_APP_API_URL;
const token = `bearer ${localStorage.getItem("token")}`;

async function createRequestWithoutResponse(url: string, requestOptions: any) {
  const request = {
    ...requestOptions,
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    })
  }

  return await fetch(`${ROOT_URL}/${url}`, request);
}

async function createRequestWithResponse(url: string, requestOptions: any) {
  const request = {
    ...requestOptions,
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    })
  }

  const response = await fetch(`${ROOT_URL}/${url}`, request);

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

export { createRequestWithResponse, createRequestWithoutResponse }
