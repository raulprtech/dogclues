import urllib.request
import json
import urllib.parse

titles = [
"File:15-07-15-Centro histórico de San Francisco de Campeche-RalfR-WMA 0793.jpg",
"File:15-07-15-Centro histórico de San Francisco de Campeche-RalfR-WMA 0817.jpg",
"File:15-07-15-Centro histórico de San Francisco de Campeche-RalfR-WMA 0789.jpg",
"File:San Francisco de Campeche, Campeche Mexico, dic 2023 - 5.jpg",
"File:San Francisco de Campeche, Campeche Mexico, dic 2023 - 8.jpg",
"File:San Francisco de Campeche, Campeche Mexico, dic 2023 - 13.jpg",
"File:San Francisco de Campeche, Campeche Mexico, dic 2023 - 4.jpg"
]

titles_param = urllib.parse.quote("|".join(titles))
url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={titles_param}&prop=imageinfo&iiprop=url&format=json"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode())
    for page_id, page_info in data['query']['pages'].items():
        title = page_info['title']
        image_url = page_info['imageinfo'][0]['url']
        print(f"{title}: {image_url}")
