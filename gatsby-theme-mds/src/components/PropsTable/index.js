import React, { useState, useRef } from 'react';
import '@innovaccer/design-system/css';
import { renderToStaticMarkup } from 'react-dom/server';
import { html as beautifyHTML } from 'js-beautify';
import SyntaxHighlighter from 'react-syntax-highlighter';
import openSandbox from './sandbox.tsx';
import vsDark from 'prism-react-renderer/themes/vsDark';
import generateImports from './generateImports';
import * as DS from '@innovaccer/design-system';
import './card.css';
import { default as logo } from '../../icons/4691539_codesandbox_icon.svg';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  TabsWrapper,
  Tab,
  Heading,
} from '@innovaccer/design-system';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
} from 'react-live';
import { ArgsTable } from './Table.tsx';

const beautifyHTMLOptions = {
  indent_size: 2,
  wrap_line_length: 0,
  preserve_newlines: true,
  jslint_happy: true,
  end_with_newline: false,
  indent_inner_html: true,
  break_chained_methods: true,
  keep_array_indentation: true,
  good_stuff: true,
  indent_empty_lines: true,
};

const getRawPreviewCode = (customCode, comp) => {
  if (customCode) {
    return `${generateImports(
      customCode,
      DS,
      '@innovaccer/design-system'
    )}

${customCode}
    `;
  }
};

const rows = {
  appearance: {
    description: 'Color of the `Button`',
    name: 'appearance',
    default: 'basic',
    table: {
      defaultValue: {
        summary: '"basic"',
      },
      jsDocTags: undefined,
      type: {
        summary:
          'undefined | "primary" | "alert" | "success" | "basic" | "transparent"',
      },
    },
  },
};

const StoryComp = (props) => {
  const testRef = useRef(null);
  const [zoom, setZoom] = useState(1);

  const [activeTab, setActiveTab] = React.useState(0);

  const [jsxCode, setJsxCode] = React.useState(
    getRawPreviewCode(`() => {
  return(
    <Button>
      Button
    </Button>
  );
}`)
  );

  const html = beautifyHTML(
    renderToStaticMarkup(
      <div>
        <span>Hello</span>
      </div>
    ),
    beautifyHTMLOptions
  );
  const [htmlCode, setHtmlCode] = React.useState(`${html}`);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const renderHTMLTab = () => {
    return (
      <Tab label={<Button>HTML</Button>}>
        {renderCodeBlock(htmlCode)}
      </Tab>
    );
  };

  const renderCodeBlock = (val) => (
    <div className="mt-8">
      <style>
        {`pre {
        margin: 0;
        text-align: left;

      }`}
      </style>
      <SyntaxHighlighter
        language="javascript"
        style={vs2015}
        showLineNumbers={true}
      >
        {val}
      </SyntaxHighlighter>
    </div>
  );

  const copyCode = (val) =>
    navigator.clipboard.writeText(val);

  const CopyComp = (props) => {
    const { onClick } = props;
    return (
      <div
        style={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          zIndex: 10,
          height: '48px',
          width: '60px',
        }}
        className="d-flex align-items-center justify-content-between"
      >
        <img
          src={logo}
          className="codesandBox-icon"
          onClick={(e) => {
            e.preventDefault();
            openSandbox(jsxCode);
          }}
        />
        <Button
          appearance="transparent"
          icon="content_copy"
          largeIcon
          onClick={onClick}
          className="copy-button"
        ></Button>
      </div>
    );
  };

  const handleZoomIn = () => {
    console.log(testRef.current);
    setZoom(zoom + 0.5);
  };

  const handleZoomOut = () => {
    setZoom(zoom - 0.5);
  };

  const imports = React.useMemo(() => ({ ...DS }), []);

  return (
    <>
      <div className="pt-8 pb-8 d-flex w-50 m-auto flex-column align-items-center">
        <Heading className="mt-10 mb-6 align-self-start">
          Live Demo
        </Heading>
        <LiveProvider code={jsxCode} scope={imports}>
          <Card
            shadow="light"
            className="w-100 overflow-hidden"
          >
            <CardHeader>
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => handleZoomIn()}
                  icon="zoom_in"
                  appearance="transparent"
                  largeIcon
                  className="transformation-button"
                ></Button>
                <Button
                  onClick={() => handleZoomOut()}
                  icon="zoom_out"
                  appearance="transparent"
                  largeIcon
                  className="transformation-button"
                ></Button>
              </div>
            </CardHeader>
            <CardBody className="d-flex flex-column align-items-center">
              <div ref={testRef}>
                <LivePreview
                  className="p-8 live-preview"
                  style={{ zoom: zoom }}
                />
                <LiveError />
              </div>
              <div className="d-flex flex-row-reverse w-100 mb-6">
                <Button
                  appearance="basic"
                  className="action-button"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Hide code' : 'Show code'}
                </Button>
              </div>
            </CardBody>
          </Card>

          {isExpanded && (
            <Card
              shadow="light"
              className="w-100 overflow-hidden mt-6 live-editor-card"
            >
              <div className="DocPage-editorTabs">
                <TabsWrapper
                  activeTab={activeTab}
                  onTabChange={(tab) => setActiveTab(tab)}
                >
                  <Tab label={<Button>React</Button>}>
                    <div className="mt-8">
                      <LiveEditor theme={vsDark} />
                    </div>
                  </Tab>
                  {renderHTMLTab()}
                </TabsWrapper>
              </div>
              <CopyComp
                onClick={() => {
                  const editor = document.querySelector(
                    '.npm__react-simple-code-editor__textarea'
                  );
                  if (editor) copyCode(editor.value);
                }}
              />
            </Card>
          )}
        </LiveProvider>
        <Heading className="mt-10 align-self-start">
          Props
        </Heading>
        <ArgsTable rows={rows} />
      </div>
    </>
  );
};

export default StoryComp;
