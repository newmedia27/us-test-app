export default class Http {
  static async get(url) {
    try {
      return await request(url);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

const request = async (url, method = "GET") => {
  const config = {
    method,
    headers: { "Content-type": "application/json" },
  };
  const response = await fetch(url, config);
  return await response.json();
};
