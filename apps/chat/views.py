from django.shortcuts import render
from django.http import HttpResponse
from .models import Message, Room
from django.views.generic import DetailView
import json


# Create your views here.


def home(request):
    rooms = Room.objects.all().order_by("-created_at")

    return render(request, "chat/home.html", {"rooms": rooms})


class RoomDetailView(DetailView):
    model = Room
    template_name = "chat/list-messages.html"


def send_message(request, pk):
    data = json.loads(request.body)
    room = Room.objects.get(id=pk)

    new_message = Message.objects.create(user=request.user, text=data["message"])
    room.messages.add(new_message)
    return render(
        request,
        "chat/message.html",
        {
            "message": new_message,
        },
    )


def create_room(request):
    data = json.loads(request.body)
    room = Room.objects.create(user=request.user, title=data["title"])
    return render(request, "chat/room.html", {"room": room})
