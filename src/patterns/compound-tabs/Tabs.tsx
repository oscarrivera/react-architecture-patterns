import {
  createContext,
  useContext,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type TabsContextValue = {
  selected: string;
  setSelected: (id: string) => void;
  baseId: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error('Tabs compound components require Tabs.Root');
  }
  return ctx;
}

type RootProps = {
  defaultValue: string;
  children: ReactNode;
};

function Root({ defaultValue, children }: RootProps) {
  const [selected, setSelected] = useState(defaultValue);
  const baseId = useId();
  const value = useMemo(
    () => ({ selected, setSelected, baseId }),
    [selected, baseId],
  );
  return (
    <TabsContext.Provider value={value}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

function List({ children }: { children: ReactNode }) {
  return (
    <div className="tabs-list" role="tablist">
      {children}
    </div>
  );
}

function Tab({ id, children }: { id: string; children: ReactNode }) {
  const { selected, setSelected, baseId } = useTabsContext();
  const isSelected = selected === id;
  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${id}`}
      aria-selected={isSelected}
      aria-controls={`${baseId}-panel-${id}`}
      onClick={() => setSelected(id)}
    >
      {children}
    </button>
  );
}

function Panel({ id, children }: { id: string; children: ReactNode }) {
  const { selected, baseId } = useTabsContext();
  if (selected !== id) {
    return null;
  }
  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${id}`}
      aria-labelledby={`${baseId}-tab-${id}`}
    >
      {children}
    </div>
  );
}

export const Tabs = {
  Root,
  List,
  Tab,
  Panel,
};
