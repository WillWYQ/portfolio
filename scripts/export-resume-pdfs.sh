#!/usr/bin/env bash
# Export every resume .docx in public/ to a PDF next to it, via Microsoft Word.
#
# Usage:  pnpm export:resume-pdfs        (or: bash scripts/export-resume-pdfs.sh)
#
# Run this each time you update a resume .docx, then point the matching
# heroResumeButtons entry in src/data/resume.tsx at the .pdf file.
#
# Notes:
# - Requires Microsoft Word. The first run may trigger a macOS prompt asking to
#   allow your terminal to control Word — accept it, and make sure Word itself
#   has no first-run/sign-in dialog open, or the export fails with error -1708.
# - Word exports into a temp folder first (its sandbox is picky about iCloud
#   Drive paths), then the PDFs are moved into public/.

set -euo pipefail

PUBLIC_DIR="$(cd "$(dirname "$0")/../public" && pwd)"
TMP_DIR="$(mktemp -d /tmp/resume-pdf.XXXXXX)"
trap 'rm -rf "$TMP_DIR"' EXIT

shopt -s nullglob
docx_files=("$PUBLIC_DIR"/*.docx)
if [ ${#docx_files[@]} -eq 0 ]; then
  echo "No .docx files found in $PUBLIC_DIR" >&2
  exit 1
fi

for src in "${docx_files[@]}"; do
  base="$(basename "$src" .docx)"
  tmp_pdf="$TMP_DIR/$base.pdf"
  echo "Exporting: $base.docx -> $base.pdf"
  osascript <<EOF
tell application "Microsoft Word"
    set theDoc to open file name "$src"
    delay 1
    tell theDoc
        save as file name "$tmp_pdf" file format format PDF
    end tell
    close theDoc saving no
end tell
EOF
  mv "$tmp_pdf" "$PUBLIC_DIR/$base.pdf"
done

echo
echo "Done. PDFs written to public/:"
ls -la "$PUBLIC_DIR"/*.pdf
echo
echo "Reminder: update heroResumeButtons filePath/downloadName in src/data/resume.tsx to the .pdf files."
