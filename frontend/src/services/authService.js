import { api } from './api';

export async function login(email, senha) {
  //const { data } = await api.post('/usuarios/login', { email, senha });
  // return data;
  return {
    token: 'mock-token',
    usuario: {
      id: 1,
      nome: 'Administrador (Teste)',
      email: 'admin@sistema.com',
      tipo: 'admin',
    },
  };
}

export async function register(nome, email, senha, tipo) {
  const { data } = await api.post('/usuarios/', { nome, email, senha, tipo });
  return data;
}
