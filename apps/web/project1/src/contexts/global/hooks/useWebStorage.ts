import { todoConnector } from '@/utils/web-storage/todo';
import { tokenConnector } from '@/utils/web-storage/token';

import { useSyncWebStorage } from './useSyncWebStorage';

export const useWebStorage = () => {
  const token = useSyncWebStorage(tokenConnector);
  const todoList = useSyncWebStorage(todoConnector);

  return { token, todoList };
};
