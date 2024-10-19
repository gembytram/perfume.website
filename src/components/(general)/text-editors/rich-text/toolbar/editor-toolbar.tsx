"use client";

import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  ImagePlus,
  Quote,
  Table,
} from "lucide-react";

import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { ToggleGroup, Toolbar } from "../editorToolbar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DropZoneSingleImg } from "@/components";

import FormatType from "./format-type";
import { EDITOR_DATA } from "@/data/components";
import { DIALOG_DATA } from "@/data/dialog";
import { PLACEHOLDER_DATA } from "@/data/placeholder";

interface EditorToolbarProps {
  editor: Editor;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  // const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgLink, setImgLink] = useState<string>("");
  const [imgCaption, setImgCaption] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [linkTitle, setLinkTitle] = useState<string>("");
  const [openAddLinkPopup, setOpenAddLinkPopup] = useState<boolean>(false);
  const [openAddImgPopup, setOpenAddImgPopup] = useState<boolean>(false);
  const [openAddTablePopup, setOpenAddTablePopup] = useState<boolean>(false);
  const [rows, setRows] = useState<number>(2); // Default number of rows
  const [cols, setCols] = useState<number>(2); // Default number of columns

  const handleAddTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows, cols }) // Use the insertTable command from the table extension
      .run();
    editor.chain().focus().insertContent("<p></p>").run();
  };

  const handleImageUpload = (url: string, caption: string) => {
    // editor.chain().focus().setImage({ src: url }).run();
    if ((url && url.startsWith("https://")) || url.startsWith("blob:")) {
      editor
        .chain()
        .focus()
        .insertContent(
          `<figure>
             <img src="${url}" alt="${caption}" style="width:100%" />
             <figcaption>${caption}</figcaption>
           </figure>
           <p></p>`
        )
        .run();
    }
  };

  const handleAddLink = () => {
    if (link && link.startsWith("https://")) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .insertContent(`<a href="${link}" target="_blank">${linkTitle}</a>`)
        .run();
    }
  };

  return (
    <Toolbar
      className="w-full z-0 my-0 bg-pri-2/40 dark:bg-pri-2/30"
      aria-label="Formatting options"
    >
      <ToggleGroup
        className="w-full flex gap-1 flex-wrap justify-start items-center"
        type="multiple"
      >
        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          pressed={editor.isActive("bold")}
        >
          <Bold className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          pressed={editor.isActive("italic")}
          value="italic"
        >
          <Italic className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          pressed={editor.isActive("strike")}
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
          pressed={editor.isActive("blockquote")}
        >
          <Quote className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          pressed={editor.isActive("bulletList")}
        >
          <List className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          pressed={editor.isActive("orderedList")}
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>

        <Dialog open={openAddTablePopup} onOpenChange={setOpenAddTablePopup}>
          <DialogTrigger>
            <Button
              type="button"
              variant="none"
              size="sm"
              className="hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
            >
              <Table className="h-4 w-4" />
            </Button>
          </DialogTrigger>

          <DialogContent className="mxs:max-w-md mxs:max-h-[600px]">
            <DialogHeader className="pb-2 border-b-2">
              <DialogTitle>{EDITOR_DATA["add-table"]}</DialogTitle>
            </DialogHeader>

            <p>{EDITOR_DATA["rows-number"]}</p>
            <Input
              type="number"
              value={rows}
              min={2}
              onChange={(e) => setRows(Number(e.target.value))}
              className="dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900"
            />

            <p>{EDITOR_DATA["columns-number"]}</p>
            <Input
              type="number"
              value={cols}
              min={2}
              onChange={(e) => setCols(Number(e.target.value))}
              className="dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900"
            />

            <DialogFooter className="flex flex-row !justify-between">
              <Button type="button" variant="ghost" onClick={() => setOpenAddTablePopup(false)}>
                {DIALOG_DATA["close-btn"]}
              </Button>
              <Button
                type="button"
                variant="default"
                onClick={() => {
                  setOpenAddTablePopup(false);
                  handleAddTable();
                }}
              >
                {DIALOG_DATA["add-table"]}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={openAddImgPopup} onOpenChange={setOpenAddImgPopup}>
          <DialogTrigger>
            <Button
              type="button"
              variant="none"
              size="sm"
              className="hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
              // onClick={handleImageButtonClick}
            >
              <ImagePlus className="h-4 w-4" />
            </Button>
          </DialogTrigger>

          <DialogContent className="mxs:max-w-md mxs:max-h-[800px]">
            <DialogHeader className="pb-2 border-b-2">
              <DialogTitle>{DIALOG_DATA["images-add"]}</DialogTitle>
            </DialogHeader>

            <DropZoneSingleImg value={imgLink} onChange={setImgLink} />

            <div className="flex flex-col gap-2">
              <p>{EDITOR_DATA["figcaption"]}</p>
              <Input
                value={imgCaption}
                onChange={(e) => setImgCaption(e.target.value)}
                placeholder={PLACEHOLDER_DATA["caption-placeholder"]}
                className="dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900"
              />
            </div>

            <DialogFooter className="flex flex-row !justify-between">
              <Button type="button" variant="ghost" onClick={() => setOpenAddImgPopup(false)}>
                {DIALOG_DATA["close-btn"]}
              </Button>
              <Button
                type="button"
                variant="default"
                onClick={() => {
                  setOpenAddImgPopup(false);
                  handleImageUpload(imgLink, imgCaption);
                  setImgLink("");
                }}
              >
                {DIALOG_DATA["images-add"]}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={openAddLinkPopup} onOpenChange={setOpenAddLinkPopup}>
          <DialogTrigger>
            <Button
              type="button"
              variant="none"
              size="sm"
              className="hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
            >
              <Link2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>

          <DialogContent className="mxs:max-w-md mxs:max-h-[600px]">
            <DialogHeader className="pb-2 border-b-2">
              <DialogTitle>{DIALOG_DATA["links-add"]}</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-2">
              <p>{EDITOR_DATA["link-title"]}</p>
              <Input
                value={linkTitle}
                onChange={(e) => setLinkTitle(e.target.value)}
                placeholder={PLACEHOLDER_DATA["link-title-placeholder"]}
                className="dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p>{EDITOR_DATA["link"]}</p>
              <Input
                value={link}
                onDoubleClick={async () => {
                  const text = await navigator.clipboard.readText();
                  // console.log("clipboard", text);
                  setLink(text);
                }}
                onPaste={async () => {
                  const text = await navigator.clipboard.readText();
                  // console.log("clipboard", text);
                  setLink(text);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace") {
                    setLink("");
                  }
                }}
                placeholder={PLACEHOLDER_DATA["link-placeholder"]}
                className="dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:bg-zinc-900"
              />
            </div>

            <DialogFooter className="flex flex-row !justify-between">
              <Button type="button" variant="ghost" onClick={() => setOpenAddLinkPopup(false)}>
                {DIALOG_DATA["close-btn"]}
              </Button>
              <Button
                type="button"
                variant="default"
                onClick={() => {
                  setOpenAddLinkPopup(false);
                  handleAddLink();
                  setLink("");
                  setLinkTitle("");
                }}
              >
                {DIALOG_DATA["link-add"]}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
          pressed={editor.isActive({ textAlign: "left" })}
        >
          <AlignLeft className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
          pressed={editor.isActive({ textAlign: "center" })}
        >
          <AlignCenter className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
          pressed={editor.isActive({ textAlign: "right" })}
        >
          <AlignRight className="h-4 w-4" />
        </Toggle>

        <FormatType editor={editor} />
      </ToggleGroup>
    </Toolbar>
  );
};

export default EditorToolbar;
