from rest_framework import generics
from .models import Author
from .serializers import AuthorSerialzer
from rest_framework import permissions
class AuthorListCreateAPIView(generics.ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerialzer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class AuthorDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerialzer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
