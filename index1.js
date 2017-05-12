/* let fs=require('fs');
let ln = require('readline').createInterface({
  input: fs.createReadStream('gdpdata.csv')
});
let data=[];
let data_1=[];
let i=0;

ln.on('line', function (a) {
  //data=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  //console.log(a);
  data=a.split(',');
	data_1[i]=data;
	i++;});

ln.on('close',function(){pl
	console.log(data_1);
  
	data_json=JSON.stringify(data_1);
	fs.writeFile('gdp_json.json', data_json);
	send(data_1[]);
});
*/

let fs=require('fs');
let ln = require('readline').createInterface({
  input: fs.createReadStream('gdpdata.csv')
  });

let arr_1 = [];
ln.on('line', (line) => {
    arr_1.push(line);

})

.on('close', () => {
  send(arr_1);

});
console.log(arr_1);

function send(arr_1){
    let header = arr_1[0].split(',');//Retrieving header row from CSV fil
    

    // Stores each row in arr-1 as a object
    let arr_2 = [];
    for(i=1;i<arr_1.length;i++){
        let tmp_arr = arr_1[i].split(',');// Stores 'i'th row in temporary array
        let j=0;
        let temp_obj={};
        let test = tmp_arr.forEach(function(x) {
                temp_obj[header[j]] = x; // Stores each element in array as property/value pair in temp_object
                j++
        }); // End of forEach
        arr_2.push(temp_obj);
    } // End of for  loop
    arr_2.forEach(function(data){
      console.log(data)
    })
 
  //   gdp by country
console.log("gdp by country");

    let json_pop=[];
let gdp1 = 'gdp (Millions) - 2013';
arr_2.forEach(function(x){

let temp_obj={};
temp_obj['Country'] = x['Country Name']; 
temp_obj['gdp'] = Number(x[gdp1]);
json_pop.push(temp_obj); 

}); 
json_pop.splice(json_pop.length-2,2);
json_pop.sort(function(a,b)
{
  return parseFloat(b.gdp) - parseFloat(a.gdp);
});

fs.writeFileSync('output/gdp.json',JSON.stringify(json_pop));// End of forEach
console.log(json_pop);



//GDP By Country
console.log("GDP By Country")
let json_gdp=[];
let gdp='GDP Billions (US$) - 2013';
arr_2.forEach(function(y){
 let tmp_obj={};
 tmp_obj['Country']=y['Country Name'];
  tmp_obj['values']=Number(y[gdp]);
  json_gdp.push(tmp_obj);
  });
json_gdp.splice(json_gdp.length-2,2);
json_gdp.sort(function(a,b)
{
  return parseFloat(b.values) - parseFloat(a.values);
});
fs.writeFileSync('output/gdp.json',JSON.stringify(json_gdp));
console.log(json_gdp);


//Purchasing Power in Billions ( Current International Dollar) - 2013 By Country
console.log("Purchasing Power in Billions ( Current International Dollar) - 2013 By Country")
let json_pow=[];
let pow = 'Purchasing Power in Billions ( Current International Dollar) - 2013';
arr_2.forEach(function(z){
  let tmp_pow={};
  tmp_pow['Country']=z['Country Name'];
  tmp_pow['values']=Number(z[pow]);
  json_pow.push(tmp_pow);
});
json_pow.splice(json_pow.length-2,2);
json_pow.sort(function(a,b)
{
  return parseFloat(b.values) - parseFloat(a.values);
});
fs.writeFileSync('output/power.json',JSON.stringify(json_pow));
console.log(json_pow);


//Plot the growth in gdp from 2010 to 2013
console.log("Plot the growth in gdp from 2010 to 2013")
let plot=[];
let gdp_10 = 'gdp (Millions) - 2010';
let gdp_11 = 'gdp (Millions) - 2011';
let gdp_12 = 'gdp (Millions) - 2012';
let gdp_13 = 'gdp (Millions) - 2013';
let pow_10 = 'Purchasing Power in Billions ( Current International Dollar) - 2010';
let pow_11 = 'Purchasing Power in Billions ( Current International Dollar) - 2011';
let pow_12 = 'Purchasing Power in Billions ( Current International Dollar) - 2012';
let pow_13 = 'Purchasing Power in Billions ( Current International Dollar) - 2013';
arr_2.forEach(function(y)
{
 let tmp_obj={};
 tmp_obj['Country']=y['Country Name'];
  tmp_obj['power2010']=Number(y[pow_10]);
  tmp_obj['power2011']=Number(y[pow_11]); 
  tmp_obj['power2012']=Number(y[pow_12]);
  tmp_obj['power2013']=Number(y[pow_13]);
  tmp_obj['gdp2010']=Number(y[gdp_10]);
  tmp_obj['gdp2011']=Number(y[gdp_11]); 
  tmp_obj['gdp2012']=Number(y[gdp_12]);
  tmp_obj['gdp2013']=Number(y[gdp_13]);
plot.push(tmp_obj);
  });
console.log(plot);

fs.writeFileSync('output/plotpower.json',JSON.stringify(plot));

//Aggregate the gdp and GDP of the G20 countries by continent and plot
console.log("Aggregate the gdp and GDP of the G20 countries by continent and plot")
let agg=[];

//aggregrate the gdp
arr_2.forEach(function(y)
{
 let tmp_obj={};
 tmp_obj['Country_Name']=y['Country Name'];
  tmp_obj['total_value']=Number(y['gdp (Millions) - 2010'])+Number(y['gdp (Millions) - 2011'])+
    Number(y['gdp (Millions) - 2012'])+Number(y['gdp (Millions) - 2013']);
agg.push(tmp_obj);
});
console.log(agg);
fs.writeFileSync('output/aggr.json',JSON.stringify(agg));
  
  //aggregrate the GDP of G20 Countries
  console.log("aggregrate the GDP of G20 Countries")
let agg_gdp=[]
  arr_2.forEach(function(y)
{
 let tmp_obj2={};
 tmp_obj2['Country_Name']=y['Country Name'];
  tmp_obj2['totalGDP_value']=Number(y['GDP Billions (US$) - 2010'])+Number(y['GDP Billions (US$) - 2011'])+
    Number(y['GDP Billions (US$) - 2012'])+Number(y['GDP Billions (US$) - 2013']);
agg_gdp.push(tmp_obj2);
});
  console.log(agg_gdp);

console.log("Final aggregrate the GDP of G20 Countries")
let Continents={
  Argentina:'South_America',  Brazil:'South_America',
 Canada:'North_America',  Mexico:'North_America',USA:'North_America',
  France:'Europe', Germany:'Europe',Italy:'Europe',UnitedKingdom:'Europe',
  EuropeanUnion:'Europe',
  India:'Asia', 
  China:'Asia',Indonesia:'Asia',Japan:'Asia',Russia:'Asia'
  ,'Saudi Arabia':'Asia',Korea:'Asia',Turkey:'Asia',

  Australia:'Australia',
  'South Africa':'Africa',
  World:'World',

}
 let cont_pop = {
    Africa : 0,
    Asia : 0,
    Australia:0,
    Europe:0,
    North_America : 0,
    South_America:0
  }
  let cont_GDP ={
    Africa : 0,
    Asia : 0,
    Australia:0,
    Europe:0,
    North_America : 0,
    South_America:0
  }
  let final_data=[];
  for(let i=0;i<agg.length;i++){
   cont_pop[Continents[agg[i].Country_Name]] += parseInt(agg[i].total_value);
 
   cont_GDP[Continents[agg[i].Country_Name]]+= parseInt(agg_gdp[i].totalGDP_value);
 }
 tmp_obj={}
 tmp_obj.continent='Africa';
 tmp_obj.pop=cont_pop['Africa'];
 tmp_obj.gdp=cont_GDP['Africa'];
 final_data.push(tmp_obj);

 tmp_obj1={}
 tmp_obj1.continent='North_America';
 tmp_obj1.pop=cont_pop['North_America'];
 tmp_obj1.gdp=cont_GDP['North_America'];
final_data.push(tmp_obj1);

tmp_obj2={}
tmp_obj2.continent='South_America';
tmp_obj2.pop=cont_pop['South_America'];
tmp_obj2.gdp=cont_GDP['South_America'];
final_data.push(tmp_obj2);

 tmp_obj3={}
 tmp_obj3.continent='Asia';
 tmp_obj3.pop=cont_pop['Asia'];
 tmp_obj3.gdp=cont_GDP['Asia'];
 final_data.push(tmp_obj3);
 
 tmp_obj4={}
  tmp_obj4.continent='Australia';
 tmp_obj4.pop=cont_pop['Australia'];
 tmp_obj4.gdp=cont_GDP['Australia'];
 final_data.push(tmp_obj4);

 tmp_obj5={}
 tmp_obj5.continent='Europe';
 tmp_obj5.pop=cont_pop['Europe'];
 tmp_obj5.gdp=cont_GDP['Europe'];
 final_data.push(tmp_obj5);

console.log(final_data);
  fs.writeFileSync('output/aggregration.json',JSON.stringify(final_data))
};
