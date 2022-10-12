import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackThemeProvider,
  SandpackPredefinedTemplate,
} from '@codesandbox/sandpack-react';
import { CSSProperties, FC } from 'react';
import { SandpackSorcerer } from '~helpers/theme';
import setupFiles from './setupFiles';
import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import { prettifyCodes } from '~helpers/mdx';

const MotionLayout = motion(SandpackLayout);

interface SandpackProps {
  previewOnly: boolean;
  template: SandpackPredefinedTemplate;
  files: Record<string, string>;
  dependencies?: Record<string, string>;
  previewStyles?: CSSProperties;
}

const LayoutVariant: Variants = {
  offscreen: {
    opacity: 0,
  },
  onscreen: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const Sandpack: FC<SandpackProps> = ({
  files,
  template = 'react',
  dependencies = {},
  previewStyles,
  previewOnly = false,
}) => {
  const defaultFilesByTemplate: Record<SandpackPredefinedTemplate, any> = {
    react: setupFiles,
    'react-ts': '',
    vanilla: '',
    'vanilla-ts': '',
    angular: '',
    vue: '',
    vue3: '',
    svelte: '',
    solid: '',
    'test-ts': '',
  };

  return (
    <SandpackProvider
      template={template}
      files={{
        ...prettifyCodes(files),
        ...defaultFilesByTemplate[template],
      }}
      options={{
        autorun: true,
        externalResources: ['https://unpkg.com/@tailwindcss/ui/dist/tailwind-ui.min.css'],
      }}
      customSetup={{
        dependencies,
      }}
    >
      <motion.div
        className={clsx('ring-1 ring-gray-700 rounded-md overflow-hidden', {
          'sandpack-container': !previewOnly,
        })}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
      >
        <SandpackThemeProvider theme={SandpackSorcerer}>
          <MotionLayout
            variants={LayoutVariant}
            className={clsx({
              'sandpack-preview': previewOnly,
            })}
          >
            {!previewOnly ? <SandpackCodeEditor showRunButton={false} showTabs showLineNumbers={true} /> : null}

            <SandpackPreview
              showOpenInCodeSandbox={!previewOnly}
              showRefreshButton={!previewOnly}
              style={previewStyles}
            />
          </MotionLayout>
        </SandpackThemeProvider>
      </motion.div>
    </SandpackProvider>
  );
};

export default Sandpack;
