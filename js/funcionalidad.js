$(document).ready(init);

var arrastrado = false; 

function init(){
    
    alert("Toooook init " + sessionStorage.getItem("token"));

    if (sessionStorage.getItem("token")!=null){
        $("#aLogin").text("");
        var iconoLogout = document.createElement("span");
        iconoLogout.setAttribute("class","glyphicon glyphicon-off" );
        $("#aLogin").append(iconoLogout);
        $("#aLogin").append(" Logout");
        
        $("#aRegistro").text("");
        var iconoRegistro = document.createElement("span");
        iconoRegistro.setAttribute("class","glyphicon glyphicon-user" );
        $("#aRegistro").append(iconoRegistro);
        $("#aRegistro").append(" Mi Perfil");
    } else {
        $("#aLogin").text("");
        var iconoLogin = document.createElement("span");
        iconoLogin.setAttribute("class","glyphicon glyphicon-log-in" );
        $("#aLogin").append(iconoLogin);
        $("#aLogin").append(" Login");
        
        $("#aRegistro").text("");
        var iconoRegistro = document.createElement("span");
        iconoRegistro.setAttribute("class","glyphicon glyphicon-user" );
        $("#aRegistro").append(iconoRegistro);
        $("#aRegistro").append(" Registro");
    }
    
    $("#aReservas").click(function(){
        alert("Función no implementada.");
    });
 
    $("#aRegistro").click(function(){
        $("#modalRegistro").modal("show");
     });
    
    $("#aLogin").click(function(){
        if($("#aLogin").text() === " Login"){
            $("#modalLogin").modal("show");
        } else {
            sessionStorage.removeItem("token");
            init();
        }
    });
    
    $("#nuevo_usuario").click(function(){
         $("#modalLogin").modal("hide");
         $("#modalRegistro").modal("show");
    })
    
    $("#accederLogin").click(function(){
        if ($("#usr_log").val()==="" || $("#pwd_log").val()===""){
            alert("Rellene los campos.");
        } else if (arrastrado != true){
            alert("Arrastre la imagen al cuadrado para completar el proceso.")
        }else {
            requestLogin();
        }
    });
}
   
 function requestLogin() {
     var user = $("#usr_log").val();
     var pwd = $("#pwd_log").val();

     //alert("alert 1");
     setTimeOut(8000);


     httpRequest = new XMLHttpRequest();
    // httpRequest.open("GET", "http://fenw.etsisi.upm.es/login?userid=" + user + "&password=" + pwd, true);
     httpRequest.open("GET", "http://salonso.etsisi.upm.es/fenw/padel/login.php?userid=" + user + "&password=" + pwd, true);
     httpRequest.responseType = "json";
     httpRequest.onload = login;
     httpRequest.send();
     
   /*  $.ajax({
         url: "http://salonso.etsisi.upm.es/fenw/padel/login.php",
         data: "userid="+user+"&password"+pwd,
         type: "GET",
         success: login,
         error: function(){
             alert("Errooooooor");
             alert(url);
         },
         
     })*/
     
     
}   

function wait(){
    alert("wait");
}

function login() {
   // alert("alert 2");
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