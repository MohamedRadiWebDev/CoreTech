import { createElement, ReactNode } from 'react';

const allowedTags = new Set(['p', 'h2', 'h3', 'ul', 'ol', 'li', 'strong', 'em', 'a']);

function renderNode(node: ChildNode, key: string): ReactNode {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent;
  if (!(node instanceof HTMLElement)) return null;
  const tag = node.tagName.toLowerCase();
  if (!allowedTags.has(tag)) {
    return Array.from(node.childNodes).map((child, index) => renderNode(child, `${key}-${index}`));
  }
  const children = Array.from(node.childNodes).map((child, index) => renderNode(child, `${key}-${index}`));
  const props: Record<string, unknown> = { key };
  if (tag === 'a') {
    props.href = node.getAttribute('href') ?? '#';
    props.target = '_blank';
    props.rel = 'noreferrer';
    props.className = 'font-medium text-primary underline-offset-4 hover:underline';
  }
  if (tag === 'p') props.className = 'text-base leading-8 text-muted-foreground';
  if (tag === 'h2') props.className = 'mt-10 text-2xl font-semibold tracking-tight text-foreground';
  if (tag === 'h3') props.className = 'mt-8 text-xl font-semibold tracking-tight text-foreground';
    if (tag === 'ul') props.className = 'ml-6 list-disc space-y-3 text-muted-foreground';
  if (tag === 'ol') props.className = 'ml-6 list-decimal space-y-3 text-muted-foreground';
  if (tag === 'li') props.className = 'pl-1';
  return createElement(tag, props, children);
}

export function renderRichText(html: string): ReactNode[] {
  if (typeof window === 'undefined') return [html];
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return Array.from(doc.body.childNodes).map((node, index) => renderNode(node, `node-${index}`));
}
