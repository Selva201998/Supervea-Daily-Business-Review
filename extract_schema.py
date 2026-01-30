import pypdf
import sys
import os

pdf_path = "Selva_Final Daily Briefing Report Template.pdf"

try:
    if not os.path.exists(pdf_path):
        print(f"Error: {pdf_path} not found in {os.getcwd()}")
        sys.exit(1)

    reader = pypdf.PdfReader(pdf_path)
    print(f"Number of pages: {len(reader.pages)}")
    for i, page in enumerate(reader.pages):
        print(f"--- Page {i+1} ---")
        extracted = page.extract_text(extraction_mode="layout") 
        print(extracted)
        print("\n")
except Exception as e:
    print(f"Error reading PDF: {e}")
