$(document).ready(init);

var arrastrado = false; 
function init(){
    
    alert("Toooook init " + sessionStorage.getItem("token"));

    if (sessionStorage.getItem("token")!=null){
        alert("TenemosToken");
        $("#aLogin").text(" Logout");  
        $("#aRegistro").text(" Mi Perfil");
       /* var icono = document.createElement("span");
        icono.setAttribute("class","glyphicon glyphicon-log-in" );
        $("#aRegistro").append(icono);*/
        var li_registro = document.getElementById("li_registro");
        var aRegistro = document.createElement("a");
        aRegistro.setAttribute("id", "aRegistro");
        var iRegistro = document.createElement("span");
        iRegistro.setAttribute("class","glyphicon glyphicon-log-in");
        
  //      var registro = document.getElementById("iconoRegistro");
    //    registro.setAttribute("class", "glyphicon glyphicon-log-in");

   
    }
 
    $("#aRegistro").click(function(){
        $("#modalRegistro").modal("show");
     });
    
    $("#aLogin").click(function(){
        if($("#aLogin").text() === " Login"){
            $("#modalLogin").modal("show");
        } else {
            sessionStorage.removeItem("token");
            $("#aLogin").text(" Login");
        }
    });
    
    $("#nuevo_usuario").click(function(){
         $("#modalLogin").modal("hide");
         $("#modalRegistro").modal("show");
    })
    
       
   /* $('#aLogin').click(function(){
        $(this).find('i').toggleClass('glyphicon glyphicon-log-in').toggleClass('glyphicon glyphicon-off');
    }); */
    
    $("#accederLogin").click(function(){
        if ($("#usr_log").val()==="" || $("#pwd_log").val()===""){
            alert("Usuario o contraseña incorrectos.");
            $("#modalLogin").modal("show");
        } if (arrastrado != true){
            alert("Arrastra la imagen para completar el proceso.")
        }else {
            requestLogin();
        }
    });
    
  
  /*  $('#calendar').data("DateTimePicker").date(moment(new Date ).format('DD/MM/YYYY HH:mm'));
    $("#calendar").click(function(){
        alert(1);
    });*/
//$('#datetimepicker2').data("DateTimePicker").date(new Date());    });
        /*$("#calendar").datetimepicker({
                viewMode: 'years'
            });
        . data ("DateTimePicker"). FUNCTION ()
    });*/
  /*  $("#iconoLogin").toggleClass(function() {
        if ($("#buttonLogin").text() === " Login") {
            return "glyphicon glyphicon-log-in";
        } else {
            return "glyphicon glyphicon-off";
        }
    });*/
}

 function requestLogin() {
     var user = $("#usr_log").val();
     var pwd = $("#pwd_log").val();
     alert("alert 1");

     httpRequest = new XMLHttpRequest();
    // httpRequest.open("GET", "http://fenw.etsisi.upm.es/login?userid=" + user + "&password=" + pwd, true);
     httpRequest.open("GET", "http://salonso.etsisi.upm.es/fenw/padel/login.php?userid=" + user + "&password=" + pwd, true);
     httpRequest.responseType = "json";
     httpRequest.onload = login;
     httpRequest.send();
}     

 function login() {
    alert("alert 2");
    var response = httpRequest.response;
    if (response==="wrong user or password"){
        alert("El usuario o contraseña introducidos no existen. Intentelo de nuevo.");
    } else {
        autenticado(response);
        /*sessionStorage.setItem("token", response);
        $("#reserva").text("re2");
        var texto = sessionStorage.getItem("token");
        alert("session" + texto);*/
    }

   
   /* if (httpRequest.status === 200){
        var cabecera = httpRequest.getResponseHeader("Authorization");
        var token = cabecera.split(" ")[1];
        autenticado(token);
   } else if (httpRequest.status ===401){
        alert('Usuario o contraseña incorrecta.');
   } else{
       alert('Error.');
   }   */   
}

function autenticado(token){
    alert("Token" + token);
    sessionStorage.setItem("token", token);    
    $("#modalLogin").modal("hide");
    init();
}


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    $("#drag1").css("width","20%");
    $("#drag1").css("height","100%");
    arrastrado = true;
}