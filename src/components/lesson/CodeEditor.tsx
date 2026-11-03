import { useEffect, useRef } from 'react';
import { EditorState, Compartment } from '@codemirror/state';
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  drawSelection,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
} from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from '@codemirror/language';
import { autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { useAppStore } from '@/app/store';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  ariaLabel?: string;
  className?: string;
  minHeight?: string;
}

const lightTheme = EditorView.theme({
  '&': { backgroundColor: 'transparent', color: 'hsl(240 10% 12%)' },
  '.cm-content': { caretColor: 'hsl(0 0% 9%)', padding: '12px 0' },
  '.cm-gutters': { backgroundColor: 'transparent', color: 'hsl(240 4% 55%)' },
  '&.cm-focused .cm-cursor': { borderLeftColor: 'hsl(0 0% 9%)' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: 'hsl(0 0% 9% / 0.12)',
  },
  '.cm-activeLine': { backgroundColor: 'hsl(240 5% 96% / 0.7)' },
  '.cm-activeLineGutter': { backgroundColor: 'transparent' },
});

const darkChrome = EditorView.theme(
  {
    '&': { backgroundColor: 'transparent' },
    '.cm-gutters': { backgroundColor: 'transparent' },
  },
  { dark: true },
);

export function CodeEditor({
  value,
  onChange,
  readOnly = false,
  ariaLabel = 'Editor del codice',
  className,
  minHeight = '180px',
}: CodeEditorProps) {
  const host = useRef<HTMLDivElement | null>(null);
  const view = useRef<EditorView | null>(null);
  const editable = useRef(new Compartment());
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const theme = useAppStore((state) => state.settings?.theme ?? 'system');

  useEffect(() => {
    if (!host.current) return;

    const extensions = [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      history(),
      foldGutter(),
      drawSelection(),
      dropCursor(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      rectangularSelection(),
      crosshairCursor(),
      highlightActiveLine(),
      keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap, ...foldKeymap, ...completionKeymap, indentWithTab]),
      javascript({ jsx: false, typescript: false }),
      EditorView.lineWrapping,
      EditorView.contentAttributes.of({ 'aria-label': ariaLabel, spellcheck: 'false' }),
      editable.current.of(EditorState.readOnly.of(readOnly)),
      theme === 'dark' ? [oneDark, darkChrome] : lightTheme,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) onChangeRef.current(update.state.doc.toString());
      }),
    ];

    view.current = new EditorView({
      state: EditorState.create({ doc: value, extensions }),
      parent: host.current,
    });

    return () => {
      view.current?.destroy();
      view.current = null;
    };
    // The editor is created once per lesson step; content updates flow through
    // the effect below so typing never recreates the view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ariaLabel, readOnly, theme]);

  useEffect(() => {
    const current = view.current;
    if (!current) return;
    if (current.state.doc.toString() === value) return;
    current.dispatch({
      changes: { from: 0, to: current.state.doc.length, insert: value },
    });
  }, [value]);

  return (
    <div
      ref={host}
      className={cn(
        'overflow-hidden rounded-md border border-border bg-card text-sm [&_.cm-scroller]:overflow-auto',
        className,
      )}
      style={{ minHeight }}
    />
  );
}
