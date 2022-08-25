import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { UpdateProductComponent } from '../update-product/update-product.component';


export interface Element {
  name: string;
  category: string;
  quantity: number;
  price: number;
  manufacture: Date;
  expiry: Date;
  lot: string;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {

  // dataSource = ELEMENT_DATA;
  filterdDate: string

  dataSource: any = []

  constructor(private dialog: MatDialog, public firestore: Firestore) { }

  ngOnInit(): void {
    this.getProducts()
    // alert(this.dataSource);


    // for (const iterator of this.dataSource) {
    //   // let date = new Date(iterator.manufacture)
    //   alert(iterator.manufacture);
    // }
  }

  getProducts() {
    const dbInstance = collection(this.firestore, 'products')
    onSnapshot(dbInstance, (snapshot) => {
      let product: any[] = []
      snapshot.docs.forEach((doc) => {
        product.push({ ...doc.data(), id: doc.id })
      })
      this.dataSource = product

      // let date = new Date(this.dataSource[0].manufacture.seconds * 1000)
      // alert(date)
      // let date1 = new Date('02-06-2022').getTime()
      // alert(date1)
      // alert(date === date1)

      // for (const iterator of this.dataSource) {
      //   let date = new Date(iterator.manufacture.seconds * 1000).getTime()
      //   // alert(date)
      //   // console.log(date);


      //   let date1 = new Date('03-09-2022').getTime()

      //   // alert(date1);

      //   alert(date === date1)
      // }

    })
  }

  categories = ['Snakes', 'Dairy', 'Bakery']

  // onSelectSnake(event: any) {
  //   if (event.target.checked) {
  //     let filterd = this.dataSource.filter
  //   }
  // }

  // onSelectDairy(event: any) {
  //   alert(event.target.checked);
  // }

  // onSelectBakery(event: any) {
  //   alert(event.target.checked);
  // }

  deleteProduct(product) {
    // alert(id)
    const dataToDelete = doc(this.firestore, 'products', product)
    deleteDoc(dataToDelete).then(() => {
      // alert('data deleted')
      this.getProducts()
    }).catch((err) => {
      alert(err.message)
    })
  }

  update(product) {
    // alert(product)
    // const dataToUpdate = doc(this.firestore, 'products', product)
    // updateDoc(dataToUpdate, {
    //   category: 'Spider web'
    // }).then(response => {
    //   // alert('data updated')
    //   this.getProducts()
    // }).catch((err) => {
    //   alert(err.message)
    // })

    // alert(product.category)

    const dialogRef = this.dialog.open(UpdateProductComponent, {
      width: '800px',
      height: '500px',
      data: {
        name: product.name,
        category: product.category,
        quantity: product.quantity,
        price: product.price,
        manufacture: product.manufacture,
        expiry: product.expiry,
        lot: product.lot
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      product = result
    })
  }

  applyManufactureFilter(dateString) {

    let filterdarray: any[] = []
    for (const iterator of this.dataSource) {
      let date = new Date(iterator.manufacture.seconds * 1000).getTime()

      let date1 = new Date(dateString).getTime()
      if (date === date1) {
        alert('ddddd')
        filterdarray.push(iterator)
        this.dataSource = filterdarray
      }
    }
  }

  applyExpiryFilter(dateString) {

    let filterdarray: any[] = []
    for (const iterator of this.dataSource) {
      let date = new Date(iterator.expiry.seconds * 1000).getTime()

      let date1 = new Date(dateString).getTime()

      if (date === date1) {
        // alert('ddddd')
        filterdarray.push(iterator)
        this.dataSource = filterdarray
      }
    }
  }

  clearFilter(manufacture, expiry) {
    manufacture = ''
    expiry = ''

    this.getProducts()
  }

  displayedColumns = ['position', 'name', 'category', 'quantity', 'price', 'manufacture', 'expiry', 'lot', 'actions'];

  open() {
    this.dialog.open(AddProductComponent, {
      width: '800px',
      height: '500px'
    })
  }

}
