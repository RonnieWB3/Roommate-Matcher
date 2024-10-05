from django.db import models

class TestMode(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__self(self):
        return self.name  
    