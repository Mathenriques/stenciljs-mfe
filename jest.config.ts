module.exports = {
  preset: '@stencil/core/testing',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  coverageDirectory: 'coverage',
  collectCoverage: true, // Habilita a coleta de cobertura
  collectCoverageFrom: [
    'src/components/**/*.tsx', // Ajuste o caminho conforme necessário
    '!src/components/**/*.spec.tsx', // Ignore arquivos de teste
    '!src/components/**/index.ts', // Ignore arquivos de índice
  ],
  coverageReporters: ['text', 'lcov'], // Tipos de relatórios de cobertura
};