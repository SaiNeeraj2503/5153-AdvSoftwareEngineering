# from django.db import models
# import uuid

# class User(models.Model):
#     userid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     username = models.CharField(max_length=100)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=100)
#     created_at = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         # Specify the MongoDB collection name
#         db_table = 'users'
# issue with commit, just for the test