from django.shortcuts import render
from django.http import HttpResponse
from .models import Message, Room

# Create your views here.


def home(request):
    rooms = Room.objects.all()
    messages = Message.objects.all()
    return render(request, 'chat/home.html', {'messages': messages, 'rooms': rooms})
