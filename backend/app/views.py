from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from utils.mongo import get_database
import json
import bcrypt
import uuid
import math
from datetime import datetime

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

def create_listing(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            company_name = data.get('companyName')
            role = data.get('role')
            requirements = data.get('requirements')
            description = data.get('description')
            apply_link = data.get('applyLink')
            applyEmail = data.get('applyEmail')
            salary = data.get('salary')
            location = data.get('location')
            expected_joining_date = data.get('expectedJoiningDate')
            email = data.get('userEmail')
            listing_type = data.get('listingType')

            db = get_database(email)
            
            listing_id = str(uuid.uuid4())

            listing_data = {
                'listingId': listing_id,
                'companyName': company_name,
                'role': role,
                'requirements': requirements,
                'description': description,
                'applyLink': apply_link,
                'email': applyEmail,
                'salary': salary,
                'location': location,
                'expectedJoiningDate': expected_joining_date,
                'userEmail': email,
            }

            if listing_type == 'job':
                listings_collection = db["JOBS"]
                listing_data['listingType'] = 'job'
            elif listing_type == 'internship':
                listings_collection = db["INTERNSHIPS"]
                listing_data['listingType'] = 'internship'
            else:
                return JsonResponse({'error': 'Invalid listing type'}, status=400)

            listings_collection.insert_one(listing_data)

            return JsonResponse({'message': 'Listing created successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

def get_listings(request):
    try:
        page = int(request.GET.get('page', 1))
        email = request.GET.get('email')
        listing_type = request.GET.get('type')
        listings_per_page = 4
        start_index = (page - 1) * listings_per_page

        db = get_database(email)
        if listing_type == 'job':
            listings_collection = db["JOBS"]
        elif listing_type == 'internship':
            listings_collection = db["INTERNSHIPS"]
        else:
            return JsonResponse({'error': 'Invalid listing type'}, status=400)

        listings_cursor = listings_collection.find({}, {'_id': False}).skip(start_index).limit(listings_per_page)
        listings = list(listings_cursor)

        total_listings = listings_collection.count_documents({})

        total_pages = math.ceil(total_listings / listings_per_page)
        return JsonResponse({
            'listings': listings,
            'totalPages': total_pages
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
def create_group(request):
    try:
        if request.method == 'POST':
            data = json.loads(request.body)

            user_id = data.get('user_id')
            group_name = data.get('groupName')
            group_description = data.get('groupDescription')
            group_image = data.get('groupImage')
            users = data.get('users', [])
            email = data.get('email')
            
            db = get_database(email)
            groups_collection = db['GROUPS']

            group_data = {
                'user_id': user_id, 
                'group_id': str(uuid.uuid4()),
                'admin': email,
                'group_name': group_name,
                'group_description': group_description,
                'group_image': group_image,
                'users': users,
            }
            
            groups_collection.insert_one(group_data)

            activity_description = f"🎉 Congratulations! You've just initiated a new group named '{group_name}'. Let's start building an amazing community together! 🚀"

            admin_activity_data = {
                'user_id': user_id,
                'description': activity_description,
                'created_at': datetime.now(),
            }
            user_activity_collection = db['user_activity']
            user_activity_collection.insert_one(admin_activity_data)

            for user in users:
                if user != user_id:
                    user_activity_data = {
                        'user_id': user,
                        'description': f"🌐 Welcome to the community! You've joined the group '{group_name}'. Let's embark on this journey together! 🚀",
                        'created_at': datetime.now(),
                    }
                    user_activity_collection.insert_one(user_activity_data)

            return JsonResponse({'message': 'Group created successfully'})
        else:
            return JsonResponse({'error': 'Only POST requests are allowed for this endpoint'}, status=405)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
        

def get_users(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        db = get_database(email)
        users_collection = db['USERS']
        
        users = list(users_collection.find({}, {'_id': 0}))
        
        return JsonResponse({'users': users})
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def get_groups(request):
    email = request.GET.get('email')
    if email:
        db = get_database(email)
        groups_collection = db['GROUPS']
        groups = list(groups_collection.find())
        serialized_groups = [{'id': str(group['group_id']), 'name': group['group_name'], 'image': group['group_image'], 'isAdmin': email==group['admin']} for group in groups]
        return JsonResponse({'groups': serialized_groups})
    else:
        return JsonResponse({'error': 'Email parameter is missing'}, status=400)
    

def post_message(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        group_id = data.get('groupId')
        message_content = data.get('content')
        email = data.get('email')

        timestamp = datetime.now()

        try:
            message_id = str(uuid.uuid4())
            message = {
                'message_id': message_id,
                'group_id': group_id,
                'message_content': message_content,
                'timestamp': timestamp
            }

            db = get_database(email)
            messages_collection = db['MESSAGES']

            messages_collection.insert_one(message)

            return JsonResponse({'message_id': message_id,'group_id':group_id, 'message_content':message_content, 'timestamp': timestamp, 'success': True}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e), 'success': False}, status=500)

    else:
        return JsonResponse({'error': 'Invalid request method', 'success': False}, status=405)



def get_messages(request):
    if request.method == 'GET':
        group_id = request.GET.get('groupId')
        email = request.GET.get('email')
        print(group_id, email)
        try:
            db = get_database(email)
            messages_collection = db['MESSAGES']

            messages = messages_collection.find({'group_id': group_id}).sort([('timestamp', 1), ('group_id', 1)])

            message_list = [{'message_id': str(message['_id']), 'group_id': str(message['group_id']), 'content': message['message_content'], 'timestamp': message['timestamp']} for message in messages]

            return JsonResponse({'messages': message_list}, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    

def update_user(request):
    data = json.loads(request.body)
    user_id = data.get('userId')
    new_username = data.get('username')
    new_email = data.get('email')
    current_password = data.get('currentPassword')
    new_password = data.get('newPassword')

    try:
        database = get_database(new_email)
        users_collection = database['USERS']

        user = users_collection.find_one({'user_id': user_id})
        if not user:
            return JsonResponse({'error': 'User not found'}, status=404)
        if not bcrypt.checkpw(current_password.encode('utf-8'), user['password'].encode('utf-8')):
            return JsonResponse({'error': 'Current password is incorrect'}, status=400)

        if new_username:
            user['username'] = new_username
        if new_email:
            user['email'] = new_email
        if new_password:
            hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
            user['password'] = hashed_password.decode('utf-8')

        users_collection.update_one({'user_id': user_id}, {'$set': user})

        return JsonResponse({'message': 'User details updated successfully'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def user_activity(request):
    userId = request.GET.get('userId')
    page_number = int(request.GET.get('page', 1))
    page_size = 10 
    start_index = (page_number - 1) * page_size
    end_index = start_index + page_size

    email = request.GET.get('email')

    if not userId or not email:
        return JsonResponse({'error': 'userId and email are required'}, status=400)

    try:
        database = get_database(email)
        user_activity_collection = database['user_activity']
        
        total_activities = user_activity_collection.count_documents({'user_id': userId})
        
        total_pages = (total_activities + page_size - 1) // page_size

        user_activity = user_activity_collection.find({'user_id': userId}).sort('created_at', -1)[start_index:end_index]
        activity_list = [{
            'description': activity['description'],
            'created_at': activity['created_at']
        } for activity in user_activity]

        return JsonResponse({'activities': activity_list, 'totalPages': total_pages}, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
def save_feedback(request):
    try:
        data = json.loads(request.body)
        userID = data.get('userId')
        email = data.get('email')
        
        usageFrequency = data.get('usageFrequency')
        motivation = data.get('motivation')
        mostUsedFeature = data.get('mostUsedFeature')
        improvements = data.get('improvements')
        feedback = data.get('feedback')
        timestamp = datetime.now()

        database = get_database(email)

        feedback_collection = database['FEEDBACK']

        feedback_data = {
            'userId': userID,
            'usageFrequency': usageFrequency,
            'motivation': motivation,
            'mostUsedFeature': mostUsedFeature,
            'improvements': improvements,
            'feedback': feedback,
            'timestamp': timestamp
        }

        feedback_collection.insert_one(feedback_data)

        return JsonResponse({'message': 'Feedback saved successfully'}, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

