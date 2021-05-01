import React, { useState, useRef, useEffect } from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import Editor from '@monaco-editor/react';
import { examples } from './Examples';

const EditorComponent = ({
  setEditorRef,
  handleButtonChangeState,
  language,
  setLanguage,
}) => {
  const [theme, setTheme] = useState('light');
  const editorRef = useRef(null);

  const handleEditorDidMount = editor => {
    editorRef.current = editor;
    setEditorRef(editorRef);
  };

  const handleChangeEditorTheme = e => {
    setTheme(e.target.value);
  };

  const handleChangeEditorLanguage = e => {
    setLanguage(e.target.value);
  };

  return (
    <>
      <label>
        Тема:
        <select
          value={theme}
          onChange={handleChangeEditorTheme}
          className='form-control'
        >
          <option value='light'>Світла</option>
          <option value='vs-dark'>Темна</option>
        </select>
      </label>
      <label>
        Мова програмування:
        <select
          value={language}
          onChange={handleChangeEditorLanguage}
          className='form-control'
        >
          <option value='javascript'>Java Script</option>
          <option value='typescript'>Type Script</option>
          <option value='html'>HTML</option>
          <option value='python'>Python</option>
          <option value='java'>Java</option>
        </select>
      </label>
      <Editor
        height='80vh'
        theme={theme}
        language={language}
        loading={<Spinner />}
        value={examples[language]}
        onChange={handleButtonChangeState}
        onMount={handleEditorDidMount}
      />
    </>
  );
};

export default EditorComponent;
