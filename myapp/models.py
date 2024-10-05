from django.db import models

class TestModel(models.Model):
    # This model was used to test connections and admin functionality.
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__self(self):
        return self.name  
    