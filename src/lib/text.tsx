import { Fragment } from "react";

export function cleanText(text: string): string {
  if (!text) return text;
  return text
    .replace(/\u2013/g, "-")
    .replace(/\u2014/g, ". ")
    .replace(/\s{2,}/g, " ")
    .replace(/\.\s+([a-z])/g, (_, c) => ". " + c.toUpperCase())
    .replace(/\.{2,}/g, ".")
    .trim();
}

export function TitleLines({ title }: { title: string }) {
  const lines = title.split(/<br\s*\/?>/i);
  if (lines.length <= 1) return <>{title}</>;
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}