
//Notað til að sækja css
$("h1").css("color");

//Notað til að breyta css
$("h1").css("color", "red");

//Notað til að bæta við class
$("h1").addClass("big-title");

//Notað til að fjarlægja class
$("h1").removeClass("big-title");

//notað til að breyta texta
$("h1").text("Bye");

//Notað til að breyta innerHTML
$("button").html("<em>wow</em>");

//Notað til að sækja attribute
$("img").attr("src");

//Notað til að breyta attribute
$("a").attr("href", "https://google.com");

//Notað til að setja click event listener
$("button").click(function(){
    $("h1").css("color", "purple");
})

//Notað til að setja keypress event listener
$(document).keypress(function(event){
    $("h1").text(event.key);
});

//Notað fyrir öll event listeners
$("h1").on("mouseover", function(){
    $("h1").css("color", "green");
})

//Notað til að búa til element fyrir annað element
$("h1").before("<button>New1</button>")

//Notað til að búa til element eftir annað element
$("h1").after("<button>New2</button>")

//Notað til að búa til element innan annað element á eftir rest
$("h1").append("<button>New3</button>")

//Notað til að búa til element innan annað element á undan rest
$("h1").prepend("<button>New4</button>")

//Notað til að fjarlægja elements
$("h1 button").remove()

//Mismunandi pre-built animations
$("button").on("click", function(){
    //$("h1").hide(); //Notað til að fela element
    //$("h1").show(); //Notað til að sýna element
    //$("h1").toggle(); //Notað til að fela/sýna element
    //$("h1").fadeOut(); //Notað til að fade-a element út
    //$("h1").fadeIn(); //Notað til að fade-a element inn
    //$("h1").fadeToggle(); //Notað til að fade-a element inn/út
    //$("h1").slideUp(); //Notað til að fela element með slide
    //$("h1").slideDown(); //Notað til að sýna element með slide
    $("h1").slideToggle(); //Notað til að sýna/fela element með slide
})

//Notað fyrir custom animation
$("h1").on("click", function(){
    $("h1").slideUp().slideDown().animate({opacity: 0.5})
});