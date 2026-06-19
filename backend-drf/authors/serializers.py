from rest_framework import serializers
from .models import Author 
from books.models import Book
class AuthorBookSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id' , 'title' , 'price' ]

class AuthorSerialzer(serializers.ModelSerializer):
    books = AuthorBookSerialzer(many=True , read_only=True)
    class Meta:
        model = Author
        fields = ['id', 'name','bio','books']

