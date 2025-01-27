import { ApiService } from './api.service'; // Ajuste o caminho conforme necessário

describe('ApiService', () => {
  let fetchMock;

  beforeEach(() => {
    // Cria um mock do método fetch
    fetchMock = jest.spyOn(global, 'fetch');
  });

  afterEach(() => {
    // Limpa o mock após cada teste
    fetchMock.mockRestore();
  });

  it('deve retornar dados quando a API é chamada com sucesso', async () => {
    const mockData = [{ id: 1, name: 'Test Object' }];
    
    // Mock da resposta do fetch
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const data = await ApiService.validationApi();
    
    expect(data).toEqual(mockData);
    expect(fetchMock).toHaveBeenCalledWith("https://api.restful-api.dev/objects");
  });

  it('deve lançar um erro quando a API falha', async () => {
    // Mock da falha no fetch
    fetchMock.mockRejectedValueOnce(new Error('Network error'));

    await expect(ApiService.validationApi()).rejects.toThrow('Erro ao validar com o backend.');
    expect(fetchMock).toHaveBeenCalledWith("https://api.restful-api.dev/objects");
  });
});