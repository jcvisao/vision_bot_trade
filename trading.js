import { getBalance, executeOrder } from './trading';
import ccxt from 'ccxt';

// Mock da API da ccxt
jest.mock('ccxt', () => {
  const originalModule = jest.requireActual('ccxt');
  return {
    ...originalModule,
    binance: jest.fn().mockImplementation(() => ({
      fetchBalance: jest.fn(),
      createOrder: jest.fn(),
    })),
  };
});

describe('Funções de Trading', () => {
  test('Testa a função de obter saldo com sucesso', async () => {
    const mockBalance = { total: 1000 };
    ccxt.binance.mockImplementationOnce(() => ({
      fetchBalance: jest.fn().mockResolvedValue(mockBalance),
    }));

    const balance = await getBalance('binance');
    expect(balance).toHaveProperty('total');
    expect(balance.total).toBe(1000);
  });

  test('Testa a função de obter saldo com erro', async () => {
    const errorMessage = 'Error fetching balance';
    ccxt.binance.mockImplementationOnce(() => ({
      fetchBalance: jest.fn().mockRejectedValue(new Error(errorMessage)),
    }));

    await expect(getBalance('binance')).rejects.toThrowError(errorMessage);
  });

  test('Testa a criação de uma ordem de compra com sucesso', async () => {
    const mockOrder = { id: '12345', symbol: 'BTC/USDT', status: 'open' };
    const orderParams = { symbol: 'BTC/USDT', type: 'limit', side: 'buy', amount: 0.1, price: 30000 };

    ccxt.binance.mockImplementationOnce(() => ({
      createOrder: jest.fn().mockResolvedValue(mockOrder),
    }));

    const order = await executeOrder('binance', orderParams);
    expect(order).toHaveProperty('id');
    expect(order.status).toBe('open');
  });

  test('Testa a criação de uma ordem de compra com erro', async () => {
    const errorMessage = 'Error executing order';
    const orderParams = { symbol: 'BTC/USDT', type: 'limit', side: 'buy', amount: 0.1, price: 30000 };

    ccxt.binance.mockImplementationOnce(() => ({
      createOrder: jest.fn().mockRejectedValue(new Error(errorMessage)),
    }));

    await expect(executeOrder('binance', orderParams)).rejects.toThrowError(errorMessage);
  });
});
