//background-color: teal;
var texto= [];
var objetoactual={}
var graf
var grafComp=false
var repetido= false
var ranking = {}
var rankingSmart={}
var copiaranking= {}
var copiarankingsmart={}
var cantidadCaracteres= {}
var cantidadCaracteresSmart= {}
var botonTop = document.getElementById("botonTop");
var botonSearch = document.getElementById("botonSearch");
var botonGraf = document.getElementById("botonGraf");
var info = document.getElementById("info")
var palabrasUnicas= []
var palabrasUnicasLimpias= []
var contenidoLimpio = []
var copiaLimpia1=[]
var sumatoria
var sumatoriaSmart
var promedio
var promedioSmart
var controlador=false
var controladorSmart=false
var promedioactual
var articulos= ["de","que", "el", "la", "los", "las", "un", "una", "unos", "unas", "lo","a","ante","con","desde","en","entre","hacia","hasta","para","por","según","sin","sobre","tras","durante","mediante","y","e","ni","que","pero","más","aunque","sino","siquiera","o","u","sea","ya","éste","aquél","pues","porque","como","más","menos","así","si","tal","aunque","tanto","cuando","apenas","mientras","su","se","le","es","al","él","del","me","te","mi","eso","qué","sus","esto","muy","ese","este","ese","esa","aquello","aquella","tan"]
document.getElementById('file-input').addEventListener("change", LeerArchivo, false)
botonSearch.addEventListener("click", BuscarPalabra)
botonTop.addEventListener("click", generarTop)
botonGraf.addEventListener("click", mostrarData)
var micanvas=document.getElementById("micanvas").getContext("2d")
var c1=0
var c2=0
var c3=0
var c4=0
var c5=0
var c6=0
var c7=0
var c8=0
var c9=0
var c10=0
var c11=0
var c12=0
var c13=0
var c14=0
var c15=0
var c16=0
var c17=0
var c18=0
var c19=0
var c20=0
var c21=0
var c22=0
var c23=0
/////////////              //////////////////////////
///////////// LEER ARCHIVO //////////////////////////
/////////////              //////////////////////////
/////////////              //////////////////////////
function LeerArchivo(e)
{
    resetear()
    var archivo = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e)
    {
        var contenido = e.target.result;
        for(var i=0; i < contenido.length; i++)
        {
            texto.push(contenido[i])
        }
        contenido =contenido.toLowerCase()
        contenido= contenido.trim()
        contenido= contenido.replace(/[/¿?¡!—;,:.()""“”-]/g," ")
        contenido= contenido.replace(/\r?\n|\r/g," ")
        contenido =contenido.split(" ")
        for(r=0; r<contenido.length;r++)    
        {
            let palabraActual=contenido[r]
            if(palabraActual != "")
            {
                contenidoLimpio.push(palabraActual)
                copiaLimpia1.push(palabraActual)
            }
        }
        limpiarcontenido(copiaLimpia1)
        return contenidoLimpio
    }
    reader.readAsText(archivo)
}



/////////////              //////////////////////////
///////////// BUSCAR WORD  //////////////////////////
/////////////              //////////////////////////
/////////////              //////////////////////////
function BuscarPalabra()
{
    borrarGraf()
    palabraBuscada= prompt("¿Que palabra deseas buscar?")
    palabraBuscada= palabraBuscada.toLowerCase()
    let contador=0
    for(o of contenidoLimpio)
    {
        if(palabraBuscada==o)
        {
            contador=contador+1
        }
    }
    info.innerHTML= "La palabra \"" + palabraBuscada + "\" aparece " + contador + " veces."   
}

/////////////              //////////////////////////
///////////// CREATE TOP   //////////////////////////
/////////////              //////////////////////////
/////////////              //////////////////////////

function generarTop()
{
    borrarGraf()
    rankingsize= prompt("¿De qué tamaño deseas que sea el ranking?")
    let check = confirm("¿Desea quitar articulos, preposiciones y conjunciones del texto?")
    if(check==true)
    {
        crearRankingSmart()
        copiarankingsmart=rankingSmart
        let copiamaximo=0
        let copiapuesto=1
        info.innerHTML=""
        for(var i = 0; i < rankingsize;i++)
        {
            for(var clave in copiarankingsmart)
            {
                if(copiarankingsmart[clave] > copiamaximo)
                {
                    palabramaxima= [clave]
                    copiamaximo=copiarankingsmart[clave]
                }
            }
            info.innerHTML= info.innerHTML +"<br/>"+copiapuesto+"° puesto \""+palabramaxima+"\" aparece "+copiarankingsmart[palabramaxima]+" veces, es decir "+ (copiarankingsmart[palabramaxima]/copiaLimpia1.length*1000).toFixed(2)+" veces por cada 1000 palabras"
            copiapuesto=copiapuesto+1
            copiarankingsmart[palabramaxima]=0
            copiamaximo=0   
        }
    }
    else
    {
        crearRanking()
        copiaranking=ranking
        let maximo=0
        let puesto=1
        info.innerHTML=""
        for(var i = 0; i < rankingsize;i++)
        {
            for(var clave in copiaranking)
            {
                if(copiaranking[clave] > maximo)
                {
                    palabramaxima= [clave]
                    maximo=copiaranking[clave]
                }
            }
        info.innerHTML= info.innerHTML +"<br/>"+puesto+"° puesto \""+palabramaxima+"\" aparece "+copiaranking[palabramaxima]+" veces, es decir "+ (copiaranking[palabramaxima]/contenidoLimpio.length*1000).toFixed(2)+" veces por cada 1000 palabras"
        puesto=puesto+1
        copiaranking[palabramaxima]=0
        maximo=0
        }
    }
}





