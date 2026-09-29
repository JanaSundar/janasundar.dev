import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/** `false` during SSR and hydration, `true` afterwards — without a mount effect. */
export function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
