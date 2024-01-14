import requests
from bs4 import BeautifulSoup
import pandas as pd

url = "https://news.gallup.com/poll/1645/guns.aspx"

# Fetch the HTML content of the page
response = requests.get(url)
html_content = response.content

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(html_content, 'html.parser')

# Find the first table on the page
table = soup.find('table')

# Extract the first table into a Pandas DataFrame
table_data = []
for row in table.find_all('tr'):
    row_data = [cell.text.strip() for cell in row.find_all(['th', 'td'])]
    table_data.append(row_data)

df = pd.DataFrame(table_data[1:], columns=table_data[0])

# Exclude rows with missing values (None)
df = df.dropna(axis=0, how='any')

# Save the first table as a CSV file if it has data
if not df.empty:
    csv_filename = "../table_1.csv"
    df.to_csv(csv_filename, index=False)
    print(f"First table saved as {csv_filename}")

# Print the first table to the console
print(df)
onsole
print(table_dataframes[-1])


