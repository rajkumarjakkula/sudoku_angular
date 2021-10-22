import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameoverComponent } from '../gameover/gameover.component';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent implements OnInit {

constructor(public dialog:MatDialog) { }
  onclick=false
  undo_redo_array:Array<string>=[];
  job_done=true
  value=0
  color='dark'
  i=0
  j=0
  ans:string="";
  array=[0,1,2,3,4,5,6,7,8];
  sudoku_array= [ 
    [ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
    [ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
    [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
    [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
    [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
    [ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
    [ 0, 0, 5, 2, 0, 6, 3, 0, 0 ]];
  sudoku_solution=[
    [3, 1 ,6, 5, 7 ,8 ,4 ,9, 2 ],
    [5, 2, 9, 1, 3, 4, 7, 6, 8 ],
    [4, 8, 7, 6, 2, 9, 5, 3, 1 ],
    [2, 6, 3, 4, 1, 5, 9, 8, 7 ],
    [9, 7, 4, 8, 6, 3, 1, 2, 5 ],
    [8, 5, 1, 7, 9, 2, 6, 4, 3 ],
    [1, 3, 8, 9, 4, 7, 2, 5, 6 ],
    [6, 9, 2 ,3, 5, 1, 8, 7, 4 ],
    [7 ,4 ,5 ,2 ,8 ,6 ,3 ,1 ,9]
    ]
    ngOnInit(): void {
      this.game_over();
    }
    game_over(){
      this.sudoku_array;
      this.job_done=true
      console.log(this.sudoku_array)
      for (var i = 0, len = this.sudoku_array.length; i < len; i++){
        //console.log(i)
        for (var j= 0, len = this.sudoku_solution.length; j < len; j++){
        //  console.log(j)
        if (this.sudoku_array[i][j] !== this.sudoku_solution[i][j]){
          this.job_done=false;
        }
    }
    }
    if(this.job_done===true){
      console.log("game over")
      this.dialog.open(GameoverComponent)
    }
    else{
      console.log("not completed")
    }
    }
  open(i:any,j:any){
    this.onclick=true
    
  //  console.log(i,j);
  }
  change_array(i:number,j:number,event:any){
    //console.log(i,j,event.target.value)
    if(this.sudoku_solution[i][j]!==event){
      this.color="red";
    }
    this.sudoku_array[i][j]=Number(event.target.value);

    this.i=i;
    this.j=j;
    this.value=this.sudoku_array[i][j];
  //  console.log(this.sudoku_array)
    this.redo();
    this.onclick=false
    this.game_over()
  }
  redo(){
    let x=this.i.toString();
    let y=this.j.toString();
    let z=this.value.toString();
   // console.log(typeof i,j);
    this.undo_redo_array.push(x+y+z);
    console.log(this.undo_redo_array);
  }
  undo(){
    let x=this.undo_redo_array.pop();
    if(x?.length===2){
    this.i=Number(x[0])
    this.j=Number(x[1])
    this.value=Number(x[2])
    }
    console.log(this.undo_redo_array)
    this.sudoku_array[this.i][this.j]=0
  }
}
