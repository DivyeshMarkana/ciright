import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  // transform(value: any, filterdDate: string): any {
  //   if (value.length === 0) {
  //     return value
  //   }

  //   const products: any[] = []

  //   for (let product of value) {
  //     if (product.manufacture === filterdDate) {
  //       products.push(product)
  //     }
  //   }

  //   return products
  // }

  transform(value: any[], searchTerm: string) {
    const result: any[] = []

    for (const product of value) {
      if (product.manufacture === searchTerm) {
        result.push(product)
      }
    }

    if (!value || searchTerm === '') {
      return value
    } else {
      return result
    }
  }
}
