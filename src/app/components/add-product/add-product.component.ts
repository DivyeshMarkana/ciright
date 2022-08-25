import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import { ELEMENT_DATA } from '../inventory/inventory.component';
import { Element } from '../inventory/inventory.component';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(public firestore: Firestore) { }

  ngOnInit(): void {
  }

  product_form = new FormGroup({
    name: new FormControl('Choco'),
    category: new FormControl('Bakery'),
    quantity: new FormControl(67),
    price: new FormControl(120),
    manufacture: new FormControl(null),
    expiry: new FormControl(null),
    lot: new FormControl('SAf4nn44'),
  })

  addProduct() {

    let productData: Element = {
      name: this.product_form.value.name,
      category: this.product_form.value.category,
      quantity: this.product_form.value.quantity,
      price: this.product_form.value.price,
      manufacture: new Date(this.product_form.value.manufacture),
      expiry: new Date(this.product_form.value.expiry),
      lot: this.product_form.value.lot
    }

    const dbInstance = collection(this.firestore, 'products')

    addDoc(dbInstance, productData).then(() => {
      // alert('data sent successfully')
    }).catch((err) => {
      alert(err.message)
    })




    // ELEMENT_DATA.push(productData)

    // localStorage.setItem('product-data', JSON.stringify(ELEMENT_DATA))
  }

}
