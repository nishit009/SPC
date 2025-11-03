import json
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report
from xgboost import XGBClassifier
from sentence_transformers import SentenceTransformer, util
import torch


# ----------------------------------------------------
# STEP 1 — Load dataset
# ----------------------------------------------------
def load_dataset(path: str):
    """Load JSON dataset into a pandas DataFrame."""
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    df = pd.DataFrame(data)

    # Check for required columns
    required = ["dish_name", "cuisine_type", "occasion_tags", "description"]
    for col in required:
        if col not in df.columns:
            raise ValueError(f"Missing required column: {col}")
    return df


# ----------------------------------------------------
# STEP 2 — Train classifier (occasion → cuisine)
# ----------------------------------------------------
def train_classifier(df: pd.DataFrame):
    """Train a simple TF-IDF + XGBoost classifier."""
    X = df["occasion_tags"].astype(str)
    y = df["cuisine_type"].astype(str)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    clf_pipeline = Pipeline([
        ("tfidf", TfidfVectorizer()),
        ("clf", XGBClassifier(
            use_label_encoder=False,
            eval_metric="mlogloss",
            max_depth=6,
            n_estimators=200,
            learning_rate=0.1,
        )),
    ])

    clf_pipeline.fit(X_train, y_train)
    y_pred = clf_pipeline.predict(X_test)
    print("\n📊 Classifier Report:\n", classification_report(y_test, y_pred))
    return clf_pipeline


# ----------------------------------------------------
# STEP 3 — Create embeddings for dishes
# ----------------------------------------------------
def create_embeddings(df: pd.DataFrame):
    """Generate embeddings for each dish."""
    embedder = SentenceTransformer("all-MiniLM-L6-v2")
    df["dish_text"] = (
        df["dish_name"] + " - " +
        df["description"].fillna("") +
        " (" + df["cuisine_type"] + ")"
    )
    dish_embeddings = embedder.encode(df["dish_text"].tolist(), convert_to_tensor=True)
    return embedder, dish_embeddings


# ----------------------------------------------------
# STEP 4 — Generate a menu for a given occasion
# ----------------------------------------------------
def generate_menu(occasion_text, df, clf_pipeline, embedder, dish_embeddings, top_k=10):
    """Hybrid menu generation using classifier + embeddings."""
    # 1. Predict cuisine from occasion
    predicted_cuisine = clf_pipeline.predict([occasion_text])[0]

    # 2. Filter dishes by predicted cuisine
    subset = df[df["cuisine_type"] == predicted_cuisine].reset_index(drop=True)
    if subset.empty:
        subset = df  # fallback

    # 3. Retrieve semantically similar dishes
    query_emb = embedder.encode(occasion_text, convert_to_tensor=True)
    subset_embs = embedder.encode(subset["dish_text"].tolist(), convert_to_tensor=True)
    cosine_scores = util.cos_sim(query_emb, subset_embs)[0]
    top_results = torch.topk(cosine_scores, k=min(top_k, len(subset)))

    selected = subset.iloc[top_results.indices.cpu().numpy()]
    menu_items = selected[["dish_name", "course", "veg"]].to_dict(orient="records")

    return {
        "occasion": occasion_text,
        "predicted_cuisine": predicted_cuisine,
        "menu": menu_items,
    }


# ----------------------------------------------------
# STEP 5 — Run model end-to-end
# ----------------------------------------------------
if __name__ == "__main__":
    DATA_PATH = "menu_dataset.json"   # your JSON dataset

    print("📦 Loading dataset...")
    df = load_dataset(DATA_PATH)

    print("🧠 Training classifier...")
    clf_pipeline = train_classifier(df)

    print("🔍 Creating embeddings...")
    embedder, dish_embeddings = create_embeddings(df)

    print("\n🍴 Generating menus...\n")
    test_occasions = [
        "Corporate lunch",
        "South Indian wedding dinner",
        "Festival buffet",
        "Birthday party",
    ]

    for occasion in test_occasions:
        result = generate_menu(occasion, df, clf_pipeline, embedder, dish_embeddings, top_k=8)
        print(f"\n=== {occasion.upper()} ===")
        print(f"Predicted Cuisine: {result['predicted_cuisine']}")
        for d in result["menu"]:
            veg = "Veg" if d["veg"] else "Non-Veg"
            print(f" - {d['dish_name']} ({d['course']}, {veg})")
