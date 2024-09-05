import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';

const CodeEditor = () => {
  const [language, setLanguage] = useState('cpp');

  const handleEditorMount = (editor, monaco) => {
    // Optionally, configure additional editor features here
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
      <div style={{ 
        padding: '10px 20px', 
        backgroundColor: '#282c34', 
        borderBottom: '1px solid #444', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            fontSize: '16px',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #444',
            backgroundColor: '#1e1e1e',
            color: '#c9d1d9',
            outline: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
      </div>
      <div style={{ flex: 1 }}>
        <Editor
          height="100%"
          language={language}
          defaultValue="// Your code here"
          onMount={handleEditorMount}
          theme="vs-dark"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
