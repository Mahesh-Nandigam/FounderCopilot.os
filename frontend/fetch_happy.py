import urllib.request
import re

url = "https://www.happyrobot.ai/?ref=siteinspire"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    print("Videos:", set(re.findall(r'<video[^>]+src=[\"\'\']([^\"\'\']+)[\"\'\']', html)))
    print("Sources:", set(re.findall(r'<source[^>]+src=[\"\'\']([^\"\'\']+)[\"\'\']', html)))
    print("MP4s:", set(re.findall(r'[\"\'\']([^\"\'\']+\.mp4)[\"\'\']', html)))
except Exception as e:
    print("Error:", e)
