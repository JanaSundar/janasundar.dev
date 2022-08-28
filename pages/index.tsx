import { bundleMDX } from 'mdx-bundler';
import type { InferGetStaticPropsType } from 'next';
import { FC, useMemo } from 'react';
import { rehypeMetaAttribute } from '~helpers/mdx';
import { getMDXComponent } from 'mdx-bundler/client';
import { CodeBlock, Spoiler, Link } from '~components/MDX';
import dynamic from 'next/dynamic';

const Sandpack = dynamic(() => import('~components/MDX/Sandpack'), { ssr: false });

const Home: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <div className="prose prose-invert prose-xl prose-p:text-gray-400/90 py-4">
      <Component
        components={{
          pre: CodeBlock as any,
          a: Link,
          Spoiler,
          Sandpack,
        }}
      />
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const result = await bundleMDX({
    source: code,
    mdxOptions(options) {
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeMetaAttribute];
      return options;
    },
  });

  return {
    props: {
      ...result,
    },
  };
}

const code = `
# Advanced animation patterns with Framer Motion

I got **✨a lot✨** of positive feedback from my [Guide to creating animations that spark joy with Framer Motion](/posts/guide-animations-spark-joy-framer-motion/), and it's undeniable that this library has piqued many developers' interests in the world of web-based animations.

While I introduced in this previous post many of the foundational pieces that compose an animation, and how one can orchestrate multiple transitions very easily with Framer Motion, **I did not touch upon many of the more advanced features that this library provides**.

Ever wondered how to propagate animations throughout several components or to orchestrate complex layout transitions? Well, this article will tell you all about these advanced patterns and show you some of the great things one can accomplish with Framer Motion!


\`\`\`bash
npm run build

#Building Remix app in production mode...
#Built in 121ms
\`\`\`

\`\`\`bash
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
\`\`\`

\`\`\`jsx line=1,2,3 showLineNumbers=true add=1 remove=3
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
\`\`\`

## Propagation

One of the first advanced patterns I got to encounter when I tried to add some micro-interactions with Framer Motion on my projects is **propagation**. I quickly learned that it's possible to propagate **changes of variants** from a **parent motion component to any child motion component**. However, this got me confused at the beginning because it broke some of the mental models I originally had when it comes to defining animations.

Remember in [my previous blog post](https://janasundar/posts/guide-animations-spark-joy-framer-motion/) when we learned that every Framer Motion Animation needed 3 properties (props) \`initial\`, \`animate\`, \`transition\`, to define a transition/animation? Well, for this pattern **that's not entirely true**.

Framer Motion allows variants to "flow down" through **every motion child component** as long as these motion components do not have an \`animate\` prop defined. **Only the parent motion component**, in this case, **defines the** \`animate\` **prop**. The children themselves only define the behavior they intent to have for those variants.

A great example where I used propagation on this blog is the "Featured" section on the home page of this blog. When you hover it, the individual cards "glow" and this effect is made possible by this pattern. To explain what really is happening under the hood, I built this little widget below where I reproduced this effect:

<Sandpack files={{'/App.js': \`
import React from 'react';

function App() {
  const [count, setCount] = React.useState(0);
  return (
  <>
    <button type="button" onClick={() => setCount((prevCount) => prevCount - 1)} style={{padding:"0 1rem"}}>
      -
    </button>
    {count}
    <button type="button" onClick={() => setCount((prevCount) => prevCount + 1)} style={{padding:"0 1rem"}}>
      +
    </button>
  </>
  );
}

export default App;
\`}}/>

You can see that hovering (or tapping if you're on mobile) the card or even the label above it triggers the glow effect. _What kind of sorcery is this?!_
By clicking on the "perspective" button, you can see what happens under the hood:

1. There's an "invisible" motion layer covering the card and the label. This layer holds the \`whileHover\` prop which sets the variant "hover"
2. The "glow" itself is a motion component as well, however, the only thing it defines is its own \`variants\` object with a \`hover\` key.

Thus when hovering this invisible layer, we toggle the "hover" variant and any child motion component having this variant define in their \`variants\` prop will detect this change and toggle the corresponding behavior.

<details>
  <summary>Epcot Center</summary>
  <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
</details>

`;
