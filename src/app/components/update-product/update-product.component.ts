import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Element } from '../inventory/inventory.component';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Element) { }

  ngOnInit(): void {
  }

  product_form = new FormGroup({
    name: new FormControl(null),
    category: new FormControl(null),
    quantity: new FormControl(null),
    price: new FormControl(null),
    manufacture: new FormControl(null),
    expiry: new FormControl(null),
    lot: new FormControl(null),
  })

  update() {

  }

}
