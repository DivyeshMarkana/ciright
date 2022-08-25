export interface Element {
    name: string;
    category: string;
    quantity: number;
    price: number;
    manufacture: string;
    expiry: string;
    lot: string;
}

export const PRODUCT_DATA: Element[] = [
    { name: 'Potato Chips', category: 'Snakes', quantity: 230, price: 10, manufacture: '2022-2-23', expiry: '2022-4-5', lot: 'A13B456' },
    { name: 'Milk', category: 'Dairy', quantity: 20, price: 30, manufacture: '2021-7-1', expiry: '2021-7-3', lot: 'A853C5X' },
    { name: 'Curd', category: 'Dairy', quantity: 14, price: 11, manufacture: '2022-2-23', expiry: '2022-2-28', lot: 'A343C5X' },
    { name: ' Amul Chocolate', category: 'Bakery', quantity: 67, price: 100, manufacture: '2021-6-13', expiry: '2022-5-8', lot: 'C5443C5X' },
    { name: 'Potato Chips', category: 'Snakes', quantity: 230, price: 10, manufacture: '2022-2-23', expiry: '2022-4-5', lot: 'A13B456' },
    { name: 'Milk', category: 'Dairy', quantity: 20, price: 30, manufacture: '2021-7-1', expiry: '2021-7-3', lot: 'A853C5X' },
    { name: 'Curd', category: 'Dairy', quantity: 14, price: 11, manufacture: '2022-2-23', expiry: '2022-2-28', lot: 'A343C5X' },
    { name: ' Amul Chocolate', category: 'Bakery', quantity: 67, price: 100, manufacture: '2021-6-13', expiry: '2022-5-8', lot: 'C5443C5X' },
];