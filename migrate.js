const fs = require('fs');
const path = require('path');

const srcDir = '../frameblox_site';
const destComponents = './src/components';
const destPages = './src/pages';

const indexHtml = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');

// Helper to extract a component string block
function extractComponent(content, compName) {
    // Looks for: const CompName = (...) => { ... };
    // This is a naive extraction that looks for the start and ends at the next component or EOF
    const regex = new RegExp(\`const \${compName} = \\\\(\[^]*?=> \\\\{\[\\\\s\\\\S]*?(?=\\\\nconst |\\\\n\\\\}?;?\\\\n?// ---|\\\\n\\\\s*const root = ReactDOM)\`);
    const match = content.match(regex);
    if (match) {
        let block = match[0];
        // Replace window.Motion with framer-motion imports if used
        block = block.replace(/const \{ motion, AnimatePresence \} = window\.Motion;/, '');
        block = block.replace(/const \{.*?\} = React;/, '');
        return block;
    }
    return null;
}

const componentsToExtract = ['CustomCursor', 'ScrollProgress', 'Nav', 'Footer'];
let importsForApp = \`import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Nav from './components/Nav';
import Footer from './components/Footer';
\`;

componentsToExtract.forEach(comp => {
    let block = extractComponent(indexHtml, comp);
    if (block) {
        let fileContent = \`import React, { useState, useEffect, useRef } from 'react';\nimport { motion, AnimatePresence } from 'framer-motion';\n\n\${block}\n\nexport default \${comp};\`;
        fs.writeFileSync(path.join(destComponents, \`\${comp}.jsx\`), fileContent);
        console.log(\`Migrated \${comp}\`);
    } else {
        console.log(\`Could not find \${comp}\`);
    }
});

// For App.jsx
const appContent = \`${importsForApp}
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <CustomCursor />
        <ScrollProgress />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;\`;

fs.writeFileSync('./src/App.jsx', appContent);
console.log('Generated App.jsx');

