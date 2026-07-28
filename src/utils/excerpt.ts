export function getExcerpt(content?: string, maxLength = 150): string {
  if (!content) return '';

  const plainText = content
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove HTML image tags (<img ... />, <img ...>)
    .replace(/<img\b[^>]*\/?>/gi, '')
    // Remove Markdown headings (#, ##, etc.)
    .replace(/^#{1,6}\s+/gm, '')
    // Remove list markers (- item, * item, + item, 1. item)
    .replace(/^\s*([\*\-\+]|\d+\.)\s+/gm, '')
    // Remove blockquotes (> text)
    .replace(/^\s*>\s+/gm, '')
    // Remove Markdown images and links [text](url) -> text
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[*_`~]/g, '')
    // Replace multiple newlines or spaces with a single space
    .replace(/\s+/g, ' ')
    .trim();

  if (plainText.length <= maxLength) return plainText;
  return plainText.slice(0, maxLength).trim() + '...';
}