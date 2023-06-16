from django.urls import path
from . import views

app_name = 'login'
##########dont forget to chage the javascript to dynamicccccc###############################
urlpatterns = [path('', views.index, name='index'),
               path('submit/userprofile.html', views.userProfie, name='userProfile'),
               path('homepage/', views.homepage, name='homepage'),
               path('login/', views.loginpage, name='log'),
               path('submit/',views.submit,name='submission'),
               path('searchByName/',views.search,name='searchin'),
               path('searchstud/',views.searchStudent,name="searchstudent"),
               path('activeStuds/',views.actinactive,name='actinact'),
               path('addnewstudent/',views.addnewStud,name="addnew"),
               path('add-student/', views.addStudent, name='add_student'),
               path('updateStudent.html', views.update_student, name='update_student'),
               path('edit_student/',views.editstud,name="editstudent"),
               path('department-form.html', views.editDept, name='editDepartment'),
               path('assignDept/',views.assigndept,name="assigndepartmentbut"),
               path('change_toact/',views.changestatus,name="changetoactt"),
            #    path('department-form.html', views.department_form, name='department_form'),
                ]
