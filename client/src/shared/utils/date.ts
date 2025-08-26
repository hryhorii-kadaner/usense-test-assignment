/**
 * Утилиты для форматирования дат с использованием Intl API
 */

export const formatDate = (dateString: string | Date, locale: string = 'uk-UA'): string => {
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    
    if (isNaN(date.getTime())) {
      return 'Невідома дата';
    }

    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Невідома дата';
  }
};

export const formatDateTime = (dateString: string | Date, locale: string = 'uk-UA'): string => {
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    
    if (isNaN(date.getTime())) {
      return 'Невідома дата';
    }

    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch (error) {
    console.error('Error formatting date time:', error);
    return 'Невідома дата';
  }
};

export const formatRelativeTime = (dateString: string | Date, locale: string = 'uk-UA'): string => {
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    const now = new Date();
    
    if (isNaN(date.getTime())) {
      return 'Невідома дата';
    }

    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    // Less than a minute
    if (diffInSeconds < 60) {
      return 'щойно';
    }
    
    // Less than an hour
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-minutes, 'minute');
    }
    
    // Less than a day
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-hours, 'hour');
    }
    
    // Less than a week
    if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-days, 'day');
    }
    
    // Fallback to regular date format
    return formatDate(dateString, locale);
    
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return formatDate(dateString, locale);
  }
};

export const formatDateInput = (dateString: string | Date): string => {
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    
    if (isNaN(date.getTime())) {
      return '';
    }

    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date for input:', error);
    return '';
  }
};

export const formatFullDate = (dateString: string | Date, locale: string = 'uk-UA'): string => {
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    
    if (isNaN(date.getTime())) {
      return 'Невідома дата';
    }

    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch (error) {
    console.error('Error formatting full date:', error);
    return 'Невідома дата';
  }
};

// Алиасы для обратной совместимости
export const formatRelativeDate = formatRelativeTime;
export const formatShortDate = formatDate;
