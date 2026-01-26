
// Проверка поддержки ориентации в браузере
const isOrientationSupported = 'orientation' in screen;

// Блокировка и разблокировка ориентации
const lockOrientation = () => Telegram.WebApp.lockOrientation();
const unlockOrientation = () => Telegram.WebApp.unlockOrientation();

// Проверка текущей ориентации
const checkOrientation = () => {
  // Работа только с мобильными устройствами
  if (!['ios', 'android'].includes(Telegram.WebApp.platform)) {
    return false;
  }

  // Блокировка при портретной (вертикальной) ориентации
  if (screen.orientation.type.startsWith('portrait')) {
    lockOrientation();
  // Разблокировка при ландшафтной (горизонтальной) ориентации
  } else if (screen.orientation.type.startsWith('landscape')) {
    unlockOrientation();
  }
};

// Установка слушателей событий
const setupOrientationListeners = () => {
  if (!isOrientationSupported) {
    return false;
  }

  // Прослушка изменения ориентации в реальном времени
  window.addEventListener('orientationchange', checkOrientation);

  // Прослушка событий сворачивания и разворачивания приложения
  Telegram.WebApp.onEvent('activated', checkOrientation);
  Telegram.WebApp.onEvent('deactivated', unlockOrientation);
}

// Очистка слушателей событий
const cleanupOrientationListeners = () => {
  if (!isOrientationSupported) {
    return false;
  }

  // Отписка от слушателей изменения ориентации
  window.removeEventListener('orientationchange', checkOrientation);

  // Отписка от слушателей сворачивания и разворачивания
  Telegram.WebApp.offEvent('activated', checkOrientation);
  Telegram.WebApp.offEvent('deactivated', unlockOrientation);
};

// Инициализация
checkOrientation();
setupOrientationListeners();

// Очистка (при необходимости)
// cleanupOrientationListeners();
