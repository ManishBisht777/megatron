"use client";

import { cn } from "@/app/lib/utils";
import { Post } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { Icons } from "../ui/icons";
import EditorJS from "@editorjs/editorjs";
import { postPatchSchema } from "@/app/lib/validation/post";
import TextareaAutosize from "react-textarea-autosize";

type EdtorPageProps = {
  post: Pick<Post, "id" | "title" | "content" | "published">;
};

const Editor = ({ post }: EdtorPageProps) => {
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const ref = React.useRef<EditorJS>();

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    // const Embed = (await import("@editorjs/embed")).default
    // const Table = (await import("@editorjs/table")).default
    // const List = (await import("@editorjs/list")).default
    // const Code = (await import("@editorjs/code")).default
    // const LinkTool = (await import("@editorjs/link")).default
    // const InlineCode = (await import("@editorjs/inline-code")).default

    const body = postPatchSchema.parse(post);

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          // linkTool: LinkTool,
          // list: List,
          // code: Code,
          // inlineCode: InlineCode,
          // table: Table,
          // embed: Embed,
        },
      });
    }
  }, [post]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  return (
    <form>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
              </>
            </Link>
            <p className="text-sm text-slate-600">
              {post.published ? "Published" : "Draft"}
            </p>
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {/* {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
            <span>Save</span>
          </button>
        </div>
        <div className="prose prose-stone mx-auto w-[800px]">
          <TextareaAutosize
            autoFocus
            spellCheck={false}
            id="title"
            defaultValue={post.title}
            placeholder="Post title"
            className="w-full resize-none appearance-none overflow-hidden text-5xl font-bold focus:outline-none ml-16"
            // {...register("title")}
          />
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border bg-slate-50 px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
      </div>
    </form>
  );
};

export default Editor;
