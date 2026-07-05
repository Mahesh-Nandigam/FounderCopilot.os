import urllib.request
import re

try:
    req = urllib.request.Request(
        'https://lucabg.dev/',
        headers={'User-Agent': 'Mozilla/5.0'}
    )
    html = urllib.request.urlopen(req).read().decode('utf-8')
    matches = re.findall(r'(https?://[^\s"\'<>]+(?:\.mp4|\.webm))', html)
    
    # Also look for any relative paths
    relative = re.findall(r'src=["\'](/[^\s"\'<>]+(?:\.mp4|\.webm))["\']', html)
    print("ABSOLUTE:", matches)
    print("RELATIVE:", relative)
except Exception as e:
    print("Error:", e)
