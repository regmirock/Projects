from django.shortcuts import render, redirect
form .forms import MyForm

def my_form_view(request):
    if request.method == "POST":
        form =MyForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("success")
        else:
            form = MyForm()
        return render(request, "myapp/my_form.html",{"form":form})

# Create your views here.
