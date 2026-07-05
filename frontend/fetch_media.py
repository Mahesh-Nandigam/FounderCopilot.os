import urllib.request
import re

url = "https://lucabg.dev/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    print("Images:", re.findall(r'<img[^>]+src=[\"\'\']([^\"\'\']+)[\"\'\']', html))
    print("Videos:", re.findall(r'<video[^>]+src=[\"\'\']([^\"\'\']+)[\"\'\']', html))
    print("Sources:", re.findall(r'<source[^>]+src=[\"\'\']([^\"\'\']+)[\"\'\']', html))
    print("GIFs:", re.findall(r'[\"\'\']([^\"\'\']+\.gif)[\"\'\']', html))
    print("MP4s:", re.findall(r'[\"\'\']([^\"\'\']+\.mp4)[\"\'\']', html))
except Exception as e:
    print("Error:", e)
