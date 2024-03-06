from pymongo import MongoClient

# MongoDB Atlas connection string
MONGO_URI = "put_your_mongo_atlas_uri_here"


def extract_domain(email):
    domain = email.split('@')[-1]
    return domain.replace('.', '-')  # Replace '.' with '-'


def get_database(email):
    domain = extract_domain(email)
    client = MongoClient(MONGO_URI)  # Update with your MongoDB connection string
    return client[domain]

