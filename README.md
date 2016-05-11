Alp-Mail
---------

`Alp-Mail` (Alp in Hindi means short-lived) is your self-hosted disposable email
service ala Mailinator. All mails are stored in a database under incoming or
rejected.

Alp-Mail has two components, a configurable SMTP server powered by Haraka and a
simple web app powered by the django admin.

Installation
-------------

Alp-mail has two requirements:
* Node.js (https://nodejs.org/en/download/)
* Django (https://docs.djangoproject.com/en/1.9/intro/install/)

To setup the haraka SMTP server:

```
git clone https://github.com/theju/alp-mail.git  # Clone the source
cd alp-mail/mailer
npm install
./node_modules/.bin/haraka -c .
```

To setup the django web app:

```
# In a different shell
cd alp-mail/server
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Visit `http://localhost:8000/admin/` on your browser and login and add a new
address for which you want to receive emails. Remember to check the `enable`
checkbox or you may not receive any emails.

To test the setup, you can use [swaks](http://jetmore.org/john/code/swaks/)

```
./swaks -t example@localhost -f abc@example.com -s localhost -p 2525
```

where `example@localhost` is the address created in the admin and `localhost`
is the name of the server as specified in `mailer/config/host_list` and `2525`
is the port number specified in `mailer/config/smtp.ini`.


LICENSE
--------

Available under the MIT License. Please check the `LICENSE.md` file for more details
