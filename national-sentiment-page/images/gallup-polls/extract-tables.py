import requests
from bs4 import BeautifulSoup
import pandas as pd

url = "https://news.gallup.com/poll/1645/guns.aspx"

# Fetch the HTML content of the page
response = requests.get(url)
html_content = response.content

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(html_content, 'html.parser')

# Find all tables on the page
tables = soup.find_all('table')

# Extract tables into Pandas DataFrames
table_dataframes = []
for idx, table in enumerate(tables):
    table_data = []
    for row in table.find_all('tr'):
        row_data = [cell.text.strip() for cell in row.find_all(['th', 'td'])]
        table_data.append(row_data)
    
    df = pd.DataFrame(table_data[1:], columns=table_data[0])
    
    # Exclude rows with missing values (None)
    df = df.dropna(axis=0, how='any')

    table_dataframes.append(df)

    # Save each table as a CSV file if it has data
    if not df.empty:
        csv_filename = f"table_{idx + 1}.csv"
        df.to_csv(csv_filename, index=False)
        print(f"Table {idx + 1} saved as {csv_filename}")

# Print the last table to the console
print(table_dataframes[-1])


