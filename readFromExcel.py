import pandas as pd
import os
import json
from dotenv import load_dotenv

load_dotenv()
path = os.getenv('PATH_TO_FILE')
PATH_TO_JSON = os.getenv('PATH_TO_JSON')

# Read data data from excel file as pandas dataframe
df = pd.read_excel(path,engine='openpyxl')

# Get language keys from dataframe
l = df.columns
l_drop = [x for x in l if "Unnamed" in x]
l_lang = [x for x in l if not "Unnamed" in x and x != "Key"]
df.drop(l_drop,inplace=True,axis=1)

translations_by_language = {}

# Construct json object for each language
for e in l_lang:
    translations_by_language[e] = {"translation": dict(zip(df["Key"],df[e]))}
# Write json object to file
with open(PATH_TO_JSON,"w+") as f:
    json.dump(translations_by_language, f)