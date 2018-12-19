import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { DataService } from '../data.service';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.scss']
})
export class ShoppingItemComponent implements OnInit {

  shoppingItemList: Item[] = [];
  selectedItem: Item;
  toggleForm: boolean = false;

  constructor(private dataService: DataService) { }

  getItems(){
    this.dataService.getShoppingItems()
      .subscribe((items: Item[]) => {
        this.shoppingItemList = items;
        //console.log('data from dataservice: '+ this.shoppingItemList);
      })
  }

  addItem(frm){
      let newItem: Item = {
      itemName: frm.value.itemName,
      itemQuantity: frm.value.itemQuantity,
      itemBought: false
    }
    this.dataService.addShoppingItem(newItem)
      .subscribe(item => {
        console.log(item);
        this.getItems();
      });
  }

  deleteItem(id){
    this.dataService.deleteShoppingItem(id)
      .subscribe(data => {
        console.log(data);
        if(data == 1){
          for(let i = 0; i < this.shoppingItemList.length; i++){
            if(id == this.shoppingItemList[i]._id){
              this.shoppingItemList.splice(i,1);
            }
          }
        }
      })
  }

  showEditForm(item){
    this.selectedItem = item;
    this.toggleForm = !this.toggleForm;
  }
  
  ngOnInit() {
    this.getItems();
  }

}
