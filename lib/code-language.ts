/** Display names for languages whose fence tag reads badly on its own. Anything else shows as written. */
const names: Record<string, string> = {
  bash: 'Terminal',
  sh: 'Terminal',
  shell: 'Terminal',
  diff: 'Diff',
  plaintext: 'Text',
  text: 'Text',
};

export const languageLabel = (lang?: string) => (lang ? (names[lang] ?? lang) : 'Text');
