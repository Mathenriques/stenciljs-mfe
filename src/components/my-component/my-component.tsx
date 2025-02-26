import { Component, State, h } from '@stencil/core/internal';
import { ApiService } from '../../services/api.service';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  @State() data: any[] = [];
  @State() validationError: string = '';
  @State() isLoading: boolean = true;

  componentWillLoad() {
    ApiService.validationApi()  
    .then(data => {
        console.log("Dados recebidos:", data);
        this.data = data;
        this.isLoading = false;
    })
    .catch(error => {
        console.error("Erro ao validar com o backend:", error.message);
    });
}

  render() {
    if (this.isLoading) {
      return <div>Carregando...</div>;
    }

    if (this.validationError) {
      return <div style={{ color: 'red' }}>{this.validationError}</div>;
    }

    return (
      <div>
        <h1>Lista de Produtos</h1>
        <ul>
          {Array.isArray(this.data) && this.data.map(product => (
            <li>
              <strong>{product.name}</strong>
              {product.data && (
                <ul>
                  {Object.entries(product.data).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
