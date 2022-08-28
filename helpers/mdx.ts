import { visit } from 'unist-util-visit';
import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';

const re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g;

export const rehypeMetaAttribute = () => {
  return (tree: any) => {
    visit(tree, 'element', visitor);
  };

  function visitor(node: any, index: any, parentNode: any) {
    let match;

    if (node.tagName === 'code' && node.data && node.data.meta) {
      re.lastIndex = 0; // Reset regex.

      while ((match = re.exec(node.data.meta))) {
        node.properties[match[1]] = match[2] || match[3] || match[4] || '';
        parentNode.properties[match[1]] = match[2] || match[3] || match[4] || '';
      }
    }
  }
};

export const prettifyCodes = (files: Record<string, string> = {}) => {
  return Object.keys(files).reduce((acc, file) => {
    acc[file] = prettier.format(files[file].trim(), {
      parser: 'babel',
      plugins: [parserBabel],
      useTabs: false,
      jsxSingleQuote: true,
      semi: true,
      singleQuote: true,
      
    });
    return acc;
  }, {} as Record<string, string>);
};
