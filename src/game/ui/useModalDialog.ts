import { useEffect, useRef, type SyntheticEvent } from "react";

/**
 * Opens a native <dialog> as a modal while the component is mounted. The
 * browser then traps focus, makes the page behind it inert, and returns
 * focus afterwards. Escape is routed to `onClose` so React stays in charge.
 * Mark the element that should receive focus first with `data-autofocus`
 * (showModal() would otherwise pick the first focusable element).
 */
export function useModalDialog(onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    return () => dialog.close();
  }, []);

  const onCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  return { ref, onCancel };
}

/** Respect the user's reduced-motion preference for typewriter text etc. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" && (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
