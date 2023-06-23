import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers = [
    {name:"Casey", id:123456},
    {name:"Bob", id:987654},
    {name:"Dave", id:159753},
    {name:"Jacob", id:357159},
    {name:"Jonathan", id:975312}
    ]

  constructor() { 

  }

  ngOnInit() {

  }

}