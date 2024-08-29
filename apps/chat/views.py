from django.shortcuts import render
from django.http import HttpResponse
from .models import Message, Room
from django.views.generic import DetailView
import json


# Create your views here.


def home(request):
    rooms = Room.objects.all()

    return render(request, "chat/home.html", {"rooms": rooms})


class RoomDetailView(DetailView):
    model = Room
    template_name = "chat/list-messages.html"


def send_message(request, pk):
    data = json.loads(request.body)
    room = Room.objects.get(id=pk)

    new_message = Message.objects.create(user=request.user, text=data["message"])
    room.messages.add()
    return render(
        request,
        "chat/message.html",
        {
            "message": new_message,
        },
    )
