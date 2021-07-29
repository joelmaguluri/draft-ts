import React, { useState } from "react";
import Draft, { Modifier, RichUtils } from "draft-js";
import { ColorPicker } from "../components/ColorPicker";

import { EditorState } from "draft-js";
import { colorStyleMap } from "../constants/colors";
import { Listbox } from '@headlessui/react'
import FontSelector from "../components/FontSelector";


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

  const _toggleColor = (toggledColor: string) => {
    const { editorState } = state;
    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state as EditorState, color as string);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }

    onChange(nextEditorState);
  }

  const fontStyleMap = {
    'HAHMLET': {
      fontFamily: 'Hahmlet, serif'
    },
    'OPENSANS': { fontFamily: "'Open Sans', sans-serif" },

    'ROBOTO': { fontFamily: "'Roboto', sans-serif" },
    'STYLESCRIPT': { fontFamily: "'Style Script', cursive" },

  }

  const _toggleFont = (toggledFont: string) => {
    const { editorState } = state;
    const selection = editorState.getSelection();


    const nextContentState = Object.keys(fontStyleMap)
      .reduce((contentState, fontFamily) => {
        return Modifier.removeInlineStyle(contentState, selection, fontFamily)
      }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, fontFamily) => {
        return RichUtils.toggleInlineStyle(state as EditorState, fontFamily as string);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledFont)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledFont
      );
    }

    onChange(nextEditorState);
  }

  const styleMap = {
    ...colorStyleMap,
    ...fontStyleMap

  };




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
        {< ColorPicker toggleColor={_toggleColor} editorState={state.editorState} />}


        <FontSelector editorState={state.editorState} toggleFont={_toggleFont} />
      </div>

      <div className="w-3/4 mx-auto border-2 editors border-low-contrast-2 hover:border-interaction-0 h-3/4" >

        <Editor
          editorState={state.editorState}
          customStyleMap={styleMap}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          placeholder="Enter Text"

        />
      </div>
    </div>
  );
}

export default PageContainer;
