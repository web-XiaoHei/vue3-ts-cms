import { useStore } from '@/store';
export function usePermission(pageName: string, handleName: string) {
  const store = useStore();
  const verifyPermission = `system:${pageName}:${handleName}`;
  const permission = store.state.login.permission;

  return !!permission.find((item) => item === verifyPermission);
}
