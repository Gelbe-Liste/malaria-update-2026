import { jsPDF } from "jspdf";
import { pages, sources, sourceLinks } from "../content";

const A4_W = 210;
const A4_H = 297;
const M = 16;
const CONTENT_W = A4_W - M * 2;
const YELLOW = [255, 220, 0];
const BLACK = [17, 17, 17];
const GREY = [90, 90, 90];
const LIGHT = [244, 244, 241];

function clean(value = "") {
  return String(value)
    .replace(/\u00a0/g, " ")
    .replace(/[\u2010\u2011\u2012\u2013\u2014]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d\u201e]/g, '"')
    .replace(/→/g, "->")
    .replace(/≥/g, ">=")
    .replace(/≤/g, "<=")
    .replace(/…/g, "...");
}

async function assetToDataUrl(src) {
  if (!src) return null;
  try {
    const response = await fetch(src);
    if (!response.ok) return null;
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function setText(doc, size = 10, style = "normal", color = BLACK) {
  doc.setFont("helvetica", style);
  doc.setFontSize(size);
  doc.setTextColor(...color);
}

function addFooter(doc, pageNo) {
  doc.setDrawColor(220, 220, 215);
  doc.line(M, A4_H - 12, A4_W - M, A4_H - 12);
  setText(doc, 7.5, "normal", [105, 105, 105]);
  doc.text("Gelbe Liste | Reisemedizin", M, A4_H - 7.5);
  doc.text(String(pageNo), A4_W - M, A4_H - 7.5, { align: "right" });
}

function addHeader(doc, logoData, label = "REISEMEDIZIN") {
  if (logoData) {
    try {
      doc.addImage(logoData, undefined, M, 9, 14, 14, undefined, "FAST");
    } catch {}
  }
  setText(doc, 8.5, "bold", BLACK);
  doc.text(label, M + 18, 16.5);
  doc.setFillColor(...YELLOW);
  doc.rect(M + 18, 19.2, 26, 1.4, "F");
}

function addPage(doc, state, logoData, label) {
  if (state.started) doc.addPage("a4", "portrait");
  state.started = true;
  state.pageNo += 1;
  addHeader(doc, logoData, label);
  addFooter(doc, state.pageNo);
  return 30;
}

function ensure(doc, state, y, needed, logoData, pageLabel) {
  if (y + needed <= A4_H - 18) return y;
  return addPage(doc, state, logoData, pageLabel);
}

function paragraph(doc, state, text, y, logoData, pageLabel, opts = {}) {
  const size = opts.size ?? 10.4;
  const lineHeight = opts.lineHeight ?? 5.2;
  const indent = opts.indent ?? 0;
  const width = opts.width ?? CONTENT_W - indent;
  const style = opts.style ?? "normal";
  const color = opts.color ?? BLACK;
  const before = opts.before ?? 0;
  const after = opts.after ?? 3.2;
  y += before;
  setText(doc, size, style, color);
  const lines = doc.splitTextToSize(clean(text), width);
  for (const line of lines) {
    y = ensure(doc, state, y, lineHeight + 1, logoData, pageLabel);
    doc.text(line, M + indent, y);
    y += lineHeight;
  }
  return y + after;
}

function heading(doc, state, text, y, logoData, pageLabel, level = 3) {
  const size = level === 2 ? 14 : 11.4;
  y = ensure(doc, state, y, level === 2 ? 14 : 10, logoData, pageLabel);
  setText(doc, size, "bold", BLACK);
  const lines = doc.splitTextToSize(clean(text), CONTENT_W);
  doc.text(lines, M, y);
  return y + lines.length * (level === 2 ? 6.4 : 5.3) + 2.5;
}

function bulletList(doc, state, items = [], y, logoData, pageLabel, numbered = false) {
  items.forEach((item, index) => {
    const prefix = numbered ? `${index + 1}.` : "•";
    const lines = doc.splitTextToSize(clean(item), CONTENT_W - 10);
    const needed = Math.max(8, lines.length * 5 + 3);
    y = ensure(doc, state, y, needed, logoData, pageLabel);
    setText(doc, 10.1, numbered ? "bold" : "normal", numbered ? YELLOW : BLACK);
    doc.text(prefix, M, y);
    setText(doc, 10.1, "normal", BLACK);
    doc.text(lines, M + 8, y);
    y += lines.length * 5.05 + 3.3;
  });
  return y;
}

function quoteBox(doc, state, text, y, logoData, pageLabel, attribution) {
  const lines = doc.splitTextToSize(clean(text), CONTENT_W - 14);
  const h = Math.max(20, lines.length * 5 + (attribution ? 12 : 8));
  y = ensure(doc, state, y, h + 5, logoData, pageLabel);
  doc.setFillColor(...LIGHT);
  doc.roundedRect(M, y, CONTENT_W, h, 3, 3, "F");
  doc.setFillColor(...YELLOW);
  doc.rect(M, y, 2.5, h, "F");
  setText(doc, 9.8, "normal", BLACK);
  doc.text(lines, M + 7, y + 7);
  if (attribution) {
    setText(doc, 8.6, "bold", GREY);
    doc.text(`- ${clean(attribution)}`, M + 7, y + h - 5);
  }
  return y + h + 5;
}

function noteBox(doc, state, text, y, logoData, pageLabel) {
  const lines = doc.splitTextToSize(clean(text), CONTENT_W - 12);
  const h = Math.max(17, lines.length * 4.8 + 9);
  y = ensure(doc, state, y, h + 4, logoData, pageLabel);
  doc.setFillColor(255, 249, 215);
  doc.roundedRect(M, y, CONTENT_W, h, 3, 3, "F");
  setText(doc, 9.4, "normal", BLACK);
  doc.text(lines, M + 6, y + 6.5);
  return y + h + 4;
}

function chapterTitle(doc, page, y) {
  setText(doc, 8.5, "bold", YELLOW);
  doc.text(clean(`${page.number || ""}  ${page.kicker || page.nav || ""}`).toUpperCase(), M, y);
  y += 8;
  setText(doc, page.kind === "hero" ? 28 : 22, "bold", BLACK);
  const lines = doc.splitTextToSize(clean(page.title || page.nav), CONTENT_W);
  doc.text(lines, M, y);
  y += lines.length * (page.kind === "hero" ? 11 : 8.6) + 3;
  if (page.subtitle) {
    setText(doc, 11.5, "normal", GREY);
    const sub = doc.splitTextToSize(clean(page.subtitle), CONTENT_W);
    doc.text(sub, M, y);
    y += sub.length * 5.8 + 4;
  }
  return y;
}

function addChapterImage(doc, imageData, y, maxH = 68) {
  if (!imageData) return y;
  try {
    const props = doc.getImageProperties(imageData);
    const ratio = props.width / props.height;
    let w = CONTENT_W;
    let h = w / ratio;
    if (h > maxH) {
      h = maxH;
      w = h * ratio;
    }
    const x = M + (CONTENT_W - w) / 2;
    doc.addImage(imageData, props.fileType || undefined, x, y, w, h, undefined, "FAST");
    return y + h + 7;
  } catch {
    return y;
  }
}

async function renderChapter(doc, state, page, logoData, imageCache) {
  let y = addPage(doc, state, logoData, "REISEMEDIZIN");
  y = chapterTitle(doc, page, y);

  if (page.background) {
    const imageData = imageCache.get(page.background);
    if (imageData) {
      y = ensure(doc, state, y, 65, logoData, page.nav);
      y = addChapterImage(doc, imageData, y, page.id === "kernaussagen" || page.id === "who-zahlen" ? 80 : 60);
    }
  }

  const label = page.nav || page.title;

  if (page.kind === "hero") {
    if (page.quote) y = quoteBox(doc, state, page.quote, y, logoData, label, page.attribution);
    return;
  }

  if (page.kind === "stats") {
    for (const stat of page.stats || []) {
      y = ensure(doc, state, y, 19, logoData, label);
      doc.setFillColor(...LIGHT);
      doc.roundedRect(M, y, CONTENT_W, 16, 3, 3, "F");
      setText(doc, 16, "bold", BLACK);
      doc.text(clean(stat.value), M + 5, y + 7);
      setText(doc, 9.2, "normal", GREY);
      const ls = doc.splitTextToSize(clean(stat.label), CONTENT_W - 45);
      doc.text(ls, M + 38, y + 6.2);
      y += 20;
    }
    if (page.quote) y = quoteBox(doc, state, page.quote, y, logoData, label);
    if (page.bullets) y = bulletList(doc, state, page.bullets, y, logoData, label);
    return;
  }

  if (page.kind === "steps") {
    if (page.intro) y = paragraph(doc, state, page.intro, y, logoData, label);
    for (const step of page.steps || []) {
      y = heading(doc, state, step.title, y, logoData, label, 3);
      if (step.items) y = bulletList(doc, state, step.items, y, logoData, label);
      if (step.quote) y = quoteBox(doc, state, step.quote, y, logoData, label);
    }
    return;
  }

  if (page.kind === "sources") {
    y = paragraph(doc, state, "Literatur und Quellenangaben", y, logoData, label, { size: 11, style: "bold" });
    sources.forEach((source, index) => {
      const text = `[${index + 1}] ${source}`;
      y = paragraph(doc, state, text, y, logoData, label, { size: 8.7, lineHeight: 4.4, after: 2.4 });
      const url = sourceLinks[index];
      if (url) {
        y = ensure(doc, state, y, 6, logoData, label);
        setText(doc, 7.4, "normal", [60, 90, 140]);
        const urlLines = doc.splitTextToSize(url, CONTENT_W - 4);
        doc.text(urlLines, M + 4, y);
        y += urlLines.length * 4 + 2;
      }
    });
    return;
  }

  if (page.kind === "video") {
    y = paragraph(doc, state, "Die Gelbe Liste App ergänzt das Informationsangebot für den mobilen Einsatz.", y, logoData, label);
    const poster = imageCache.get("/assets/images/app-thumbnail.jpg");
    if (poster) y = addChapterImage(doc, poster, y, 105);
    return;
  }

  if (page.kind === "imprint") {
    y = heading(doc, state, "Corporate Publishing", y, logoData, label, 3);
    y = paragraph(doc, state, "Redaktion: Guido Strehlau\nVidal MMI Germany GmbH\nMonzastraße 4\n63225 Langen\nE-Mail: info@mmi.de", y, logoData, label);
    y = heading(doc, state, "Herausgeber und verantwortlicher Diensteanbieter", y, logoData, label, 3);
    y = paragraph(doc, state, "Vidal MMI Germany GmbH\nMonzastraße 4\n63225 Langen\nTelefon: 06103 2076-0\nE-Mail: info@mmi.de", y, logoData, label);
    y = heading(doc, state, "Unternehmensangaben", y, logoData, label, 3);
    y = paragraph(doc, state, "Vertreten durch: Michael Schösser, Vincent Bouvier\nHandelsregister: Amtsgericht Offenbach/Main, HRB 8014\nUSt-IdNr.: DE113524692", y, logoData, label);
    y = heading(doc, state, "Verantwortlich für journalistisch-redaktionelle Inhalte", y, logoData, label, 3);
    y = paragraph(doc, state, "gemäß § 18 Abs. 2 MStV:\nMichael Schösser, Vincent Bouvier\nVidal MMI Germany GmbH\nMonzastraße 4\n63225 Langen", y, logoData, label);
    y = heading(doc, state, "Bildnachweise", y, logoData, label, 3);
    paragraph(doc, state, "© de.freepik.com\n© Vidal MMI Germany GmbH", y, logoData, label);
    return;
  }

  for (const p of page.paragraphs || []) y = paragraph(doc, state, p, y, logoData, label);
  if (page.heading) y = heading(doc, state, page.heading, y, logoData, label, 3);
  if (page.bullets) y = bulletList(doc, state, page.bullets, y, logoData, label);
  if (page.numbered) y = bulletList(doc, state, page.numbered, y, logoData, label, true);
  for (const block of page.blocks || []) {
    y = heading(doc, state, block.heading, y, logoData, label, 3);
    if (block.text) y = paragraph(doc, state, block.text, y, logoData, label);
  }
  if (page.quote) y = quoteBox(doc, state, page.quote, y, logoData, label);
  if (page.note) y = noteBox(doc, state, page.note, y, logoData, label);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export async function generateMalariaPdf({ onProgress } = {}) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
    putOnlyUsedFonts: true
  });

  doc.setProperties({
    title: "Malaria-Update 2025",
    subject: "Reisemedizin | Gelbe Liste",
    author: "Vidal MMI Germany GmbH",
    creator: "Gelbe Liste med.i.scroll"
  });

  onProgress?.(5);
  const logoData = await assetToDataUrl("/assets/images/glo-logo.png");
  const assetPaths = [...new Set(pages.map((p) => p.background).filter(Boolean))];
  if (!assetPaths.includes("/assets/images/app-thumbnail.jpg")) assetPaths.push("/assets/images/app-thumbnail.jpg");

  const imageCache = new Map();
  for (let i = 0; i < assetPaths.length; i += 1) {
    const path = assetPaths[i];
    imageCache.set(path, await assetToDataUrl(path));
    onProgress?.(8 + Math.round(((i + 1) / assetPaths.length) * 27));
  }

  const state = { started: false, pageNo: 0 };
  for (let i = 0; i < pages.length; i += 1) {
    await renderChapter(doc, state, pages[i], logoData, imageCache);
    onProgress?.(35 + Math.round(((i + 1) / pages.length) * 55));
  }

  onProgress?.(94);
  const blob = doc.output("blob");
  downloadBlob(blob, "Malaria-Update-2025_Gelbe-Liste.pdf");
  onProgress?.(100);

  return { pages: doc.getNumberOfPages(), size: blob.size };
}
