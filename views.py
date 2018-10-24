from django.http import HttpResponse,HttpResponseForbidden
from django.shortcuts import render,get_object_or_404


def index(request):
    response = { 'x':"You're looking at the results of question." }
    return render(request, 'photomanager/index.html', response)


def create_album(request):
    width = request.POST.get('width') or '420px'
    height = request.POST.get('height') or '500px'
    value = {'width': width, 'height': height}
    return render(request, 'photomanager/create_album.html', value)