const findToken = () => {
  return `bearer ${localStorage.getItem("token")}`;
}

const ROOT_URL = process.env.REACT_APP_API_URL;
let token: string | null = `bearer ${localStorage.getItem("token")}`;


async function createRequestWithoutResponse(url: string, requestOptions: any) {
  if (token === undefined || token === null) {
    token = findToken();
  }
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
  if (token === undefined || token === null) {
    token = findToken();
  }
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
