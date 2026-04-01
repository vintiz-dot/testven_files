import sys
sys.stdout.reconfigure(encoding='utf-8')
import base64, os

images = {
    'desk_arrangement': 'slide14_img20.png',
    'engineer_step1': 'slide17_img25.png',
    'engineer_step2': 'slide17_img26.png',
    'practice_answers': 'slide21_img32.png',
    'practice_q4': 'slide20_img29.png',
    'practice_q5': 'slide20_img31.png',
    'key_concept': 'slide19_img28.png',
    'patio_step1': 'slide11_img11.png',
    'patio_step2': 'slide11_img12.png',
    'patio_step3': 'slide11_img13.png',
}

b64_data = {}
for key, fname in images.items():
    path = os.path.join('pptx_images', fname)
    ext = fname.split('.')[-1]
    mime = 'image/png' if ext == 'png' else 'image/jpeg'
    with open(path, 'rb') as f:
        data = base64.b64encode(f.read()).decode('utf-8')
    b64_data[key] = f'data:{mime};base64,{data}'
    print(f'Converted {key}: {len(data)} chars')

# Write as JSON
import json
with open('image_data.json', 'w', encoding='utf-8') as f:
    json.dump(b64_data, f)

print(f'Done - wrote image_data.json')
print(f'File size: {os.path.getsize("image_data.json")} bytes')
