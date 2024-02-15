import { visit } from 'unist-util-visit';
import prettier from 'prettier';
import ParserBabel from 'prettier/plugins/babel'
import prettierPluginEstree from "prettier/plugins/estree";

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

export const prettifyCodes = async (files: Record<string, string> = {}) => {
  const prettifiedFiles: Record<string, string> = {}

  for (const file of Object.values(files)) {
    prettifiedFiles[file] = await prettier.format(file.trim(), {
      parser: 'babel',
      plugins: [
        ParserBabel,
        prettierPluginEstree
      ],
      useTabs: false,
      jsxSingleQuote: true,
      semi: true,
      singleQuote: true,
    });
  }

  return prettifiedFiles;
};
