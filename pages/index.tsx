import React, { useEffect, useState } from "react";
import Draft, { EditorState, RichUtils } from "draft-js";


const emptyContentState = Draft.convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: '',
      key: 'foo',
      type: 'unstyled',
      entityRanges: [],
      depth: 1,
      inlineStyleRanges: []
    }
  ],
});


var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
];


const StyleButton = (props: { onToggle: (arg0: any) => void; style: any; active: any; label: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
  const onToggle = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  let className = 'RichEditor-styleButton';
  if (props.active) {
    className += ' RichEditor-activeButton';
  }

  return (
    <span className={className} onMouseDown={onToggle}>
      {props.label}
    </span>
  );

}
const InlineStyleControls = (props: { editorState: { getCurrentInlineStyle: () => any; }; onToggle: any; }) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};
const BLOCK_TYPES = [

  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },

];

const BlockStyleControls = (props: { onToggle?: any; editorState?: any; }) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};


const PageContainer = () => {

  const [state, setState] = useState({
    editorState: Draft.EditorState.createWithContent(emptyContentState),

  });

  const onChange = (editorState: any) => {
    setState({ editorState })
  };
  const handleKeyCommand = (command: string, editorState: Draft.EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setState({ editorState: newState })
      return 'handled';
    }

    return 'not-handled';
  }
  const Editor = Draft.Editor;



  const _toggleInlineStyle = (inlineStyle: string) => {
    onChange(
      RichUtils.toggleInlineStyle(
        state.editorState,
        inlineStyle
      )
    );
  }



  const _toggleBlockType = (blockType: string) => {
    onChange(
      RichUtils.toggleBlockType(
        state.editorState,
        blockType
      )
    );
  }

  return (
    <div className="editorContainer" >
      <div style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row' }}>
        <BlockStyleControls
          editorState={state.editorState}
          onToggle={_toggleBlockType}
        />
        <InlineStyleControls
          editorState={state.editorState}
          onToggle={_toggleInlineStyle}
        />
      </div>

      <div className="editors" style={{ width: "500px", height: "500px", border: '2px solid red' }}>
        <Editor
          editorState={state.editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          placeholder="SOME TEXT"
        />
      </div>
    </div>
  );
}

export default PageContainer;
