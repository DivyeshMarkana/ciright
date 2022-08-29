import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
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
  manufacture: any;
  expiry: any;
  lot: string;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  // filterdDate: string

  ProductRenderArray: any[] = []
  productData: any[] = []

  constructor(private dialog: MatDialog, public firestore: Firestore) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    const dbInstance = collection(this.firestore, 'products')
    onSnapshot(dbInstance, (snapshot) => {
      let product: any[] = []
      snapshot.docs.forEach((doc) => {
        product.push({ ...doc.data(), id: doc.id })
      })
      this.ProductRenderArray = product
      this.productData = product
    })
  }

  selected_category: any[] = []

  categories = [
    { category: 'Snakes', id: 1 },
    { category: 'Dairy', id: 2 },
    { category: 'Bakery', id: 3 },
  ]

  tempDataStoreArray: any[] = []
  newArr: any[] = []

  filterProducts(event: any) {

    // if (event.target.checked) {
    //   // alert('checked')

    //   for (const product of this.product_array) {
    //     if (product.category === event.target.value) {
    //       this.selected_category.push(product)
    //     }
    //   }
    //   this.dataSource = this.selected_category
    // } else {

    // }



    if (event.target.checked) {
      this.tempDataStoreArray = this.productData.filter((product) => product.category == event.target.value)
      this.ProductRenderArray = []
      this.newArr.push(this.tempDataStoreArray)

      for (let index = 0; index < this.newArr.length; index++) {
        var firstArray = this.newArr[index]

        for (let index = 0; index < firstArray.length; index++) {
          var obj = firstArray[index]
          this.ProductRenderArray.push(obj)
        }
      }
    } else {
      this.tempDataStoreArray = this.ProductRenderArray.filter((product) => product.category != event.target.value)
      this.newArr = []
      this.ProductRenderArray = []
      this.newArr.push(this.tempDataStoreArray)
      for (let index = 0; index < this.newArr.length; index++) {
        var firstArray = this.newArr[index]

        for (let index = 0; index < firstArray.length; index++) {
          var obj = firstArray[index]
          this.ProductRenderArray.push(obj)
        }
      }
    }

    if (!event.target.checked) {
      this.getProducts()
    }
  }

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

  update(item) {
    const dialogRef = this.dialog.open(UpdateProductComponent, {
      width: '800px',
      height: '500px',
      data: {
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
        manufacture: item.manufacture,
        expiry: item.expiry,
        lot: item.lot
      }
    })
    let product: any;
    dialogRef.afterClosed().subscribe(result => {
      product = result

      const dataToUpdate = doc(this.firestore, 'products', item.id)
      updateDoc(dataToUpdate, {
        name: product.name,
        category: product.category,
        quantity: product.quantity,
        price: product.price,
        manufacture: new Date(product.manufacture),
        expiry: new Date(product.expiry),
        lot: product.lot

      }).then(response => {
        // alert('data updated')
        this.getProducts()
      }).catch((err) => {
        alert(err.message)
      })
    })
  }

  applyManufactureFilter(dateString: any) {

    let filterdarray: any[] = []
    for (const iterator of this.productData) {
      let date = new Date(iterator.manufacture.seconds * 1000).getTime()

      let date1 = new Date(dateString).getTime()
      if (date === date1) {
        // alert('ddddd')
        filterdarray.push(iterator)
        this.ProductRenderArray = filterdarray
      }
    }
  }

  applyExpiryFilter(dateString) {

    let filterdarray: any[] = []
    for (const iterator of this.productData) {
      let date = new Date(iterator.expiry.seconds * 1000).getTime()

      let date1 = new Date(dateString).getTime()

      if (date === date1) {
        // alert('ddddd')
        filterdarray.push(iterator)
        this.ProductRenderArray = filterdarray
      }
    }
  }

  clearFilter(manufacture, expiry) {
    manufacture.value = ''
    expiry.value = ''
    document.querySelectorAll('.checkbox').forEach(_checkbox => {
      (<HTMLInputElement>_checkbox).checked = false;
    });
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
