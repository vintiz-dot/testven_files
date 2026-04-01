import sys, base64, os, json
sys.stdout.reconfigure(encoding='utf-8')

# Read existing base64 data
with open('image_data.json', 'r', encoding='utf-8') as f:
    b64_data = json.load(f)

# Add generated images
generated = {
    'hero_shapes': r'C:\Users\Dell\.gemini\antigravity\brain\9c1a227c-5bcd-4ba8-8340-07825c218bfc\geometric_shapes_hero_1775000627349.png',
    'patio_hero': r'C:\Users\Dell\.gemini\antigravity\brain\9c1a227c-5bcd-4ba8-8340-07825c218bfc\patio_project_1775000641415.png',
    'desk_hero': r'C:\Users\Dell\.gemini\antigravity\brain\9c1a227c-5bcd-4ba8-8340-07825c218bfc\desk_arrangement_hero_1775000655490.png',
    'engineer_hero': r'C:\Users\Dell\.gemini\antigravity\brain\9c1a227c-5bcd-4ba8-8340-07825c218bfc\engineer_blueprint_1775000677988.png',
    'student_create': r'C:\Users\Dell\.gemini\antigravity\brain\9c1a227c-5bcd-4ba8-8340-07825c218bfc\student_create_1775000700157.png',
}

for key, path in generated.items():
    with open(path, 'rb') as f:
        data = base64.b64encode(f.read()).decode('utf-8')
    b64_data[key] = f'data:image/png;base64,{data}'
    print(f'Added {key}: {len(data)} chars')

with open('image_data.json', 'w', encoding='utf-8') as f:
    json.dump(b64_data, f)

print(f'Updated image_data.json: {os.path.getsize("image_data.json")} bytes')
