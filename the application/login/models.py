from django.db import models

class User(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

class Student(models.Model):
    student_id = models.CharField(max_length=100)
    student_name = models.CharField(max_length=255)
    student_gpa = models.FloatField()
    student_email = models.EmailField()
    student_phone_number = models.CharField(max_length=20)
    student_date_of_birth = models.CharField(max_length=100)
    student_year_of_education = models.CharField(max_length=100)
    student_department = models.CharField(max_length=255)
    student_gender = models.BooleanField(choices=[(True, 'Male'), (False, 'Female')])
    student_status = models.BooleanField(choices=[(True, 'Active'), (False, 'Inactive')])
