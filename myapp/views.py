from django.shortcuts import render
from django.http import JsonResponse

def index(request):
    return render(request, 'index.html')


def test_view(request):
    data = {
        'message': 'Hello from the backend!',
        'status': 'success',
        'data': [1, 2, 3, 4]
    }
    return JsonResponse(data)