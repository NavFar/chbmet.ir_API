var province={"chb":["SHAHREKO","BOROOJEN","KOOHRANG","LORDEGAN"],
           "azs":["TABRIZ","AHAR","BONAB","JOLFA","SARAB","SAHAND","KALEIBAR","MARAGHEH","MARAND","MIANEH"],
           "azg":["OROOMIEH","KHOY","MAHABAD","MAKOO","PIRANSHR","SALMAS","SARDASHT","TAKAB"],
           "ard":["ARDEBIL","KHALKHAL","MESHKINS","PARSABAD"],
           "esf":["ESFAHAN","ARDESTAN","DARAN","KABOOTAR","KASHAN","KHORBIAB","MEIMEH","GOLPAIGN","NAEIN","NATANZ","SHAHREZA","SHARGHES"],
           "ila":["ILAM","DEHLORAN","EIVANGHA","MEHRAN","DAREHSHA"],
           "bos":["BUSHEHR","BUSHCOST","BANDARDA","BANDARDL","KANGANJA"],
           "teh":["TEHRAN","SHOMALTE","CHITGAR","ABALI","JEOPHYSI","FIROUZKO","FIROUZPL","DOUSHANT","EMAMFORO"],
           "khj":["BIRJAND","GHAEN","KHOREBIR"],
           "khr":["MASHHAD","BOSHROOY","FERDOUS","GHOOCHAN","GOLMAKAN","GONABAD","KASHMAR","NEYSHABO","SABZEVAR","SARAKHS","TORBATEH","TORBATEJ","FARIMAN"],
           "khs":["BOJNURD"],
           "khz":["AHWAZ","ABADAN","AGHAJARI","BANDARMA","BEHBAHAN","BOSTAN","DEZFUL","HENDIJAN","IZEH","MASJEDSO","OMIDIYEH","RAMHORMO","SAFIABAD","SHOSHTAR"],
           "zan":["ZANJAN","MAHNESHA","KHODABAN","KHORMDAR"],
           "sem":["SEMNAN","BIARJAMA","SHAHROUD","GARMSAR","DAMGHAN"],
           "sis":["ZAHEDAN","CHABAHAR","IRANSHAR","KENARAK","KHASH","SARAVAN","ZABOL","ZAHAK","NIKSHAHR","KHAVAF"],
           "far":["SHIRAZ","ABADEH","DARAB","FASSA","LAMERD","LAR","NEIRIZE","SADDOROU","ZARGHAN","EGHLIDEF","SAFASHAR","KAZEROON"],
           "qom":["GHOM","SALAFCHE"],
           "ghz":["GHAZVIN","AVAJ"],
           "kor":["SANANDAJ","BANEH","BIJAR","GHORVEH","MARIVAN","SAGHEZ","ZARINEHO"],
           "ken":["KERMAN","BAFT","BAM","KAHNOUJ","MIANDEHJ","RAFSANJN","SHAHRBAB","SIRJAN","SHAHDAD","LALEHZAR"],
           "keh":["KERMANSH","ESLAMABA","KANGAVAR","RAVANSAR","SARARUDK","SARPOLZO"],
           "koh":["YASOUJ","DOGONBAD"],
           "gol":["GORGAN","GONBADEG","MORAVEHT"],
           "gil":["RASHT","ANZALI","ASTARA","MANJIL","JIRANDEH"],
           "lor":["KHORAMAB","BROUJERD","ALGODARZ","ALESHTAR","AZNA","DOROUD","KOUDASHT","NORABADE","POLDOKHT"],
           "maz":["SARI","RAMSAR","BABOLSAR","NOUSHAHR","GHAEMSHR","AMOL","SIAHBISH","KIASAR"],
           "mar":["ARAK","SAVEH","TAFRESH","KHOMEIN","MAHALLAT"],
           "hor":["BANDARAB","BANDARLN","MINAB","JASK","HAJIABAD","ABOMOOSA","GHESHM","KISH","SIRI","LAVAN"],
           "ham":["HAMEDANF","HAMEDANO","MALAYER","NAHAVAND","TOYSERKA"],
           "yaz":["YAZD","ANAR","BAFGH","MARVAST","ROBATPO","TABASS","AGHDA","GARIZ"]};
