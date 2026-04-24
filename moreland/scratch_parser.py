import docx
import pandas as pd
import json
import sys

def parse_docx(filename):
    try:
        doc = docx.Document(filename)
        return [p.text for p in doc.paragraphs if p.text.strip()]
    except Exception as e:
        return [f"Error reading docx: {str(e)}"]

def parse_xlsx(filename):
    try:
        df = pd.read_excel(filename)
        # Convert to dictionary orient='records'
        return df.fillna('').to_dict(orient='records')
    except Exception as e:
        return [{"Error": f"Error reading xlsx: {str(e)}"}]

data = {
    "docx": parse_docx("Victor_Moronu_TEACH-NOW_PD_Coaching_Template.docx"),
    "xlsx": parse_xlsx("Victor_Moronu_Survey_Results_EdTech_Needs.xlsx")
}

with open("scratch/parsed_data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Parsed successfully!")
