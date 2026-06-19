from django.db import models
from authors.models import Author
# Create your models here.
class Book(models.Model):
    title  = models.CharField(max_length=200)
    author = models.ForeignKey(Author,on_delete=models.CASCADE , related_name='books' )
    price = models.DecimalField(max_digits=5, decimal_places=2)
    
    def __str__(self):
        return self.title
