import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  fuzzyWordList : Array<string> = [];
  matchWordList : Array<string> = [];
  fuzzyWord : string;
  compareWord : string;
  fuzzyness : number = 70;
  selectedTab:number = 0;

  constructor()  { }

    addWord(){     

    if(this.fuzzyWord!=null){      
      var isExists = false;    
      if(this.fuzzyWordList!=null){
        for(var i = 0 ; i< this.fuzzyWordList.length;i++){
          if(this.fuzzyWordList[i]==this.fuzzyWord){          
              isExists = true;
              break;
          }
        }
      }
      
      if(!isExists)
        this.fuzzyWordList.push(this.fuzzyWord);     

      this.fuzzyWord=null;
    }
  }
    
    runFuzzyTest(){
      
      if(this.fuzzyWordList!=null && 
        this.compareWord !=null && 
        this.fuzzyness!=null){

          this.matchWordList = [];

          for(var i = 0 ; i< this.fuzzyWordList.length;i++){

            var distance= this.calculateLevDistance(this.fuzzyWordList[i],this.compareWord);

            //console.log("Distance : ", distance);

            var length = Math.max(this.fuzzyWordList[i].length,this.compareWord.length);

            //console.log("Length : ", length);


            var score = 1.0 - parseFloat(distance)/length;
          // console.log("score : ", score);

            if(score > (this.fuzzyness/100))
              this.matchWordList.push(this.fuzzyWordList[i]);           
              
          }

          this.selectedTab= 2;
          
        console.log(this.matchWordList);
      }
      else{
        console.log(this.fuzzyWordList);
        console.log(this.fuzzyness);
        console.log(this.compareWord);
      }

    //console.log( this.calculateLevDistance("sagar bapardekar","ar"));

    }

    calculateLevDistance(src, tgt) {
      var realCost;
      
      var srcLength = src.length,
          tgtLength = tgt.length,
          tempString, tempLength; // for swapping
      
      var resultMatrix = new Array();
          resultMatrix[0] = new Array(); // Multi dimensional
      
    
      if (srcLength < tgtLength) {
          tempString = src; src = tgt; tgt = tempString;
          tempLength = srcLength; srcLength = tgtLength; tgtLength = tempLength;
      }
      
      for (var c = 0; c < tgtLength+1; c++) {
          resultMatrix[0][c] = c;
      }
      
      for (var i = 1; i < srcLength+1; i++) {
          resultMatrix[i] = new Array();
          resultMatrix[i][0] = i;
          for (var j = 1; j < tgtLength+1; j++) {
              realCost = (src.charAt(i-1) == tgt.charAt(j-1))? 0: 1;
              resultMatrix[i][j] = Math.min(
                  resultMatrix[i-1][j]+1,
                  resultMatrix[i][j-1]+1,
                  resultMatrix[i-1][j-1] + realCost 
              ); 
          }
      }
      
      return resultMatrix[srcLength][tgtLength];
  }
  
  clearForm(){
    this.fuzzyWord=null;
    this.fuzzyWordList=[];
    this.matchWordList=[];
    this.compareWord=null;
  }

  tabIndexChanged(tabChangeEvent: MatTabChangeEvent){

    //console.log(this.selectedTab);
    //console.log('tabChangeEvent => ', tabChangeEvent);
    //console.log('index => ', tabChangeEvent.index);
    this.selectedTab=tabChangeEvent.index;
  }
  

}
