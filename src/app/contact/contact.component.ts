import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { LocalDataSource } from 'angular2-smart-table';
import { EmailInputComponent } from './email-input.component';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    settings: any;
    data: any;

    source: LocalDataSource;

    constructor(private http: HttpClient) {

        this.settings = [];

        this.data = [];

        this.source = new LocalDataSource();

    }

    ngOnInit(): void {

        this.settings = {

            delete: {
                confirmDelete: true,
            },

            add: {
                confirmCreate: true,
            },
            edit: {
                confirmSave: true,
            },

            columns: {

                firstname: {
                    title: 'First Name',
                    width: '200px',
                },
                lastname: {
                    title: 'Last Name',
                    width: '200px',
                },
                email: {
                    title: 'Email',
                    width: '300px',

                },
                phone: {
                    title: 'Phone No.',
                    width: '250px'
                },
                image: {
                    title: 'Image',
                    filter: false,
                    sort: false
                }
            }
        };

        this.getContacts();

    }

    deleteContact(event): void {

        if (window.confirm('Are you sure you want to delete?')) {

            var option = {

                headers: new HttpHeaders({ 'content-type': 'application/json' }),

            };

            this.http.post('/Contact/updateContact/', { Function: 'Delete', address_id: event.data.address_id }, option).subscribe(results => {

                this.getContacts();

                event.confirm.resolve();

            });

        }
        else {

            event.confirm.reject();
        }

    }

    editContact(event): void {

        if (window.confirm('Are you sure you want to save?')) {

            var param = event.newData;

            var option = {

                headers: new HttpHeaders({ 'content-type': 'application/json' }),

            };

            this.http.post('/Contact/updateContact/', {

                'address_id': param['address_id'],

                'firstname': param['firstname'],

                'lastname': param['lastname'],

                'email': param['email'],

                'phone': param['phone'],

                'image': param['image']

            }, option).subscribe(results => {

                this.getContacts();

                event.confirm.resolve();

            });

        }
        else {

            event.confirm.reject();
        }

    }

    createContact(event): void {

        if (window.confirm('Are you sure you want to save?')) {

            var param = event.newData;

            var option = {

                headers: new HttpHeaders({ 'content-type': 'application/json' }),

            };

            this.http.post('/Contact/updateContact/', {

                'firstname': param['firstname'],

                'lastname': param['lastname'],

                'email': param['email'],

                'phone': param['phone'],

                'image': param['image']

            }, option).subscribe(results => {

                this.getContacts();

                event.confirm.resolve();

            });

        }
        else {

            event.confirm.reject();
        }

    }

    private getContacts(): void {

        this.data = [];

        var params = new HttpParams().set('filter', 'all');

        this.http.get('/Contact/getContacts', { params }).subscribe(results => {

            for (let result of <any>results) {

                this.data.push({

                    address_id: result['id'],

                    firstname: result['firstname'],

                    lastname: result['lastname'],

                    email: result['email'],

                    phone: result['phone'],

                    image: result['image']

                });

            }

            this.source.load(this.data);

        });

    }

}
