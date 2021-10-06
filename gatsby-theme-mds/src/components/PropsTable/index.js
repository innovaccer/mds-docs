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
  Icon,
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

const StoryComp = ({
  componentData,
  showArgsTable = true,
  htmlData,
  propData = {},
}) => {
  const testRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [activeTab, setActiveTab] = React.useState(0);

  const [jsxCode, setJsxCode] = React.useState(
    getRawPreviewCode(componentData)
  );

  const html = beautifyHTML(htmlData,
    beautifyHTMLOptions
  );
  const [htmlCode, setHtmlCode] = useState(html);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeButton, setActiveButton] = useState('React');

  const renderHTMLTab = () => {
    return (
      <Tab label={<Button>HTML</Button>}>
        {renderCodeBlock(htmlCode)}
      </Tab>
    );
  };

  const renderCodeBlock = (val) => (
    <div>
      <style>
        {`pre {
        margin: 0;
        text-align: left;

      }`}
      </style>
      <SyntaxHighlighter
        language='javascript'
        style={vs2015}
        showLineNumbers={true}
      >
        {val}
      </SyntaxHighlighter>
    </div>
  );

  const copyCode = (val) =>
    navigator.clipboard.writeText(val);

  const CopyCode = (props) => {
    const { onClick } = props;
    return (
      <div className='ml-auto d-flex'>
        <img
          src={logo}
          className='codesandBox-icon mr-6 align-self-center'
          onClick={(e) => {
            e.preventDefault();
            openSandbox(jsxCode);
          }}
        />
        <Icon
          name='content_copy'
          size={20}
          appearance='white'
          onClick={onClick}
          className='align-self-center cursor-pointer'
        />
      </div>
    );
  };

  const handleZoomIn = () => {
    setZoom(zoom + 0.5);
  };

  const handleZoomOut = () => {
    setZoom(zoom - 0.5);
  };

  const showLiveEditorContent = () => {
    if (activeButton === 'React') {
      return (
        <div>
          <LiveEditor theme={vsDark} />
        </div>
      );
    } else {
      return renderCodeBlock(htmlCode);
    }
  };

  const imports = React.useMemo(() => ({ ...DS }), []);

  return (
    <>
      <div className='pt-8 pb-8 d-flex w-100 m-auto flex-column align-items-center'>
        <LiveProvider code={jsxCode} scope={imports}>
          <Card
            shadow='light'
            className='w-100 overflow-hidden'
          >
            <CardHeader>
              <div className='d-flex justify-content-end'>
                <Button
                  onClick={() => handleZoomIn()}
                  icon='zoom_in'
                  appearance='transparent'
                  largeIcon
                  className='transformation-button'
                ></Button>
                <Button
                  onClick={() => handleZoomOut()}
                  icon='zoom_out'
                  appearance='transparent'
                  largeIcon
                  className='transformation-button'
                ></Button>
              </div>
            </CardHeader>
            <CardBody className='d-flex flex-column align-items-center'>
              <div ref={testRef}>
                <LivePreview
                  className='p-8 live-preview'
                  style={{ zoom: zoom }}
                />
                <LiveError />
              </div>
              <div className='d-flex flex-row-reverse w-100 mb-6'>
                <Button
                  appearance='basic'
                  className='action-button'
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Hide code' : 'Show code'}
                </Button>
              </div>
            </CardBody>
          </Card>

          {isExpanded && (
            <Card
              shadow='light'
              className='w-100 overflow-hidden mt-6 live-editor-card'
            >
              <div>
                <div className='d-flex px-4 pt-6'>
                  <Button
                    appearance='basic'
                    onClick={() => setActiveButton('React')}
                    selected={
                      activeButton === 'React'
                        ? true
                        : false
                    }
                    className='mr-3'
                  >
                    React
                  </Button>
                  <Button
                    appearance='basic'
                    onClick={() => setActiveButton('HTML')}
                    selected={
                      activeButton === 'HTML' ? true : false
                    }
                  >
                    HTML
                  </Button>
                  {activeButton === 'React' && (
                    <CopyCode
                      onClick={() => {
                        const editor =
                          document.querySelector(
                            '.npm__react-simple-code-editor__textarea'
                          );
                        if (editor) copyCode(editor.value);
                      }}
                    />
                  )}
                </div>
              </div>

              {showLiveEditorContent()}
            </Card>
          )}
        </LiveProvider>
        {showArgsTable && (
          <>
            <Heading className='mt-10 align-self-start'>
              Props
            </Heading>
            <ArgsTable rows={propData} />
          </>
        )}
      </div>
    </>
  );
};

export default StoryComp;
