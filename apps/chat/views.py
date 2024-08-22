from django.shortcuts import render
from .models import Message, Room

# Create your views here.


def home(request):
    messages = Message.objects.all()
    rooms = Room.objects.all()
    return render(request, 'index.html', {
        "messages": messages,
        "rooms": rooms
    })
