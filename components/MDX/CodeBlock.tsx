import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import React, { FC, isValidElement } from 'react';
import rangeParser from 'parse-numeric-range';
import clsx from 'clsx';
import Clipboard from '~components/SVG/Clipboard';
import { Sorcerer } from '~helpers/theme';

function isEmpty(arr: number[]) {
  return arr.length === 0;
}

interface CodeBlockProps {
  children: React.ReactNode;
  [x: string]: any;
}

const CodeBlock: FC<CodeBlockProps> = ({ children, line, add, remove, showLineNumbers, title }) => {
  if (!children || !isValidElement(children)) {
    return null;
  }

  const code = children.props.children as string;
  const language = children.props.className?.replace('language-', '').trim() as Language;
  title = ['sh', 'bash'].includes(language) ? 'Terminal' : title;

  const linesToFocus = rangeParser(line || '');
  const focusAll = isEmpty(linesToFocus);

  const linesToAdd = rangeParser(add || '');
  const linesToRemove = rangeParser(remove || '');
  const hasDiffLines = !isEmpty(linesToAdd) || !isEmpty(linesToRemove);

  const CALLOUT = /__(.*?)__/g;

  return (
    <Highlight {...defaultProps} code={code.trim()} language={language} theme={Sorcerer}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={clsx(
            className,
            {
              'has-focus-lines': !focusAll,
              'has-diffs-lines': hasDiffLines,
            },
            'p-4 overflow-x-auto overflow-y-hidden font-mono space-y-2 rounded-md ring-1 ring-gray-700 shadow-md'
          )}
          data-line-numbers={!!showLineNumbers}
          data-lang={language}
          style={style}
        >
          <div
            className={clsx('sticky left-0 flex justify-between items-center opacity-60', {
              'px-4': !!showLineNumbers,
            })}
          >
            <span className="text-xs">{title}</span>
            <Clipboard code={code} />
          </div>
          <code>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              lineProps.className = clsx(lineProps.className, {
                'line-focus highlight-line': !focusAll && linesToFocus.includes(i + 1),
                'has-add-line': hasDiffLines && linesToAdd.includes(i),
                'has-remove-line': hasDiffLines && linesToRemove.includes(i),
              });

              const lineNumber = () => {
                if (linesToAdd.includes(i)) return '+';
                else if (linesToRemove.includes(i)) return '-';
                return i + 1;
              };

              return (
                <span key={i} {...lineProps} data-line-number={lineNumber()}>
                  {line.map((token, key) => {
                    const hasWordHighlight = CALLOUT.test(token.content);
                    if (hasWordHighlight) {
                      token.content = token.content.replace(CALLOUT, (_, text) => text);
                    }

                    const tokenProps = getTokenProps({ token, key });
                    tokenProps.className = clsx(tokenProps.className, {
                      'highlight-word': hasWordHighlight,
                    });

                    return <span key={key} {...tokenProps} />;
                  })}
                </span>
              );
            })}
          </code>
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
