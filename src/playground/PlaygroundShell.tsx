"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  registry,
  findVariant,
  getDefaultSelection,
  Category,
  ComponentEntry,
} from "./registry";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import styles from "./playground.module.scss";

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function ComponentIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EmptyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="9" y1="9" x2="15" y2="15" />
      <line x1="15" y1="9" x2="9" y2="15" />
    </svg>
  );
}

interface Selection {
  categoryId: string;
  componentId: string;
  variantId: string;
}

function PlaygroundContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(registry.map((c) => c.id))
  );

  const getSelectionFromUrl = useCallback((): Selection => {
    const cat = searchParams.get("cat");
    const comp = searchParams.get("comp");
    const variant = searchParams.get("v");

    if (cat && comp && variant) {
      const found = findVariant(cat, comp, variant);
      if (found) {
        return { categoryId: cat, componentId: comp, variantId: variant };
      }
    }
    return getDefaultSelection();
  }, [searchParams]);

  const [selection, setSelection] = useState<Selection>(getSelectionFromUrl);

  useEffect(() => {
    setSelection(getSelectionFromUrl());
  }, [getSelectionFromUrl]);

  const updateUrl = useCallback(
    (sel: Selection) => {
      const params = new URLSearchParams();
      params.set("cat", sel.categoryId);
      params.set("comp", sel.componentId);
      params.set("v", sel.variantId);
      router.replace(`/playground?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const selectVariant = (
    categoryId: string,
    componentId: string,
    variantId: string
  ) => {
    const newSelection = { categoryId, componentId, variantId };
    setSelection(newSelection);
    updateUrl(newSelection);
  };

  const current = findVariant(
    selection.categoryId,
    selection.componentId,
    selection.variantId
  );

  return (
    <div className={styles.shell}>
      <div className={styles.siteBreadcrumbRow}>
        <Breadcrumb current="Playground" flush />
      </div>
      <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1>Component Playground</h1>
          <p>{registry.reduce((acc, c) => acc + c.items.length, 0)} components</p>
        </div>

        <nav className={styles.sidebarTree} aria-label="Component tree">
          {registry.map((category) => (
            <CategoryNode
              key={category.id}
              category={category}
              expanded={expandedCategories.has(category.id)}
              onToggle={() => toggleCategory(category.id)}
              selection={selection}
              onSelect={selectVariant}
            />
          ))}
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.previewHeader}>
          <div className={styles.breadcrumb}>
            {current ? (
              <>
                <span>{current.category.label}</span>
                <span className={styles.separator}>/</span>
                <span>{current.component.label}</span>
                <span className={styles.separator}>/</span>
                <span>{current.variant.label}</span>
              </>
            ) : (
              <span>Select a component</span>
            )}
          </div>
        </header>

        <div className={styles.previewContainer}>
          {current ? (
            <div
              className={styles.previewSurface}
              style={{ minHeight: current.variant.minHeight ?? 400 }}
            >
              {current.variant.render()}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <EmptyIcon />
              <p>Select a component variant from the sidebar to preview it.</p>
            </div>
          )}
        </div>
      </main>
      </div>
    </div>
  );
}

interface CategoryNodeProps {
  category: Category;
  expanded: boolean;
  onToggle: () => void;
  selection: Selection;
  onSelect: (categoryId: string, componentId: string, variantId: string) => void;
}

function CategoryNode({
  category,
  expanded,
  onToggle,
  selection,
  onSelect,
}: CategoryNodeProps) {
  return (
    <div className={styles.category}>
      <button
        className={styles.categoryHeader}
        onClick={onToggle}
        aria-expanded={expanded}
      >
        <ChevronIcon
          className={`${styles.chevron} ${expanded ? styles.expanded : ""}`}
        />
        {category.label}
      </button>

      {expanded && (
        <div className={styles.categoryItems}>
          {category.items.map((item) => (
            <ComponentNode
              key={item.id}
              categoryId={category.id}
              component={item}
              selection={selection}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface ComponentNodeProps {
  categoryId: string;
  component: ComponentEntry;
  selection: Selection;
  onSelect: (categoryId: string, componentId: string, variantId: string) => void;
}

function ComponentNode({
  categoryId,
  component,
  selection,
  onSelect,
}: ComponentNodeProps) {
  return (
    <div className={styles.componentGroup}>
      <div className={styles.componentLabel}>
        <ComponentIcon className={styles.componentIcon} />
        {component.label}
      </div>
      <div className={styles.variantList}>
        {component.variants.map((variant) => {
          const isActive =
            selection.categoryId === categoryId &&
            selection.componentId === component.id &&
            selection.variantId === variant.id;

          return (
            <button
              key={variant.id}
              className={`${styles.variantButton} ${isActive ? styles.active : ""}`}
              onClick={() => onSelect(categoryId, component.id, variant.id)}
              aria-current={isActive ? "page" : undefined}
            >
              <FileIcon className={styles.variantIcon} />
              {variant.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function PlaygroundShell() {
  return (
    <Suspense
      fallback={
        <div className={styles.shell}>
          <div className={styles.siteBreadcrumbRow}>
            <Breadcrumb current="Playground" flush />
          </div>
          <div className={styles.container}>
            <aside className={styles.sidebar}>
              <div className={styles.sidebarHeader}>
                <h1>Component Playground</h1>
                <p>Loading...</p>
              </div>
            </aside>
            <main className={styles.main}>
              <div className={styles.emptyState}>
                <p>Loading components...</p>
              </div>
            </main>
          </div>
        </div>
      }
    >
      <PlaygroundContent />
    </Suspense>
  );
}
