import { useRef, useEffect } from 'react';

export function useOutsideClick(
  handler: () => void,
  listenerCapturing: boolean = true,
) {
  const ref = useRef<HTMLDivElement>(null!);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        const target = e.target as Node;
        if (
          (target as HTMLElement).tagName === 'INPUT' &&
          (target as HTMLInputElement).type === 'file'
        )
          return;

        const portals = document.querySelectorAll('[data-modal-portal]');
        for (const portal of portals) {
          if (portal.contains(target)) return;
        }

        if (ref.current && !ref.current.contains(e.target as Node)) handler();
      }

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handler();
      };

      document.addEventListener('click', handleClick, listenerCapturing);
      document.addEventListener('keydown', handleEscape, listenerCapturing);

      return () => {
        document.removeEventListener('click', handleClick, listenerCapturing);
        document.removeEventListener(
          'keydown',
          handleEscape,
          listenerCapturing,
        );
      };
    },
    [handler, listenerCapturing],
  );

  return ref;
}
