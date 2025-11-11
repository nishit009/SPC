import json
import pandas as pd

# Load the JSON data
with open("/mnt/data/trail.json", "r") as f:
    data = json.load(f)

# Extract required fields
rows = []
for item in data:
    rows.append({
        "Item Name": item.get("item_name", ""),
        "Type": item.get("type", ""),
        "Enum": item.get("enum", "")
    })

# Convert to DataFrame for tabular view
df = pd.DataFrame(rows)

import caas_jupyter_tools
caas_jupyter_tools.display_dataframe_to_user("Menu Items (Name, Type, Enum)", df)

df.head()
