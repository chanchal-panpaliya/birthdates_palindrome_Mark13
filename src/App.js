import './App.css';
import { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment';

import  Facebook  from '@material-ui/icons/Facebook';
import  Twitter  from '@material-ui/icons/Twitter';
import  LinkedIn  from '@material-ui/icons/LinkedIn';
import  GitHub  from '@material-ui/icons/GitHub';
 

class App extends Component {

  constructor(props){
    super(props)
            this.state ={
              DOB : "",
              flag : false,
              NextYearPalinDate: "",
              DiffDays:""
            }
  }


  onhandle_getBirthdate = (e) =>{     
           this.setState({ DOB: e.target.value })
  }

ConvertDateToString = (date) =>{
    //  let getDOB = this.state.DOB;
       let getDOB = date;

    let DateToString = {Day:"",Month:"",Year:""}

        var DayofWeek   = moment(getDOB).format('DD');
        var DayofMonth = moment(getDOB).format('MM');
        var DayofYear  = moment(getDOB).format('YYYY');

        // console.log("DayofWeek"+DayofWeek+"DayofMonth"+DayofMonth+"DayofYear"+DayofYear)

        DateToString.Day = DayofWeek.toString();
        DateToString.Month = DayofMonth.toString();
        DateToString.Year = DayofYear.toString();

        // if(DayofWeek<10){
        //   DateToString.Day = "0" + DayofWeek;
        // }else{
        //   DateToString.Day = DayofWeek.toString();
        // }

        // if(DayofMonth<10){
        //   DateToString.Month = "0" + DayofMonth;
        // }else{
        //   DateToString.Month = DayofMonth.toString();
        // }

        // DateToString.Year = DayofYear.toString();
    
      return DateToString;
   }

  
  DateFormats = (date) =>{
    let getDate = this.ConvertDateToString(date); 
    let CreateDateArray = [];
    
    CreateDateArray.push(getDate.Day+getDate.Month+getDate.Year)
    CreateDateArray.push(getDate.Month+getDate.Day+getDate.Year)
    CreateDateArray.push(getDate.Year+getDate.Month+getDate.Day)
    CreateDateArray.push(getDate.Day+getDate.Month+(getDate.Year).slice(-2))
    CreateDateArray.push(getDate.Month+getDate.Day+(getDate.Year).slice(-2))
    CreateDateArray.push((getDate.Year).slice(-2)+getDate.Month+getDate.Day)

    
    // console.log(CreateDateArray)

    //  CreateDateArray.push((moment(getDate).format('DD-MM-YYYY')).split('-').join(""));
    //  CreateDateArray.push((moment(getDate).format('MM-DD-YYYY')).split('-').join(""));
    //  CreateDateArray.push((moment(getDate).format('YYYY-MM-DD')).split('-').join(""));
    //  CreateDateArray.push((moment(getDate).format('DD-MM-YY')).split('-').join(""));
    //  CreateDateArray.push((moment(getDate).format('MM-DD-YY')).split('-').join(""));
    //  CreateDateArray.push((moment(getDate).format('YY-MM-DD')).split('-').join(""));

    return CreateDateArray;
  }

  isPalindrome = (getstringdate) =>{
    let rev ='';
      for (var i = getstringdate.length - 1; i >= 0; i--)
      rev += getstringdate[i];
   
      if(getstringdate === rev)
          return 0
  }


  CalculatePalindromeNumber=(date)=>{
    let getAllFormateDateArray = this.DateFormats(date); 
    this.setState({flag:false})

       for (let list in getAllFormateDateArray){
               if(this.isPalindrome(getAllFormateDateArray[list])===0){
                //  return true
                return 0
             }
       }
  }

//--------------------------------------------------------------------------

  getMaxdays =(Month,Year)=>{
  
    let MaxDays = 0;

    if(Month == "01" || Month == "03" || Month == "05" || Month == "07" || Month == "08" || Month == "10" || Month == "12"){
      MaxDays = 31
    }else if(Month == "04" || Month == "06" || Month == "09" || Month == "11" ){
      MaxDays = 30
    }else if(Year%4 == 0 && Year%100 != 0 || Year%400 == 0 ){
      MaxDays = 29
    }else{
      MaxDays = 28
    } 
  

      return MaxDays
  }


  getNextPalindromeDate =  () =>{
    // debugger;
    let getDOB = this.state.DOB;

    var Day = moment(getDOB).format('DD');
    var Month = moment(getDOB).format('MM');
    var Year  = moment(getDOB).format('YYYY');
    //2021-09-10
    let count = 0;
    
  while(true){

      let date = Year+"-"+Month+"-"+Day;
      let MaxDays = this.getMaxdays(Month,Year);
      if((Day>0 && Day<=MaxDays) && (Month>0 && Month<13)){
        if(this.CalculatePalindromeNumber(date)===0){
       
           if(this.state.DOB === date){
             this.setState({flag:true,NextYearPalinDate:""})
           }else{
             this.setState({NextYearPalinDate:date,DiffDays:count})
            //  console.log("Next Year -----> "+date+"days left===>"+count) 
           }
          break
        }else{
               Day = parseInt(Day)+1;
             if(Day>MaxDays){
                Day = 1;
                Month = parseInt(Month)+1;
                 if(Month>12){
                   Month = 1
                   Year = parseInt(Year)+1;
                 }  
             }
          }

      }

      count ++;
    }  

  }




  HOMErender(){
    return (
      <div className="App">
        <div className="palindrome-heading"> Is your Birthday Palindrome? 🤔</div>
        <form  noValidate>
          <div className="palindrome-DOBtext"> 
            <TextField id="date" label="Birthday" value={this.state.DOB} type="date" onChange={this.onhandle_getBirthdate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="palindrome-Button">
            {this.state.DOB? 
            <Button variant="contained" style={{background:'rgba(218,112,214, 1)',color:'white'}} onClick={this.getNextPalindromeDate}>Check Palindrome Number</Button>:
             <span style={{cursor:'no-drop'}}>
             <Button variant="outlined" color="primary" disabled>Check Palindrome Number</Button>
             </span>}
          </div>

          {this.state.flag ? <div> Your DOB is Palindrome </div> : <div>  </div>} 

           {this.state.NextYearPalinDate && this.state.DiffDays ? 
            <div className="palindrome-result">
              The nearest palindrome date is {(moment(this.state.NextYearPalinDate).format('DD-MM-YYYY')) }, you missed by {this.state.DiffDays} days.
            </div> 
            : 
            null}
       </form>
      </div>
    );
  }
 
render(){
  return(
    <div className="container-palindrome">
    <div className="background-palindrome">
      <div style={{width:'-webkit-fill-available',position:'fixed'}}>
          <div className="menu__logoSpace"> 
              <a href="/" className="menu__logo"> Creator Space </a>
          </div>
          <div className="menu__socialItems">
                  <a className="menu__socialLink" target="_blank" href='https://www.facebook.com/chanchal.panpaliya'> 
                    <span className="menu__socialIcon">
                      <Facebook  style={{color:'grey'}}/>
                    </span>
                  </a> <br/><br/>
                  <a className="menu__socialLink" target="_blank" href='https://twitter.com/CPanpaliya'> 
                     <span className="menu__socialIcon">
                        <Twitter style={{color:'grey'}}/>
                     </span>
                  </a><br/><br/>
                  <a className="menu__socialLink" target="_blank" href='https://www.linkedin.com/in/chanchal-panpaliya-0b0436112'> 
                    <span className="menu__socialIcon">
                      <LinkedIn style={{color:'grey'}}/> 
                      </span>
                  </a> <br/><br/>
                  <a className="menu__socialLink" target="_blank" href='https://github.com/chanchal-panpaliya'> 
                    <span className="menu__socialIcon">
                      <GitHub style={{color:'grey'}}/>
                    </span>
                </a>
              </div>
      </div>
    </div>
    <div className="body-frame-palindrome">
      {this.HOMErender()}
    </div> 
</div>
  )
}

}

export default App;

