import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Element } from '../inventory/inventory.component';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateProductComponent>, @Inject(MAT_DIALOG_DATA) public data: Element) { }

  ngOnInit(): void {

    console.log(this.data);
    // alert((new Date(this.data.manufacture.seconds * 1000)))

  }

  product_form = new FormGroup({
    name: new FormControl(this.data.name),
    category: new FormControl(this.data.category),
    quantity: new FormControl(this.data.quantity),
    price: new FormControl(this.data.price),
    manufacture: new FormControl(new Date(this.data.manufacture.seconds * 1000)),
    expiry: new FormControl(new Date(this.data.expiry.seconds)),
    lot: new FormControl(this.data.lot),
  })

  update() {
    this.dialogRef.close(this.product_form.value)
  }

}
