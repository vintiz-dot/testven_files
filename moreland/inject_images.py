import base64

def b64(path):
    with open(path, 'rb') as f:
        return base64.b64encode(f.read()).decode()

img1 = b64(r'img_1276343.webp')
img2 = b64(r'mdm demo.webp')

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old1 = "src: 'img_1276343.webp'"
new1 = "src: 'data:image/webp;base64," + img1 + "'"

old2 = "src: 'mdm demo.webp'"
new2 = "src: 'data:image/webp;base64," + img2 + "'"

html = html.replace(old1, new1)
html = html.replace(old2, new2)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Done. HTML size:', len(html), 'bytes')