/////////////              //////////////////////////
///////////// GRAF AND STAT//////////////////////////
/////////////              //////////////////////////
/////////////              //////////////////////////

    
function mostrarData()
{
    let check = confirm("¿Desea quitar articulos, preposiciones y conjunciones del texto?")
    if(check==true)
    {
        for(var p in copiaLimpia1)
        {
            for(var f in palabrasUnicasLimpias)
            {
                if(copiaLimpia1[p] ==palabrasUnicasLimpias[f])
                {
                    repetido = true
                }
            }
            if(repetido==false)
            {
                palabrasUnicasLimpias.push(copiaLimpia1[p])
            }
            repetido=false
        }
        contarCaracteresSmart()
        longest()
        info.innerHTML="El texto posee " + copiaLimpia1.length + " palabras."  +"<br/>"
        + "La variedad de palabras distintas es de "+ palabrasUnicasLimpias.length +"<br/>"
        + "Lo que implica un porcentaje del "+ (palabrasUnicasLimpias.length/copiaLimpia1.length*100).toFixed(0) + "%" +"<br/>"
        + "La palabra más larga es "+ hgh.toUpperCase()+ " con " +lll+ " caracteres"
        controladorSmart=true
    }
    else
    {
        for(var p in contenidoLimpio)
        {
            for(var f in palabrasUnicas)
            {
                if(contenidoLimpio[p] ==palabrasUnicas[f])
                {
                    repetido = true
                }
            }
            if(repetido==false)
            {
                palabrasUnicas.push(contenidoLimpio[p])
            }
            repetido=false
        }
        contarCaracteres()
        longest()
        info.innerHTML="El texto posee " + contenidoLimpio.length + " palabras."  +"<br/>"
        + "La variedad de palabras distintas es de "+ palabrasUnicas.length +"<br/>"
        + "Lo que implica un porcentaje del "+ (palabrasUnicas.length/contenidoLimpio.length*100).toFixed(0) + "%"+"<br/>"
        + "La palabra más larga es "+ hgh.toUpperCase+ " con " +lll+ " caracteres"
        controlador=true
    }
    crearvariables()
    creargraf()
}
/////////////              //////////////////////////
///////////// RANKING      //////////////////////////
/////////////              //////////////////////////
/////////////              //////////////////////////

function crearRanking()
{
    ranking={}
    for(var i in contenidoLimpio)
    {
        ranking[contenidoLimpio[i]]=(ranking[contenidoLimpio[i]] || 0) +1
    }
    return ranking
}
/////////////              //////////////////////////
///////////// RANKING SMART//////////////////////////
/////////////              //////////////////////////
/////////////              //////////////////////////

function crearRankingSmart()
{
    rankingSmart={}
    limpiarcontenido()
    for(var i in copiaLimpia1)
    {
        rankingSmart[copiaLimpia1[i]]=(rankingSmart[copiaLimpia1[i]] || 0) +1
    }
    return rankingSmart
}

function limpiarcontenido(copiaLimpia1)
{
    for(a in articulos)
    {
        for(w in copiaLimpia1)
        {
            if(copiaLimpia1[w]==articulos[a])
            {
                copiaLimpia1.splice(w,1)
            }
        }
    }
    return copiaLimpia1
}
/////////////              //////////////////////////
///////////// CANTI CARACT //////////////////////////
/////////////              //////////////////////////
/////////////              //////////////////////////

function contarCaracteres()
{
    cantidadCaracteres= {}
    sumatoria=0
    for(k in contenidoLimpio)
    {
        cantidadCaracteres[contenidoLimpio[k].length]=(cantidadCaracteres[contenidoLimpio[k].length] || 0)+1
        sumatoria= sumatoria + contenidoLimpio[k].length
    }
    promedio= sumatoria/contenidoLimpio.length
    return cantidadCaracteres
}
/////////////              //////////////////////////
///////////// CANT S CHARAC//////////////////////////
/////////////              //////////////////////////
/////////////              //////////////////////////

