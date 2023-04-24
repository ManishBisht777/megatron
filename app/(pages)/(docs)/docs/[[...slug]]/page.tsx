import React from "react";
import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/docs/mdx";

type Props = {
  params: {
    slug: string[];
  };
};

async function getDocFromParams(params: any) {
  const slug = params.slug?.join("/") || "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    null;
  }

  return doc;
}

const page = async ({ params }: Props) => {
  const doc = await getDocFromParams(params);

  if (!doc) {
    notFound();
  }

  return (
    <div>
      Docs page
      <h1>{doc.title}</h1>
      <p>{doc.description}</p>
      <Mdx code={doc.body.code} />
    </div>
  );
};

export default page;
