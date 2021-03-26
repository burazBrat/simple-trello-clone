const trelloAPIKey = "d2d00dc0849e46261fba7d288971198f";
const accessToken =
  "d2062a60c11979c9b4a6feed828e5422b6d2d13d0afb0318c2d2b747f6bf1991";
const host = "https://api.trello.com/1";

export const apiUrlHelper = (apiUrl: string) =>
  `${host}${apiUrl}?key=${trelloAPIKey}&token=${accessToken}`;

export const apiUrlHelperWithFilter = (apiUrl: string, filter: string) =>
  `${host}${apiUrl}?${filter}&key=${trelloAPIKey}&token=${accessToken}`;
