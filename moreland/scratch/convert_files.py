import docx
import pandas as pd
import sys
import os

def convert_excel_to_html(xlsx_path, html_path, title):
    try:
        # Read all sheets
        xls = pd.ExcelFile(xlsx_path)
        html_content = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{title}</title>
<style>
  body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background: #FAFAF7; color: #0F172A; padding: 40px; }}
  .container {{ max-width: 1200px; margin: 0 auto; background: #FFF; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }}
  h1 {{ color: #4338CA; }}
  h2 {{ margin-top: 30px; border-bottom: 2px solid #E2E8F0; padding-bottom: 8px; }}
  table {{ width: 100%; border-collapse: collapse; margin-top: 20px; }}
  th, td {{ border: 1px solid #E2E8F0; padding: 12px; text-align: left; vertical-align: top; }}
  th {{ background: #F8FAFC; font-weight: 600; }}
  tr:nth-child(even) {{ background: #F8FAFC; }}
</style>
</head>
<body>
<div class="container">
  <h1>{title}</h1>
"""
        for sheet_name in xls.sheet_names:
            df = pd.read_excel(xls, sheet_name=sheet_name)
            html_content += f"<h2>{sheet_name}</h2>\n"
            html_content += df.to_html(index=False, na_rep='', border=0, classes='dataframe')
        
        html_content += """
</div>
</body>
</html>"""
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(html_content)
        print(f"Created {html_path}")
    except Exception as e:
        print(f"Error converting {xlsx_path}: {e}")

def convert_docx_to_html(docx_path, html_path, title):
    try:
        doc = docx.Document(docx_path)
        html_content = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{title}</title>
<style>
  body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background: #FAFAF7; color: #0F172A; padding: 40px; line-height: 1.6; }}
  .container {{ max-width: 900px; margin: 0 auto; background: #FFF; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }}
  h1 {{ color: #4338CA; margin-bottom: 24px; }}
  p {{ margin-bottom: 16px; }}
  table {{ width: 100%; border-collapse: collapse; margin-top: 20px; margin-bottom: 20px; }}
  th, td {{ border: 1px solid #E2E8F0; padding: 12px; text-align: left; vertical-align: top; }}
  th {{ background: #F8FAFC; font-weight: 600; }}
</style>
</head>
<body>
<div class="container">
  <h1>{title}</h1>
"""
        for element in doc.element.body:
            if element.tag.endswith('p'):
                p = docx.text.paragraph.Paragraph(element, doc)
                if p.text.strip():
                    html_content += f"  <p>{p.text}</p>\n"
            elif element.tag.endswith('tbl'):
                t = docx.table.Table(element, doc)
                html_content += "  <table>\n"
                for i, row in enumerate(t.rows):
                    html_content += "    <tr>\n"
                    for cell in row.cells:
                        tag = "th" if i == 0 else "td"
                        html_content += f"      <{tag}>{cell.text.replace(chr(10), '<br>')}</{tag}>\n"
                    html_content += "    </tr>\n"
                html_content += "  </table>\n"
        
        html_content += """
</div>
</body>
</html>"""
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(html_content)
        print(f"Created {html_path}")
    except Exception as e:
        print(f"Error converting {docx_path}: {e}")

if __name__ == '__main__':
    convert_excel_to_html("Victor_Moronu_Survey_Results_EdTech_Needs.xlsx", "Victor_Moronu_Survey_Results_EdTech_Needs.html", "EdTech Needs Survey Results")
    convert_excel_to_html("Victor_Moronu_Literature_Review.xlsx", "Victor_Moronu_Literature_Review.html", "Literature Review")
    convert_docx_to_html("Victor_Moronu_TEACH-NOW_PD_Coaching_Template.docx", "Victor_Moronu_TEACH-NOW_PD_Coaching_Template.html", "TEACH-NOW PD & Coaching Template")
    convert_docx_to_html("Victor_Moronu_Peer_Review_AlgoHeuristic.docx", "Victor_Moronu_Peer_Review_AlgoHeuristic.html", "Peer Review - Algorithmic vs Heuristic")
    convert_docx_to_html("M42U3A1_ Notes and Reflection.docx", "M42U3A1_Notes_and_Reflection.html", "M42U3A1 Notes and Reflection")
