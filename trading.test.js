import { executeOrder } from './trading.js';

describe('Trading Module', () => {
  test('should execute order successfully', async () => {
    const params = {
      symbol: 'BTC/USDT',
      type: 'limit',
      side: 'buy',
      amount: 0.1,
      price: 30000
    };
    const order = await executeOrder('binance', params);
    expect(order).toHaveProperty('id');
  });

  test('should throw error for invalid order', async () => {
    const params = {
      symbol: 'INVALID',
      type: 'limit',
      side: 'buy',
      amount: 0,
      price: 30000
    };
    await expect(executeOrder('binance', params)).rejects.toThrow();
  });

  // Added test: Network error simulation
  test('should handle network errors gracefully', async () => {
    const params = {
      symbol: 'BTC/USDT',
      type: 'limit',
      side: 'buy',
      amount: 0.1,
      price: 30000
    };
    await expect(executeOrder('binance', params)).rejects.toThrow('Network error');
  });

  // Added test: Insufficient funds error
  test('should handle insufficient balance errors', async () => {
    const params = {
      symbol: 'BTC/USDT',
      type: 'limit',
      side: 'buy',
      amount: 1000000, // Excessive amount to trigger insufficient funds
      price: 30000
    };
    await expect(executeOrder('binance', params)).rejects.toThrow('Insufficient funds');
  });
});
