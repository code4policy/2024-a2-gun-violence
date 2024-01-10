import pandas as pd

# Read the CSV file into a DataFrame
input_file = '../table_1.csv'
df = pd.read_csv(input_file)

# Extract year and date from the first column
df[['year', 'month']] = df.iloc[:, 0].str.extract(r'(\d{4})\s([^\d]+)')

# Convert only the numeric columns to numbers and divide by 100
numeric_columns = ['More strict', 'Less strict', 'Kept as now', 'No opinion']
df[numeric_columns] = df[numeric_columns].apply(pd.to_numeric, errors='coerce') / 100
df = df.drop(df.columns[0], axis=1)

# Save the modified DataFrame to a new CSV file
output_file = '../cleaned_table_1.csv'
df.to_csv(output_file, index=False)

print(f"Modified data has been saved to {output_file}.")



