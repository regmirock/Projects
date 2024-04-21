from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Registration,Credentials
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import authenticate, login
from .models import Registration
from django.conf import settings
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from django.core.exceptions import ObjectDoesNotExist
from django.contrib import messages
from cryptography.fernet import Fernet
import base64

#extension
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from django.views.decorators.csrf import csrf_exempt





#site
def register(request):
    return render(request,"register.html" ) 
 
def index(request):
    return render(request,"index.html" )

def login1(request):
    return render(request,"login1.html" )


def newpage(request):
    return render(request,"newpage.html"),

def logout(request):
    return redirect('login1')

def reset_password(request):
    return render(request, 'reset.html')
def insertuser(request):
    fullname = request.POST["fullname"];
    email = request.POST["email"];
    password = request.POST["password"];
    hashed_password = make_password(password)
    us = Registration(Name=fullname, Email=email, Password=hashed_password );
    us.save();
    return redirect('index')

from django.contrib.auth.hashers import make_password
from django.shortcuts import render, redirect
from .models import Registration

def update_password(request):
    if request.method == "POST":
        email = request.POST.get("email", "")
        new_password = request.POST.get("password", "")

        print("Email:", email)
        print("New Password:", new_password)

        # Check if the email exists in the database
        try:
            user = Registration.objects.get(Email=email)
        except Registration.DoesNotExist:
            # Handle the case where the user does not exist
            # Redirect to a password reset form with an error message
            error_message = "The provided email does not exist."
            print(error_message)
            return render(request, 'reset.html', {'error_message': error_message})

        print("User found:", user)

        # Hash the new password
        hashed_password = make_password(new_password)

        print("Hashed Password:", hashed_password)

        # Update the user's password in the database
        user.Password = hashed_password
        user.save()

        print("Password updated successfully")

        # Redirect the user to a success page or login page
        return redirect('login1')  # Adjust this to your login URL name

    # If the request method is not POST, render a page with a form for resetting the password
    return render(request, 'reset.html')

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



def user_login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            user = Registration.objects.get(Email=email)
            if check_password(password, user.Password):
                request.session['user_id'] = user.id
                request.session['user_email'] = email
                return redirect('newpage')
            else:
                error_message = 'Invalid password'
        except Registration.DoesNotExist:
            error_message = 'User with this email does not exist'

        return render(request, 'login1.html', {'error_message': error_message})

    return render(request, 'login1.html')

encryption_key = settings.ENCRYPTION_KEY
cipher_suite = Fernet(encryption_key)

def encrypt_data(data):
    """Encrypt data using Fernet symmetric encryption."""
    encrypted_data = cipher_suite.encrypt(data.encode())
    return encrypted_data.decode()

def decrypt_data(encrypted_data):
    """Decrypt data using Fernet symmetric encryption."""
    decrypted_data = cipher_suite.decrypt(encrypted_data.encode())
    return decrypted_data.decode()

def save_credentials(request):
    if request.method == 'POST':
        sitename = request.POST.get("Site")
        username = request.POST.get("Username")
        password = request.POST.get("Password")
        
        # Encrypt the password before saving
        encrypted_password = encrypt_data(password)
        
        # Retrieve email from session
        email = request.session.get('user_email')

        us = Credentials(SiteName=sitename, Username=username, Email=email, Password=encrypted_password)
        us.save()
        return redirect('/newpage')
    else:
        # Handle GET requests appropriately
        return redirect('/')

def user_vault(request):
    email = request.session.get('user_email')
    if email:
        print("User email:", email)

        user_credentials = Credentials.objects.filter(Email=email)
        print("User credentials:", user_credentials)
        
        user = Registration.objects.get(Email=email)
        user_info = {
            'user_name': user.Name,
            'user_email': user.Email,
        }

        # Decrypt passwords before sending to the template
        decrypted_credentials = []
        for credential in user_credentials:
            decrypted_password = decrypt_data(credential.Password)
            decrypted_credentials.append({
                'SiteName': credential.SiteName,
                'Username': credential.Username,
                'Password': decrypted_password
            })

        context = {
            'user_credentials': decrypted_credentials,
            'user_info': user_info
        }

        if not user_credentials:
            context['no_credentials'] = True  # Add a flag for empty credentials

        return render(request, 'newpage.html', context)
    else:
        # Handle the case where there's no user email in session
        return redirect('/')











    







def login_request(request):
    # Your login logic here
    return JsonResponse({'message': 'Login request received'})


#extension
@csrf_exempt
@require_http_methods(["POST"])
def login_api(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        try:
            user = Registration.objects.get(Email=email)
            if check_password(password, user.Password):  # Correct way to check hashed password
                return JsonResponse({'status': 'success', 'message': 'Login successful'}, status=200)
            else:
                return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=401)
        except Registration.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'User does not exist'}, status=404)

    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)



