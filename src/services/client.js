class Client {
  constructor({ endpoint, cors = 'same-origin' }) {
    this.apiEndpoint = endpoint;
    this.mode = cors;
  }

  async put(endpoint, payload) {
    try {
      const response = await fetch(this.apiEndpoint + endpoint, {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(payload),
        mode: this.mode,
      });

      if (!response.ok) {
        throw {
          type: 'Network error',
          message: `${response.status}: ${response.statusText}`
        };
      }
  
      return await response.json();
    } catch (error) {
      return { error };
    }
  }  
}
const client = new Client({
  endpoint: process.env.ISOCHRONE_ENDPOINT
});
export default client;