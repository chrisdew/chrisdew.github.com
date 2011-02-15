--- 
layout: post
title: Django problem with multiple recursive relationships in the model.
created: 1216277151
---
I was about to post this to the Django users list - but then I found the cause...  

Hi, I've just started to play around with Django, but the Admin doesn't seem to work once I introduce multiple recursive relations into a model.  (It's a toy family tree application.)

When the 'father' line is hashed out, it works without a problem.  When I unhash it (and recreate the sql table) the action of saving a person through the admin interface produces the stack trace below.

If I remove the the related_name parameter from the father line, it works.  Unfortunately this parameter seems to be needed when a class has more than one recursive relationships to itself.

Thanks,

Chris.


Solution:

The problem is with names chosen for the related_name arguments.  It seems that 'father_id' clashes with something else.  Using 'father_foo' causes it to work without a problem.


<code type="python">
class Person(models.Model):
    date_of_birth = models.DateField('date of birth')
    date_of_death = models.DateField('date of death', null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    father = models.ForeignKey('self', related_name='father_id', null=True, blank=True)
    #mother = models.ForeignKey('self', related_name='mother_id',  null=True, blank=True)

    class Admin:
        pass

    class Meta:
        verbose_name_plural = 'people'
</code>



<code>
Environment:

Request Method: POST
Request URL: http://localhost:8000/admin/ftree/person/add/
Django Version: 0.97-pre-SVN-unknown
Python Version: 2.5.1
Installed Applications:
['django.contrib.auth',
 'django.contrib.contenttypes',
 'django.contrib.sessions',
 'django.contrib.sites',
 'familytree.ftree',
 'django.contrib.admin']
Installed Middleware:
('django.middleware.common.CommonMiddleware',
 'django.contrib.sessions.middleware.SessionMiddleware',
 'django.contrib.auth.middleware.AuthenticationMiddleware',
 'django.middleware.doc.XViewMiddleware')


Traceback:
File "/usr/lib/python2.5/site-packages/django/core/handlers/base.py" in get_response
  85.                 response = callback(request, *callback_args, **callback_kwargs)
File "/usr/lib/python2.5/site-packages/django/contrib/admin/views/decorators.py" in _checklogin
  62.             return view_func(request, *args, **kwargs)
File "/usr/lib/python2.5/site-packages/django/views/decorators/cache.py" in _wrapped_view_func
  44.         response = view_func(request, *args, **kwargs)
File "/usr/lib/python2.5/site-packages/django/contrib/admin/views/main.py" in add_stage
  264.             new_object = manipulator.save(new_data)
File "/usr/lib/python2.5/site-packages/django/db/models/manipulators.py" in save
  101.         new_object = self.model(**params)
File "/usr/lib/python2.5/site-packages/django/db/models/base.py" in __init__
  233.             setattr(self, field.attname, val)
File "/usr/lib/python2.5/site-packages/django/db/models/fields/related.py" in __set__
  341.         manager.add(*value)

Exception Type: TypeError at /admin/ftree/person/add/
Exception Value: add() argument after * must be a sequence
</code>
