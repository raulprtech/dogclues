import re

urls = [
    "https://upload.wikimedia.org/wikipedia/commons/5/59/15-07-15-Centro_hist%C3%B3rico_de_San_Francisco_de_Campeche-RalfR-WMA_0807-09.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/a/ae/15-07-15-Centro_hist%C3%B3rico_de_San_Francisco_de_Campeche-RalfR-WMA_0826.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/8/86/15-07-15-Centro_hist%C3%B3rico_de_San_Francisco_de_Campeche-RalfR-WMA_0850.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/7/77/Campeche_Campeche_Nov_2018_01.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/5/54/San_Francisco_de_Campeche%2C_Campeche_Mexico%2C_dic_2023_-_1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/6/6c/San_Francisco_de_Campeche%2C_Campeche_Mexico%2C_dic_2023_-_12.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/c/c1/San_Francisco_de_Campeche%2C_Campeche_Mexico%2C_dic_2023_-_9.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/1/18/15-07-15-Centro_hist%C3%B3rico_de_San_Francisco_de_Campeche-RalfR-WMA_0789.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/8/8b/15-07-15-Centro_hist%C3%B3rico_de_San_Francisco_de_Campeche-RalfR-WMA_0793.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/c/c0/15-07-15-Centro_hist%C3%B3rico_de_San_Francisco_de_Campeche-RalfR-WMA_0817.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/d/dd/San_Francisco_de_Campeche%2C_Campeche_Mexico%2C_dic_2023_-_13.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/2/2e/San_Francisco_de_Campeche%2C_Campeche_Mexico%2C_dic_2023_-_4.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/2/2e/San_Francisco_de_Campeche%2C_Campeche_Mexico%2C_dic_2023_-_5.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/7/74/San_Francisco_de_Campeche%2C_Campeche_Mexico%2C_dic_2023_-_8.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/7/77/Campeche_Campeche_Nov_2018_01.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/a/ae/15-07-15-Centro_hist%C3%B3rico_de_San_Francisco_de_Campeche-RalfR-WMA_0826.jpg"
]

files_to_process = ['src/lib/data.ts', 'src/pages/HomePage.tsx', 'src/components/SEO.tsx']

url_index = 0

for file_path in files_to_process:
    with open(file_path, 'r') as f:
        content = f.read()

    def replace_url(match):
        global url_index
        if url_index < len(urls):
            replacement = urls[url_index]
            url_index += 1
            return match.group(1) + replacement + match.group(3)
        return match.group(0)

    # regex to match Unsplash URLs
    new_content = re.sub(r'(src="|url="|imageUrl:\s*\'|coverImageUrl:\s*\'|image\s*=\s*")(https://images\.unsplash\.com/[^\'"\\]+)([\'"])', replace_url, content)
    
    with open(file_path, 'w') as f:
        f.write(new_content)

print(f"Replaced {url_index} images.")
