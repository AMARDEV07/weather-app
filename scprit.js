const userTab=document.querySelector("[data-userWeather]");
const searchTab =document.querySelector("[data-searchWeather]");

const UserContainer =document.querySelector(".weather-container");
const gurantAcessContainer=document.querySelector(".grant-location-container");
const  searchForm=document.querySelector("[data-searchForm]");
const lodingScreen=document.querySelector(".Loding-container");
const useIinfocontainer=document.querySelector(".user-info-container");
const Ercontainer=document.querySelector(".erro")





let oldTab = userTab;
const API_KEY="866969aef76e91f075b025495901a565";
//addding bg colour tab;
oldTab.classList.add("current-Tab");
//add clour bg
getFormsessionStorage();




// switching tab  function;



function switchTab(newTab){
    //for changing tab bgor tab
   
    
    //shift bg colour;
    if(newTab != oldTab) {
        oldTab.classList.remove("current-Tab");
        oldTab = newTab;
        //add bg colur in current tab;
        oldTab.classList.add("current-Tab");
        //ui change


        if(!searchForm.classList.contains("active")){
            // Ercontainer.classList.remove("active");
            //searchfor agr visble nhi ha toh visible kr na bahi
            useIinfocontainer.classList.remove("active");
            gurantAcessContainer.classList.remove("active");
            searchForm.classList.add("active");
           
        }

        else{
            //search tab pa tha ab wather tab pa janaha toh usa visible krna hoga
            searchForm.classList.remove("active");
           
            useIinfocontainer.classList.remove("active");
            //   an ma weather tab ma hu oh kux dispaly krna padga toh calling own coordinate.
            getFormsessionStorage();

        }
    }
   
}
userTab.addEventListener("click",()=>{
    switchTab(userTab);

});

searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
});



//check pressent cordinates.
function getFormsessionStorage(){
    // console.log("ky b ho ni r");
    const localCordinates = sessionStorage.getItem("user-coordinates");
    if(!localCordinates){
        //agar local coordintes nahi milatoh loacaton ui open kr dana
        gurantAcessContainer.classList.add("active");
        Ercontainer.classList.remove("active");
       

    }
    else{
        const coordinate=JSON.parse(localCordinates);
        //fetch user.
        fetchWeatherInfo(coordinate);

    }

}


 async function fetchWeatherInfo(coordinate){
    const{lat,lon}=coordinate;
    
    
    //make grant containerr inisible;


    gurantAcessContainer.classList.remove("active");
    Ercontainer.classList.remove("active");
    //make lodervisible

   

    lodingScreen.classList.add("active");
    //api call

    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data =await response.json();
         console.log("data",data);
        lodingScreen.classList.remove("active");
        useIinfocontainer.classList.add("active"); 
        Ercontainer.classList.remove("active");


        renderWheatherUi(data);


        


    }
    catch(err){
        lodingScreen.classList.add("active");
        useIinfocontainer.classList.remove("active"); 
     

        renderWheatherUi(data);

        
    
    }

}




//REANDERING DATA ON UI

function renderWheatherUi(wheatherInfo){
    
   
//fetch all element first.
const cityName=document.querySelector("[dataCityName]");
const countryICone=document.querySelector("[data-country1con]");

    const desc=document.querySelector("[data-Desc]");
  const weatherIcon=document.querySelector("[weatherIcn]");
  const dataTemp=document.querySelector("[dataTemp]");
  const windseed=document.querySelector("[dataWindspeed]");
  const humidityData=document.querySelector("[dataHumitdiy]");
  const cloudnessdata=document.querySelector("[datacloudness]");
 
//putting wherather info in city name;


   cityName.innerText=wheatherInfo?.name;
   countryICone.src= `https://flagcdn.com/144x108/${wheatherInfo?.sys?.country.toLowerCase()}.png`;
   desc.innerText=wheatherInfo?.weather?.[0]?.description;
   weatherIcon.src=`http://openweathermap.org/img/w/${wheatherInfo?.weather?.[0]?.icon}.png`;
   dataTemp.innerText=`${wheatherInfo?.main?.temp}°C`;
   windseed.innerText=`${wheatherInfo?.wind?.speed} m/s`;
   humidityData.innerText=`${wheatherInfo?.main?.humidity}%`;
   cloudnessdata .innerText=`${wheatherInfo?.clouds?.all}%`;
  







}//getlocation funtion;


function getlocation() {
   
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showposition)
      
    }
    else{
        //show alert home work for no geo location alablie
       
      
    }
   
    
}

  
function showposition(position)
{//user coordinates.
    const userCoordinates={
        lat:position.coords.latitude,
        lon:position.coords.longitude,//
    }
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchWeatherInfo(userCoordinates);


}



//gurantAcessContainer//btn pa lister

const grantacessbtn=document.querySelector("[data-generateAcessGrant]");
grantacessbtn.addEventListener("click",getlocation);


const searchInput=document.querySelector("[data-SearchInput]");
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=searchInput.value;
    if(cityName===""){
        return;

    }
    else
      fetchSearchWeatherInfo(cityName);

})
 async function fetchSearchWeatherInfo(city){
    console.log("last one");
    lodingScreen.classList.add("active");
    useIinfocontainer.classList .remove("active");
    gurantAcessContainer.classList.remove("active");
    


    try{
        const response= await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data= await response.json();
        lodingScreen.classList.remove("active");
        useIinfocontainer.classList.add("active");
        Ercontainer.classList.remove("active");
        renderWheatherUi(data);
        
    }

        catch(err){
            useIinfocontainer.classList .remove("active");
            gurantAcessContainer.classList.remove("active");
            lodingScreen.classList.remove("active");
            Ercontainer.classList.add("active");
         
            renderWheatherUi(data);
        
            


        }
        
    }
    








