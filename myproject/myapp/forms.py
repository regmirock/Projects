from django import forms 
from .models import MyFormData

class MyForm (forms.ModelForm):
	class Meta:
			model =MyFormData
			fields = ["name", "email"]