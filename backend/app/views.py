from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from utils.mongo import get_database
import json
import bcrypt
import uuid


# Create your views here.
@require_POST
def signup(request):
    data = json.loads(request.body)
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    print(username, email, password)

    db = get_database(email)

    users_collection = db['USERS']

    existing_user = users_collection.find_one({'email': email})
    if existing_user:
        return JsonResponse({'message': 'User already exists with the same email. Please sign in.'}, status=400)
    
    user_id = str(uuid.uuid4())

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    user_data = {
        'user_id': user_id,
        'username': username,
        'email': email,
        'password': hashed_password
    }

    try:
        users_collection.insert_one(user_data)
        return JsonResponse({'message': 'User created successfully', 'userId': user_id, 'email': email})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)



    