var provinceName=
{
"chb":"CharMahaloBakhtiari",
"azs":"AzarbaijanSharghi",
"azg":"AzarbaijanGharbi",
"ard":"Ardebil",
"esf":"Isfahan",
"ila":"Ilam",
"bos":"Bushehr",
"teh":"Tehran",
"khj":"KhorasanJonoobi",
"khr":"KhorasanRazavi",
"khs":"KhorasanShomali",
"khz":"Khoozestan",
"zan":"Zanjan",
"sem":"Semnan",
"sis":"SistanVaBaloochestan",
"far":"Fars",
"qom":"Qom",
"ghz":"Ghazvin",
"kor":"Kordestan",
"ken":"Kerman",
"keh":"Kermanshah",
"koh":"KohgilooyeVaBoyerAhmand",
"gol":"Golestan",
"gil":"Gilan",
"lor":"Lorestan",
"maz":"Mazandaran",
"mar":"Markazi",
"hor":"Hormozgan",
"ham":"Hamedan",
"yaz":"Yazd"
};
var basicPath="http://www.chbmet.ir/stat/archive/iran/";
var statType=[5,6,7,25,36,37];
var statName={
               5:"AVERAGE OF MEAN DAILY TEMPERATURE IN C",
               6:"TEMPERATURE RECORDS LOWEST IN C",
               7:"TEMPERATURE RECORDS HIGHEST IN C",
               25:"MONTHLY TOTAL OF PRECIPITATION IN MM",
               36:"AVERAGE OF WIND SPEED IN KNOTS",
               37:"FASTEST WIND DIRECTION AND SPEED IN KNOTS"
             };
var request = require('request');
var createdPath;
var fs = require('fs');
if (!fs.existsSync("reports"))
fs.mkdirSync('reports');
for(name in province)
{
//  if(name.indexOf("azs")==-1)
//	continue;
  if (!fs.existsSync("reports/"+provinceName[name]))
  fs.mkdirSync("reports/"+provinceName[name]);
  var temp = province[name];
  for(var i=0;i<temp.length;i++)
  {
    for(var j=0;j<statType.length;j++)
    {
      // console.log(provinceName[name]);
      createdPath=name+"/"+temp[i]+"/"+statType[j]+".asp";
      // console.log(basicPath+createdPath);
      getAndSave(basicPath+createdPath,statName[statType[j]],provinceName[name]+"/"+temp[i]);
    }
    // break;
  }
  // break;
}
// getAndSave("http://www.chbmet.ir/stat/archive/iran/yaz/GARIZ/37.asp","temp");
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getAndSave(url,fileName,address){
var fs = require('fs');
var chalk = require('chalk');
if (!fs.existsSync("reports/"+address+"/")){
    fs.mkdirSync("reports/"+address+"/");
}
request(url, function (error, response, body) {
	if(error)
	{
	console.log("error in :"+url);
	}
  if (!error && response.statusCode == 200) {
    if(body.indexOf("404 - File or directory not found.")!=-1)
  {
    console.log(chalk.red("Bad Url: "+url))
  }
    else
{    var answer=body.substr(body.indexOf('<pre>')+5,body.length);
     answer=answer.substr(answer.indexOf('<pre>')+5,answer.length);
    //  console.log(answer);

    // console.log(answer);
    if(answer.indexOf("<a")>-1){
      answer=answer.substr(0,answer.indexOf('<a'));
    }
    else if(answer.indexOf("</pre>")>-1) {
      answer=answer.substr(0,answer.indexOf('</pre>'));
    }
    fs.writeFile("reports/"+address+"/"+fileName+".txt",answer, function(err) {
        if(err) {
            return 	;//console.log("error in :"+url);;
        }
        // console.log("reports/"+address+"/"+fileName+".txt "+" was saved!");
    });
  }}});
}
