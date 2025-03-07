import { fetchBusLocations } from '../ConcordiaApiShuttle'; 

describe('fetchBusLocations', () => {
  let originalFetch: typeof fetch;

  beforeAll(() => {
    originalFetch = global.fetch;
  });

  beforeEach(() => {
    global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks(); 
  });

  it('fetches bus locations successfully', async () => {
    const mockResponse = { d: [{ id: 1, location: '123 Main St' }] };
    const mockResponseObj = {
      ok: true,
      json: async () => mockResponse,
    } as Response; 
    
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(mockResponseObj);

    const result = await fetchBusLocations();

    expect(fetch).toHaveBeenCalledWith('https://us-central1-soen-390-golden-doodle.cloudfunctions.net/api/v1/bus-locations', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    expect(result).toEqual(mockResponse);
  });

  it('throws an error when the fetch request fails', async () => {
    const mockErrorResponse = {
      ok: false,
      status: 404,
    } as Response;

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(mockErrorResponse); 

    await expect(fetchBusLocations()).rejects.toThrow('HTTP error! Status: 404');
  });

  it('handles errors during the fetch request', async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(new Error('Network error'));
  
    await expect(fetchBusLocations()).rejects.toThrow('Network error');
  });
  
});
