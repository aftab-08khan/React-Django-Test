from rest_framework import generics
from .models import Book
from .serializers import BookSerializer
from rest_framework.filters import SearchFilter
from rest_framework import permissions
from django_filters.rest_framework import DjangoFilterBackend
class BookListCreateAPIView(generics.ListCreateAPIView):
    queryset = Book.objects.all().select_related('author')

    serializer_class = BookSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]    
    search_fields =  ['title','author']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    