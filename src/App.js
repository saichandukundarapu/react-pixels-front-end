import React,{Component} from 'react';


import './App.css';
import p5 from'p5'; //importing p5 from java-script library



class App extends Component {

  constructor(props){
    super(props);
    this.state = {apiResponse:""}// catching response from API
  }
  callAPI(){
    fetch("http://www.localhost:9000/testAPI")//fetching url adress from API
    .then(res => res.text())
    .then(res =>this.setState({apiResponse:res}));
  }
 

  renderFourth = React.createRef()

  componentDidMount(){
    this.callAPI();//calling created API from node.js
    this.sketch = new p5 (p=>{     // creating p5 instance
      var z ;
      
      /*setting up canvas environment*/
      p.setup = function(){
        p.createCanvas(256,128).parent('renderTarget')  // setting up canvas will 256 X 128
        p.pixelDensity(1); // 1 pixel for one dimension
      }
      /*changing the canvas according to our requirements*/
      p.draw = function(){
        
        p.loadPixels(); // loading pixels to the total canvas (256 x 128p)
        var temp =0;
    var color = 0;

    let arr =[]; // creating array for creating and storing RGB combination values

    /*filling   RGB colour combination in the  array*/  

    for (var num1 =0;num1 < 256;num1 = num1+8){
      for(var num2 = 0 ; num2 <256;num2 = num2+8){
        for (var num3 =0;num3<256;num3 = num3+8){
               arr[temp] =num3
               arr[temp+1] = num2
               arr[temp +2] = num1
              temp = temp+3
        }
   
      }
    
    }
    
    
        
 /*filling  numeric  RGB colour comnination values to the pixels in canvas through itearting and assinging each value*/
        for(var y = 0;y <p.height;y++){

            for(var x =0;x<p.width;x++){
              var index =( x+y *p.width)*4;
              
              p.pixels[index] = arr[color]; // assigning value to the red colour percentage in the combination 
              p.pixels[index+1] =arr[color+1];// assigning value to the green colour percentage in the combination 
              p.pixels[index+2] =arr[color+2];// assigning value to the blue colour percentage in the combination 
              p.pixels[index+3] = 255;        // assigning value to the alpha in the combination 
              color = color+3
             }
      }
       
        p.updatePixels();// after assigning colour percentages updating pixels to the canvas
      }
    
    
    })


  }
  /*rendering the created canvas and response from API on the web browser*/
  render(){
  return (
    <div className="App">
      

      <header className = "App-header"> 
      <div id = "renderTarget"></div>
      
      <p>{this.state.apiResponse}</p>
      </header>
      
      
  

      
    </div>
    
  );
  }
}


export default App;
