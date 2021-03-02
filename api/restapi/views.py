from django.shortcuts import render
from .models import Post
from rest_framework import viewsets
from restapi.serializers import PostSerializer
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.core import serializers

class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Post.objects.all().order_by('-id')
    serializer_class = PostSerializer


@csrf_exempt
def post_create(request):
    
 
    context={}
    if request.method == 'POST':
        data=json.loads(request.body)
        if "id" in data:
            Post.objects.filter(id=data['id']).update(title=data['title'],description=data['description'])
        else:

            post = Post.objects.create(title=data['title'],description=data['description'])
            if(post):
                context={
                'status':'success'
                }
            else:
                context={
                'status':'false'
                }

    return JsonResponse(context)
def delete_view(request,id):
    print(id)
    cat = Post.objects.filter(id=id).delete()
    if(cat):

        context = {
        'status':"success",
        }
    else:
        context = {
        'status':'false'
        }
        
    return JsonResponse(context)
def show_view(request,id):

    try: 
        queryset = Post.objects.get(id=id) 
    except Post.DoesNotExist: 
        return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND)
    serializer = PostSerializer(queryset)
    return JsonResponse(serializer.data)   
