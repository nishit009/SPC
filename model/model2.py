import json
import pandas as pd

# Load dataset
DATA_PATH = r"./datasets/food_dataset_extended.json"
with open(DATA_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

df = pd.DataFrame(data)

# Normalize the 'type' field
df["type"] = df["type"].fillna("Unknown")

# Define category mapping function
def categorize_dish(dish_type):
    """Categorize dishes into Starters, Main Course, Desserts, Beverages"""
    dish_type_lower = str(dish_type).lower()
    
    if any(keyword in dish_type_lower for keyword in ["beverage", "drink", "juice", "shake", "smoothie", "coffee", "tea"]):
        return "Beverages"
    elif any(keyword in dish_type_lower for keyword in ["starter", "appetizer", "snack"]):
        return "Starters"
    elif any(keyword in dish_type_lower for keyword in ["dessert", "sweet", "ice cream", "cake", "pudding"]):
        return "Desserts"
    elif any(keyword in dish_type_lower for keyword in ["main", "curry", "rice", "biryani", "bread", "naan", "dish", "pasta", "pizza"]):
        return "Main Course"
    else:
        return "Other"

# Apply categorization
df["category"] = df["type"].apply(categorize_dish)

# Count items per category
category_counts = df["category"].value_counts().sort_index()

# Create a formatted table
print("\n" + "="*50)
print("DISH CATEGORY DISTRIBUTION")
print("="*50)
print(f"{'Category':<20} {'Count':<10} {'Percentage':<10}")
print("-"*50)

total = len(df)
for category, count in category_counts.items():
    percentage = (count / total) * 100
    print(f"{category:<20} {count:<10} {percentage:>6.2f}%")

print("-"*50)
print(f"{'TOTAL':<20} {total:<10} {'100.00%':<10}")
print("="*50)

# Optional: Display as pandas DataFrame for cleaner output
summary_df = pd.DataFrame({
    'Category': category_counts.index,
    'Count': category_counts.values,
    'Percentage': [(count / total) * 100 for count in category_counts.values]
})

print("\n--- Pandas Table View ---")
print(summary_df.to_string(index=False))

# Optional: Show sample items from each category
print("\n" + "="*50)
print("SAMPLE ITEMS PER CATEGORY")
print("="*50)
for category in ["Starters", "Main Course", "Desserts", "Beverages"]:
    if category in df["category"].values:
        samples = df[df["category"] == category]["item_name"].head(3).tolist()
        print(f"\n{category}:")
        for item in samples:
            print(f"  - {item}")
