/**
 * Утилиты для работы с датами на сервере
 */

/**
 * Получает текущий timestamp в ISO формате
 */
export const getCurrentTimestamp = (): string => {
  return new Date().toISOString();
};
