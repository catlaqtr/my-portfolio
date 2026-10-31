import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export interface Tab {
  label: string;
  content: ReactNode;
}

/**
 * RPG-menu style tabs (WAI-ARIA tabs pattern): arrow keys, Home and End move
 * between tabs; the panel below is focusable so it can be scrolled by keyboard.
 */
function Tabs({ tabs, label }: { tabs: Tab[]; label: string }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    const next = (i + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const moves: Record<string, number> = {
      ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: tabs.length - 1,
    };
    if (e.key in moves) {
      e.preventDefault();
      select(moves[e.key]);
    }
  };

  return (
    <div>
      <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className="flex flex-wrap gap-1.5 border-b-[3px] border-ink">
        {tabs.map((tab, i) => {
          const selected = i === active;
          return (
            <button
              key={tab.label}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`-mb-[3px] border-[3px] border-b-0 border-ink px-3 pb-1 pt-1.5 font-pixel text-[18px] uppercase [word-spacing:0.4em] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ember/70 ${
                selected
                  ? "bg-ember text-ink shadow-[inset_0_3px_0_#ffd09a]"
                  : "bg-[#7a5234] text-paper hover:bg-[#8c603e]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`${id}-panel-${i}`}
          aria-labelledby={`${id}-tab-${i}`}
          hidden={i !== active}
          tabIndex={0}
          className="pt-5 focus-visible:outline-none"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
