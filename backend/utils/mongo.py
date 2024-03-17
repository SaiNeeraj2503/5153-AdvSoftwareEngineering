from pymongo import MongoClient

# MongoDB Atlas connection string
MONGO_URI = "mongodb+srv://cluster0:advse@cluster0.gfau9ro.mongodb.net/"


def extract_domain(email):
    domain = email.split('@')[-1]
    return domain.replace('.', '-')  # Replace '.' with '-'


def get_database(email):
    domain = extract_domain(email)
    client = MongoClient(MONGO_URI)  # Update with your MongoDB connection string
    return client[domain]

