from django.http import HttpResponse,JsonResponse
from django.template import loader 
from django.shortcuts import render
from .models import User,Student
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers

def index(request):
    return render(request, 'home.html')


def homepage(request):
    return render(request, 'homepage.html')

def loginpage(request):
    return render(request, 'loginform.html')


def submit(request):
    ourUsers = User.objects.all().values()
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        for user in ourUsers:
            if (user['username']==username and user['password']==password):
                return render(request, 'userprofile.html', {'Username': username})
            else:
                return render(request, 'response.html', {'message': 'Invalid request method!'})
    else:
        return render(request, 'response.html', {'message': 'Invalid request method!'})
    
def search(request):
    return render(request, 'search for student .html')


@csrf_exempt
def searchStudent(request):
    if request.method == 'POST':
        student_name = request.POST.get('student_name')
        student = Student.objects.filter(student_name=student_name).first()
        #revise on this part
        if student:
            serialized_student = serializers.serialize('json', [student])
            return JsonResponse(serialized_student, safe=False)
        else:
            return JsonResponse({}, safe=False)

def actinactive(request):
    
    students=Student.objects.filter(student_status=True).values()
    inactstudents=Student.objects.filter(student_status=False).values()
    studentslistdict={'studentslist':students,"inactive":inactstudents}
    
    return render(request, 'act-in.html',studentslistdict)    


def addnewStud(request):
    return render(request,"addNewStudent.html")
def userProfile(request):
    return render(request, 'userprofile.html')
@csrf_exempt
def addStudent(request):
    if request.method == 'POST':
        name=request.POST['name']
        ID=request.POST['ID']
        DOB=request.POST['dateofbirth']
        gpa=request.POST['gpa']
        email=request.POST['Email']
        phonenumber=request.POST['phonenumber']
        educationyear=request.POST['education-year']
        department=request.POST['department']
        gender=request.POST['gender']
        activity=request.POST['activity']
        if gender=="male":
            gender=True
        else:
            gender=False
        if activity=="active":
            activity=True
        else:
            activity=False
        student=Student(student_id=str(ID),student_name=str(name),student_gpa=float(gpa),student_email=str(email),student_phone_number=str(phonenumber)\
                        ,student_date_of_birth=str(DOB),student_year_of_education=str(educationyear),student_department=str(department),\
                              student_gender=gender,student_status=activity)
        student.save()
        
        return render(request, 'response.html', {'message': 'successful insertion'})
    else:
        return render(request, 'response.html', {'message': 'Invalid request method!'})

def update_student(request):
    student_idd = request.GET.get('id')
    

    students=Student.objects.filter(student_id=student_idd).values()
    student=students[0]
    
    studentdatadict = {
        'student_id': student_idd,
        'student_name':student['student_name'],
        'student_gpa':student['student_gpa'],
        'student_department':student['student_department']
        
        
    }
    return render(request, 'updateStudent.html',studentdatadict)



#  path('updateStudent.html', views.update_student, name='update_student'),
#     path('department-form.html', views.department_form, name='department_form'),

        


        


