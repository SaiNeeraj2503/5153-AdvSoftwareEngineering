from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from utils.mongo import get_database
import json
import bcrypt
import uuid
import math

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



@require_POST
def login(request):
    data = json.loads(request.body)
    email = data.get('email')
    password = data.get('password')

    db = get_database(email)

    users_collection = db['USERS']

    user = users_collection.find_one({'email': email})

    if user:
        if bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            return JsonResponse({'message': 'Login successful', 'userId': user['user_id'], 'email': user['email']})
        else:
            return JsonResponse({'message': 'Invalid email or password'}, status=400)
    else:
        return JsonResponse({'error': 'User not found'}, status=404)
    


def create_post(request):
    try:
        data = json.loads(request.body)
        userId = data.get('userId')
        title = data.get('title')
        description = data.get('description')
        mediaUrl = data.get('mediaUrl')
        timestamp = data.get('timestamp')
        email = data.get('email')
        
        db = get_database(email)
        
        posts_collection = db["POSTS"]

        postId = str(uuid.uuid4())
        
        post_data = {
            'postId': postId,
            'userId': userId,
            'title': title,
            'description': description,
            'mediaUrl': mediaUrl,
            'timestamp': timestamp,
        }
        posts_collection.insert_one(post_data)
        
        return JsonResponse({'message': 'Post created successfully'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    

def get_posts(request):
    try:
        email = request.GET.get('email')
        page = int(request.GET.get('page', 1))
        posts_per_page = 5

        start_index = (page - 1) * posts_per_page

        db = get_database(email)
        total_posts_count = db["POSTS"].count_documents({})

        if start_index >= total_posts_count:
            return JsonResponse([], safe=False)

        end_index = min(start_index + posts_per_page, total_posts_count)

        posts = db["POSTS"].find().skip(start_index).limit(end_index - start_index)

        serialized_posts = []
        for post in posts:
            user_data = db["USERS"].find_one({'user_id': post['userId']})
            if user_data:
                username = user_data['username']
            else:
                username = '' 

            serialized_post = {
                'id': str(post['_id']),
                'userId': post['userId'],
                'username': username,
                'title': post['title'],
                'description': post['description'],
                'mediaUrl': post['mediaUrl'],
                'timestamp': post['timestamp'],
            }
            serialized_posts.append(serialized_post)

        return JsonResponse(serialized_posts, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
def create_product(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            userId = data.get('userId')
            email = data.get('email')
            productName = data.get('productName')
            price = data.get('price')
            description = data.get('description')
            mobileNumber = data.get('mobileNumber')
            images = data.get('images')

            db = get_database(email)
        
            products_collection = db["PRODUCTS"]

            productId = str(uuid.uuid4())

            product_data = {
                'productId': productId,
                'userId': userId,
                'productName': productName,
                'price': price,
                'description': description,
                'mobileNumber': mobileNumber,
                'images': images
            }

            products_collection.insert_one(product_data)

            return JsonResponse({'message': 'Product created successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


def get_products(request):
    page = int(request.GET.get('page', 1))
    email = request.GET.get('email')
    products_per_page = 8
    start_index = (page - 1) * products_per_page
    end_index = start_index + products_per_page

    db = get_database(email)
    products_collection = db["PRODUCTS"]

    products_cursor = products_collection.find({}, {'_id': False}).skip(start_index).limit(products_per_page)
    products = list(products_cursor)

    total_products = products_collection.count_documents({})

    total_pages = math.ceil(total_products / products_per_page)
    return JsonResponse({
        'products': products,
        'totalPages': total_pages
    })


