$(document).ready(init);

function init(){
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
    
    if (sessionStorage.getItem("token")!=null){
        alert(sessionStorage.getItem("token"));
        $("#aLogin").text(" Logout");
        //$("#iconoLogin").removeClass("glyphicon glyphicon-log-in");
        //$("#buttonLogin").children("i").addClass("glyphicon glyphicon-off");
    }
    
    $('#aLogin').click(function(){
        $(this).find('i').toggleClass('glyphicon glyphicon-log-in').toggleClass('glyphicon glyphicon-off');
    }); 
    
    $("#accederLogin").click(requestLogin);

}


 function requestLogin() {
     var user = $("#usr_log").val();
     var pwd = $("#pwd_log").val();
     alert("alert 1");

     httpRequest = new XMLHttpRequest();
     httpRequest.open("GET", "http://fenw.etsisi.upm.es/login?userid=" + user + "&password=" + pwd, true);
    // httpRequest.open("GET", "http://salonso.etsisi.upm.es/fenw/padel/login.php?userid=" + user + "&password=" + pwd, true);
     httpRequest.responseType = "json";
     httpRequest.onload = login;
     httpRequest.send();
}     

 function login() {
    alert("alert 2");
    /*var cabecera = httpRequest.response;
    alert(cabecera);
    localStorage.setItem("token", cabecera);
    $("#reserva").text("re2");
    alert($("#reserva").text());
    var texto = localStorage.getItem("token");
    alert(texto);*/
    if (httpRequest.status === 200){
        var cabecera = httpRequest.getResponseHeader("Authorization");
        var token = cabecera.split(" ")[1];
        autenticado(token);
   } else if (httpRequest.status ===401){
        alert('Usuario o contraseña incorrecta.');
   } else{
       alert('Error.');
   }      
}

function autenticado(token){
    alert(token);
    sessionStorage.setItem("token", token);    
    $("#modalLogin").modal("hide");
    init();

   // var texto = localStorage.getItem("token");
}