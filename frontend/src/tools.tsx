import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Link from "@editorjs/link";
import Delimiter from "@editorjs/delimiter";
import CheckList from "@editorjs/checklist";
import { ToolConstructable } from '@editorjs/editorjs';

export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  checkList: CheckList,
  list: List,
  header: {
    class: Header as unknown as ToolConstructable,
    config: {
        defaultLevel: 3,
        levels: [1, 2, 3, 4, 5, 6]
    },
  },
  delimiter: Delimiter,
  link: Link,
};