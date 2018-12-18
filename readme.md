## TFW Printers Checklist System ##

Web application for the management of checklists for print jobs, built with Laravel 5.7 and  Bootstrap 4.

This includes Admin dashboard for management of various business entities (Jobs, Questions, Users, Categories, Departments, Clients) and frontend for users to access the checklists.

### Installation ###

* `git clone https://github.com/david-lobo/tfw.git`
* `cd tfw`
* `composer install`
* `php artisan key:generate`
* Create a database and inform *.env*
* `php artisan migrate --seed` to create and populate tables
* Inform *config/mail.php* for email sends
* `php artisan vendor:publish` to publish filemanager
* `php artisan serve` to start the app on http://localhost:8000/

### Features ###

* Easy management and creation of checklists from Jobs home page
* Admin dashboard with pages for Jobs, Questions, Users, Categories, Departments, Clients
* Authentication (registration, login, logout, password reset)
* Users roles : administrator (all access), subscriber (create, edit, delete Jobs and manage Checklists).

### Packages included ###

* barryvdh/laravel-dompdf
* davejamesmiller/laravel-breadcrumbs
* spatie/laravel-permission
* laravelcollective/html
* bootstrap-select
* bootstrap-tree-view
* gijgo
* smartwizard
* toastr
