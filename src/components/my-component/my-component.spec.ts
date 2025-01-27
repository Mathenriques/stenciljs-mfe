import { newSpecPage } from "@stencil/core/testing";
import { ApiService } from "../../services/api.service";
import { MyComponent } from "./my-component";

describe('my-component', () => {
  let apiServiceMock;
  let validationApiMock;
  let page;

  beforeEach(async () => {
    // Criação do mock do ApiService antes da inicialização da página
    apiServiceMock = {
      validationApi: jest.fn(),
    };
    (ApiService as any) = apiServiceMock;

    // Inicializa a página com o componente
    page = await newSpecPage({
      components: [MyComponent],
      html: `<my-component></my-component>`,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should build', () => {
    expect(new MyComponent()).toBeTruthy();
  });

  it('should render "Carregando..." while loading', async () => {
    page.rootInstance.isLoading = true; // Define o estado de carregamento
    await page.waitForChanges(); // Aguarda as mudanças serem processadas

    expect(page.root).toEqualHtml(`
      <my-component>
        <mock:shadow-root>
          <div>Carregando...</div>
        </mock:shadow-root>
      </my-component>
    `);
  });

  it('should render an error if api return error ', async () => {
    validationApiMock = jest.spyOn(ApiService, 'validationApi');
    validationApiMock.mockRejectedValue(new Error('Im an error :('));
    await page.rootInstance.componentWillLoad();
    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <my-component>
        <mock:shadow-root>
          <div style="color: red">Im an error :(</div>
        </mock:shadow-root>
      </my-component>
    `);
  })

  it('deve renderizar a lista de produtos quando a API for bem-sucedida', async () => {
    const mockData = [
      { id: 1, name: 'Produto 1', data: { price: '$10', stock: '10' } },
      { id: 2, name: 'Produto 2', data: { price: '$20', stock: '5' } },
    ];
    apiServiceMock.validationApi.mockResolvedValue(mockData);

    const page = await newSpecPage({
      components: [MyComponent],
      html: `<my-component></my-component>`,
    });

    // Espera o componente ser carregado
    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <my-component>
        <mock:shadow-root>
          <div>
            <h1>Lista de Produtos</h1>
            <ul>
              <li>
                <strong>Produto 1</strong>
                <ul>
                  <li><strong>price:</strong> $10</li>
                  <li><strong>stock:</strong> 10</li>
                </ul>
              </li>
              <li>
                <strong>Produto 2</strong>
                <ul>
                  <li><strong>price:</strong> $20</li>
                  <li><strong>stock:</strong> 5</li>
                </ul>
              </li>
            </ul>
          </div>
        </mock:shadow-root>
      </my-component>
    `);
  });
});