function contarCaracteresSmart()
{
    cantidadCaracteresSmart={}
    sumatoriaSmart=0
    for(k in copiaLimpia1)
    {
        cantidadCaracteresSmart[copiaLimpia1[k].length]=(cantidadCaracteresSmart[copiaLimpia1[k].length] || 0)+1
        sumatoriaSmart= sumatoriaSmart + copiaLimpia1[k].length
    }
    promedioSmart= sumatoriaSmart/copiaLimpia1.length
    return cantidadCaracteresSmart
}

/////////////              //////////////////////////
///////////// CREAR GRAFICA//////////////////////////
/////////////              //////////////////////////
/////////////              //////////////////////////
function creargraf()
{
    borrarGraf()
    Chart.defaults.global.defaultFontFamily = "Helvetica";
    Chart.defaults.global.defaultFontSize = 24;
    Chart.defaults.global.defaultFontColor = "white";
    graf = new Chart(micanvas,{
        type:"bar",
        data:{
            labels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
            datasets:[
                {
                    label:"Promedio letras por palabra:  "+ promedioactual.toFixed(2),
                    backgroundColor:"white",
                    data:[c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17,c18,c19,c20,c21,c22,c23]

                }
            ]
        }
    })    
    grafComp=true
}


/////////////              //////////////////////////
///////////// CREAR VARIABL//////////////////////////
/////////////              //////////////////////////
/////////////              //////////////////////////
function crearvariables()
{
    objetoactual={}
    promedioactual=0
    if(controlador==true)
    {
        objetoactual=cantidadCaracteres
        promedioactual=promedio
        controlador=false
    }
    else if(controladorSmart==true)
    {
        objetoactual=cantidadCaracteresSmart
        promedioactual=promedioSmart
        controladorSmart=false
    }
    for(var cl in objetoactual)
    {
        if(cl==1)
        {
            c1=Object.values(objetoactual)[cl-1]
        }
        if(cl==2)
        {
            c2=Object.values(objetoactual)[cl-1]
        }
        if(cl==3)
        {
            c3=Object.values(objetoactual)[cl-1]
        }
        if(cl==4)
        {
            c4=Object.values(objetoactual)[cl-1]
        }
        if(cl==5)
        {
            c5=Object.values(objetoactual)[cl-1]
        }
        if(cl==6)
        {
            c6=Object.values(objetoactual)[cl-1]
        }
        if(cl==7)
        {
            c7=Object.values(objetoactual)[cl-1]
        }
        if(cl==8)
        {
            c8=Object.values(objetoactual)[cl-1]
        }
        if(cl==9)
        {
            c9=Object.values(objetoactual)[cl-1]
        }
        if(cl==10)
        {
            c10=Object.values(objetoactual)[cl-1]
        }
        if(cl==11)
        {
            c11=Object.values(objetoactual)[cl-1]
        }
        if(cl==12)
        {
            c12=Object.values(objetoactual)[cl-1]
        }
        if(cl==13)
        {
            c13=Object.values(objetoactual)[cl-1]
        }
        if(cl==14)
        {
            c14=Object.values(objetoactual)[cl-1]
        }
        if(cl==15)
        {
            c15=Object.values(objetoactual)[cl-1]
        }
        if(cl==16)
        {
            c16=Object.values(objetoactual)[cl-1]
        }
        if(cl==17)
        {
            c17=Object.values(objetoactual)[cl-1]
        }
        if(cl==18)
        {
            c18=Object.values(objetoactual)[cl-1]
        }
        if(cl==19)
        {
            c19=Object.values(objetoactual)[cl-1]
        }
        if(cl==20)
        {
            c20=Object.values(objetoactual)[cl-1]
        }
        if(cl==21)
        {
            c21=Object.values(objetoactual)[cl-1]
        }
        if(cl==22)
        {
            c22=Object.values(objetoactual)[cl-1]
        }
        if(cl==23)
        {
            c23=Object.values(objetoactual)[cl-1]
        }
    }
}

function borrarGraf()
{
    if(grafComp)
    {
        graf.destroy()
        grafComp=false
    }
}


function resetear()
{
    texto= [];
    objetoactual={}
    grafComp=false
    repetido= false
    ranking = {}
    rankingSmart={}
    copiaranking= {}
    copiarankingsmart={}
    cantidadCaracteres= {}
    cantidadCaracteresSmart= {}
    palabrasUnicas= []
    palabrasUnicasLimpias= []
    contenidoLimpio = []
    copiaLimpia1=[]
    controlador=false
    controladorSmart=false
}

function longest()
{
    lll=0
    for(zgl of contenidoLimpio)
    {
        if(zgl.length> lll)
        {
            lll=zgl.length
            hgh=zgl
        }
    }
}
