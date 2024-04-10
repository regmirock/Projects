from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Registration,Credentials
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import authenticate, login

from django.contrib import messages
#from django.shortcuts import render
#from .models import Credentials
#for extension
from rest_framework.decorators import api_view
from rest_framework.response import Response


def register(request):
    return render(request,"register.html" ) 
 
def index(request):
    return render(request,"index.html" )

def login1(request):
    return render(request,"login1.html" )

#def extlogin(request):
    return render(request,"extlogin.html")

def newpage(request):
    return render(request,"newpage.html")

def insertuser(request):
    fullname = request.POST["fullname"];
    email = request.POST["email"];
    password = request.POST["password"];
    hashed_password = make_password(password)
    us = Registration(Name=fullname, Email=email, Password=hashed_password );
    us.save();
    return redirect('index')

def save_credentials(request):
    sitename = request.POST["Site"];
    username = request.POST["Username"];
    password = request.POST["Password"];
    hashed_password = make_password(password)
    # Retrieve email from session
    email = request.session.get('user_email')

    us = Credentials(SiteName=sitename, Username=username, Email=email, Password=hashed_password );
    us.save();
    return redirect('newpage')



def user_prof(request):
    if 'user_email' not in request.session:
        return redirect('login1')

    try:
        email = request.session.get('user_email')
        user = Registration.objects.get(Email= email)
        user_info = {
            'user_name': user.Name,
            'user_email': user.Email,
        }
        return render(request, 'newpage.html', user_info)  # Pass context directly
    except Registration.DoesNotExist:
        return redirect('login1')  # Or display appropriate error message





def user_vault(request):
    email = request.session.get('user_email')

    print("User email:", email)

    user_credentials = Credentials.objects.filter(Email=email)
    print("User credentials:", user_credentials)

    context = {'user_credentials': user_credentials}

    if not user_credentials:
        context['no_credentials'] = True  # Add a flag for empty credentials

    return render(request, 'newpage.html', context)
    



def user_login(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        try:
            user = Registration.objects.get(Email=email)
            if check_password(password, user.Password):
                # Authentication successful
                # You can store user information in the session or use Django's built-in authentication system
                request.session['user_id'] = user.id  # Store user ID in the session
                request.session['user_email'] = email
                return redirect('newpage')  # Redirect to the home page or any other page you want
            else:
                error_message = 'Invalid password'
        except Registration.DoesNotExist:
            error_message = 'User with this email does not exist'

        return render(request, 'login1.html', {'error_message': error_message})

    return render(request, 'login1.html')
#def user_login(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        # Use Django's authenticate method for user verification
        user = authenticate(Email=email, Password=make_password(password))

        if user is not None:
            # User is authenticated, log them in
            login(request, user)
            return redirect('newpage')  # Redirect to your desired page

        else:
            # Authentication failed, provide error message
            error_message = 'Invalid login credentials.'
            return render(request, 'login1.html', {'error_message': error_message})

    return render(request, 'login1.html')
    


#for extension
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password
from django.contrib.auth import get_user_model

def extlogin(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Retrieve the user based on the email
        User = get_user_model()
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            user = None

        if user is not None and check_password(password, user.password):
            # Authentication successful
            return JsonResponse({'message': 'Login successful'})
        else:
            # Authentication failed
            return JsonResponse({'message': 'Invalid credentials'}, status=401)
