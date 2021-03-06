// ==UserScript==
// @name       Antagning Filter
// @version    1.2
// @author     Mogle
// @namespace  https://github.com/MeeperMogle
// @match      https://www.antagning.se/*/search?*
// @match      https://www.universityadmissions.se/*/search?*
// @include    https://www.antagning.se/*/search?*
// @include    https://www.universityadmissions.se/*/search?*
// @require    http://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==

settings = localStorage.getItem('antagningLocalStored');

if(!settings){
    settings = {
        "notHave": ["Kingdom Rule I", "Kingdom Rule II"],
        "notWant": ["Slacker Course", "Slackerer Course"]
    };   
    localStorage.setItem('antagningLocalStored', JSON.stringify(settings));
}
else{settings = JSON.parse(settings);}

function obehorig(){
    $('.coursedetails').each(function(){
        var text = $(this).html();

        $(this).parent().parent().parent().children('.namearea').children('h3').css('color','black');
        $(this).html($(this).html().replace(/(<font color="red">|<\/font>)/g,""));

        if(text.indexOf("kunskapskrav") > -1){
            for(i=0; i<settings.notHave.length; i++){
                if(settings.notHave[i] != "" && text.toLowerCase().indexOf(settings.notHave[i].toLowerCase()) > -1){
                    $(this).parent().parent().parent().children('.namearea').children('h3').css('color','red');
                    $(this).html($(this).html().replace(settings.notHave[i], "<font color=red>" + settings.notHave[i] + "</font>"));
                }
            }
        }
    });
    $('.moreinfodialog').each(function(){
        if($(this).html().indexOf("kunskapskrav") == -1 || $(this).html().indexOf("Tidigare högskolestudier") != -1 ){
            $(this).parent().parent().children('.namearea').children('h3').css('color','blue');
        }
    });
}
obehorig();

function ointressantFilterer(){
    $('#searchResult li:not(.manuallyHidden)').show();

    $('.moreinfodialog').each(function(){
        for(i=0; i<settings.notWant.length; i++){
            if(settings.notWant[i] != "" && $(this).parent().parent().children('.namearea').children('h3').html().toLowerCase().
               indexOf(settings.notWant[i].toLowerCase()) > -1){
                $(this).parent().parent().parent().hide();
                break;
            }
        }
    });
}
ointressantFilterer();

// Language stuff
// ----------------------------------------------------------------
// Save the language in a variable.
// Used in multilingual support.
var lang = window.location.pathname;
lang = lang.substring(1, lang.lastIndexOf("/"));

// Period
var period = new Object();
period["se"] = "Period";
period["intl"] = "Period";

// Dölj andra perioder
var doljAndraPerioder = new Object();
doljAndraPerioder["se"] = "Dölj andra Perioder";
doljAndraPerioder["intl"] = "Hide other Periods";

// Studietakt
var studietakt = new Object();
studietakt["se"] = "Studietakt";
studietakt["intl"] = "Pace";

// Flexibel
var flexibel = new Object();
flexibel["se"] = "Flexibel";
flexibel["intl"] = "Flexible";

// Dölj ej kryssade Studietakter
var doljEjKryssadeStudietakter = new Object();
doljEjKryssadeStudietakter["se"] = "Göm okryssade Studietakter";
doljEjKryssadeStudietakter["intl"] = "Hide unchecked Paces";

// Nivåer
var nivaer = new Object();
nivaer["se"] = "Nivåer";
nivaer["intl"] = "Levels";

// Nivå
var niva = new Object();
nivaer["se"] = "Nivå";
nivaer["intl"] = "Level";

// Saknar
var saknar = new Object();
saknar["se"] = "Saknar";
saknar["intl"] = "Missing";

// Saknar
var ointressant = new Object();
ointressant["se"] = "Ointressant";
ointressant["intl"] = "Uninteresting";

// Förutbildning
var forutbildning = new Object();
forutbildning["se"] = "Förutbildning";
forutbildning["intl"] = "Preparatory";

// Grundnivå
var grundniva = new Object();
grundniva["se"] = "Grundnivå";
grundniva["intl"] = "Bachelor";

// Avancerad
var avancerad = new Object();
avancerad["se"] = "Avancerad";
avancerad["intl"] = "Master";

// Dölj ej kryssade Nivåer
var doljEjKryssadeNivaer = new Object();
doljEjKryssadeNivaer["se"] = "Dölj okryssade Nivåer";
doljEjKryssadeNivaer["intl"] = "Hide unchecked Levels";

// Filtrera saknade
var filtreradeSaknade = new Object();
filtreradeSaknade["se"] = "Filtrera saknade";
filtreradeSaknade["intl"] = "Filter missing";

// Filtrera saknade
var filtreradeOintressanta = new Object();
filtreradeOintressanta["se"] = "Filtrera ointressanta";
filtreradeOintressanta["intl"] = "Filter uninteresting";



// Helfart
var helfart = new Object();
helfart["se"] = "Helfart";
helfart["intl"] = "Full-time";

// Trekvartsfart
var trekvartsfart = new Object();
trekvartsfart["se"] = "Trekvartsfart";
trekvartsfart["intl"] = "Three-quarter-time";

// Halvfart
var halvfart = new Object();
halvfart["se"] = "Halvfart";
halvfart["intl"] = "Half-time";

// Kvartsfart
var kvartsfart = new Object();
kvartsfart["se"] = "Kvartsfart";
kvartsfart["intl"] = "One-quarter-time";

// Pace of study
var studietaktSelector = new Object();
studietaktSelector["se"] = "Studietakt";
studietaktSelector["intl"] = "Pace of study";

// Nivå selector
var nivaSelector = new Object();
nivaSelector["se"] = "Nivå";
nivaSelector["intl"] = "Level:";

// Förutbildning-selector
var forutbildningSelector = new Object();
forutbildningSelector["se"] = "Förutbildning";
forutbildningSelector["intl"] = "Prep./Access";

// Grundnivå-selector
var grundnivaSelector = new Object();
grundnivaSelector["se"] = "Grundnivå";
grundnivaSelector["intl"] = "First Cycle";

// Avancerad-selector
var avanceradSelector = new Object();
avanceradSelector["se"] = "Avancerad";
avanceradSelector["intl"] = "Second Cycle";

// Help
var periodHelp = new Object();
var studietaktHelp = new Object();
var nivaerHelp = new Object();
var saknarHelp = new Object();
var ointressantHelp = new Object();

// Period
periodHelp["se"] = "Under terminerna gör kurser ofta i två perioder, 1 och 2.\n"
    + "Välj den Period du är intresserad av att se kurser för och tryck på knappen.\n"
    + "De som inte är i den perioden filtreras ut!\n"
    + "\nTips: Tryck på Visa fler tills alla resultat visas, så att du bara behöver köra filtret 1 gång.";

periodHelp["intl"] = "During semesters courses start in two periods, 1 and 2.\n"
    + "Choose the Period you're interested in seeing the courses for, press the button.\n"
    + "The courses not in that period will be filtered out!\n"
    + "\nTip: Click Show more until all results are shown, that way you only have to apply the filter 1 time.";

// Studietakt (Pace)
studietaktHelp["se"] = "Välj bort de studietakter du inte är intresserad av.\n"
    + "\nNotera: För ovanliga studietakter, t.ex 37%, ligger de i det UNDRE alternativet.\n"
    + "\nExempel:\n45% ligger mellan 25%=>50% - 45% är under kategorin 25%";

studietaktHelp["intl"] = "Uncheck the paces you are not interested in.\n"
    + "\nNote: For unusual paces, suck as 37%, they are in the LOWER alternative.\n"
    + "\nExample:\n45% is between 25%=>50% - 45% is in the 25% category.";

// Nivåer (Levels)
nivaerHelp["se"] = "Välj bort de utbildningsnivåer du inte är intresserad av.";

nivaerHelp["intl"] = "Uncheck the education levels you are not interested in.";

// Saknar (Missing)
saknarHelp["se"] = "Ange nyckelord på Förkunskaper du inte har, t.ex Tyska steg 3.\nEn per rad. Dessa rödmarkeras."
    + "\n\nNotera: Blåmarkerad saknar Förkunskaper-sektion.";

saknarHelp["intl"] = "Enter keywords of Prerequisites you do not have, like Spanish\nOne per line. They'll turn red."
    + "\n\nNote: Blue means it lacks Prerequisites-section.";

// Ointressant (Uninteresting)
ointressantHelp["se"] = "Ange nyckelord på Namn på utbildningar du inte är intresserad av. En per rad."
    + "\nDessa kommer att döljas från resultatet.";

ointressantHelp["intl"] = "Enter keywords of Names of educations you are not interested in. One per line."
    + "\nThese will be hidden in the results.";


// Reset
var resetSubmitText = new Object();
resetSubmitText["se"] = "Återställ filter";
resetSubmitText["intl"] = "Reset filter";

// ----------------------------------------------------------------
// Language Stuff End





var listOfMissing = "";
var listOfUnwanted = "";

var usedNotHaveArray = settings.notHave.sort();
for(var i=0; i<usedNotHaveArray.length; i++) {
    listOfMissing += usedNotHaveArray[i];

    if( (i+1) < (usedNotHaveArray.length ) )
        listOfMissing += "\n";
}

var usedNotWantArray = settings.notWant.sort();
for(var i=0; i<usedNotWantArray.length; i++) {
    listOfUnwanted += usedNotWantArray[i];

    if( (i+1) < (usedNotWantArray.length ) )
        listOfUnwanted += "\n";
}




// Control HTML Start
// ----------------------------------------------------------------

// Complete HTML for all the controls is defined in this variable.
var myFilterHtml = "<div id=cleaner><style>#mylist h3{font-size:15px; font-weight:bold; color:blue; text-decoration:underline;}</style>"

// Period
+ "<h3><a href=#myList id=periodToggle>"+period[lang]+"</a> <a href='javascript:return;' id=periodHelp>?</a></h3>"
+ "<table border=0 cellpadding=10 cellspacing=0 id=periodTable>"
+ "<tr><td><center>"+period[lang]+" </td>"
+ "<td><center><select id=period><option value=1>1</option><option value=2 selected>2</option></select></td>"
+ "</tr>"
+ "<tr><td colspan=2><center><input type=submit id=rensaperiodnu value='"+doljAndraPerioder[lang]+"'></td></tr>"
+ "</table>"
// !Period

+ "<br>"

// Studietakt (Pace)
+ "<h3><a href='javascript:return;' id=studietaktToggle>"+studietakt[lang]+"</a> <a href='javascript:return;' id=studietaktHelp>?</a></h3>"
+ "<table border=0 cellpadding=10 cellspacing=0 id=studietaktTable>"
+ "<tr><td width=20%><center>100%</td><td width=20%><center>75%</td><td width=20%><center>50%</td><td width=20%><center>25%</td>"+
    "<td width=20%><center>"+ flexibel[lang]+"</td></tr>"
+ "<tr>"
+ "<td><center><input type=checkbox value=Helfart id=Helfart checked></td>"
+ "<td><center><input type=checkbox value=Trekvartsfart id=Trekvartsfart checked></td>"
+ "<td><center><input type=checkbox value=Halvtid id=Halvfart checked></td>"
+ "<td><center><input type=checkbox value=Kvartsfart id=Kvartsfart checked></td>"
+ "<td><center><input type=checkbox value=Flexibel id=Flexibel checked></td>"
+ "</tr>"
+ "<tr><td colspan=5><center><input type=submit id=rensastudietaktnu value='"+doljEjKryssadeStudietakter[lang]+"'></tr>"
+ "</table>"
// !Studietakt (Pace)

+ "<br>"

// Nivåer (Levels)
+ "<h3><a href='javascript:return;' id=nivaerToggle>"+nivaer[lang]+"</a> <a href='javascript:return;' id=nivaerHelp>?</a></h3>"
+ "<table border=0 cellpadding=10 cellspacing=0 id=nivaerTable>"
+ "<tr><td width=33%><center>"+ forutbildning[lang]+"</td><td width=33%><center>"+ grundniva[lang]+"</td><td width=33%><center>"+ 
    avancerad[lang]+"</td></tr>"
+ "<tr>"
+ "<td><center><input type=checkbox value=Forutbildning id=Forutbildning checked></td>"
+ "<td><center><input type=checkbox value=Grundniva id=Grundniva checked></td>"
+ "<td><center><input type=checkbox value=Avancerad id=Avancerad checked></td>"
+ "</tr>"
+ "<tr><td colspan=3><center><input type=submit id=rensanivaernu value='"+doljEjKryssadeNivaer[lang]+"'></tr>"
+ "</table>"
// !Nivåer(Levels)

+ "<br>"

// Saknar (Missing)
+ "<h3><a href='javascript:return;' id=saknarToggle>"+saknar[lang]+"</a> <a href='javascript:return;' id=saknarHelp>?</a></h3>"
+ "<table border=0 cellpadding=10 cellspacing=0 id=saknarTable>"
+ "<tr><td><textarea cols=25 rows=5 id=Saknar>" + listOfMissing + "</textarea></td></tr>"
+ "<tr><td colspan=3><input type=submit id=filtreraSaknadeNu value='"+filtreradeSaknade[lang]+"'></tr>"
+ "</table>"
// !Saknar(Missing)

+ "<br>"

// Ointressant (Uninteresting)
+ "<h3><a href='javascript:return;' id=ointressantToggle>"+ointressant[lang]+"</a> <a href='javascript:return;' id=ointressantHelp>?</a>"+
    "</h3>"
+ "<table border=0 cellpadding=10 cellspacing=0 id=ointressantTable>"
+ "<tr><td><textarea cols=25 rows=5 id=Ointressant>" + listOfUnwanted + "</textarea></td></tr>"
+ "<tr><td colspan=3><input type=submit id=filtreraOintressantaNu value='"+filtreradeOintressanta[lang]+"'></tr>"
+ "</table>"
// !Ointressant(Uninteresting)

+ "<hr><center><input type=checkbox id=resetCheckbox> <input type=submit id=resetSubmit value='"+resetSubmitText[lang]+"'>"

+ "<br><input type=checkbox id=unhideManuallyHidden> Visa manuellt gömda"

+ "</div>";


// ----------------------------------------------------------------
// Controls HTML End



// Add our own controllers to the right-hand interactive box.
// This way it moves with you if you scroll down the page.
var myListDefaultHtml = $("#myList").html();
$("#myList").html( $("#myList").html()
                  + myFilterHtml
                 );

$('#nivaerTable,#studietaktTable,#periodTable,#saknarTable,#ointressantTable').hide();

function toggleTable(name){
    var table = $('#' + name + 'Table');

    if(table.css('display') == 'none')
        table.show();
    else
        table.hide();
}

var counter = 0;


// Move it up a bit to fit everything better
$("#myList").css("margin-top","-25px");



var defaultTotalNumberOfHits = $("#totalnumberofhits").html();


// Function for setting all .click() functions of buttons, to make things work.
// Needed its own function since the reset-function demands a re-definition of these .click()-functions.
function setClicks(){
    $('#nivaerToggle').click(function(){toggleTable("nivaer")});
    $('#studietaktToggle').click(function(){toggleTable("studietakt")});
    $('#periodToggle').click(function(){toggleTable("period")});
    $('#saknarToggle').click(function(){toggleTable("saknar")});
    $('#ointressantToggle').click(function(){toggleTable("ointressant")});

    $('#periodHelp').click( function(){alert(periodHelp[lang])} );
    $('#studietaktHelp').click( function(){alert(studietaktHelp[lang])} );
    $('#nivaerHelp').click( function(){alert(nivaerHelp[lang])} );
    $('#saknarHelp').click( function(){alert(saknarHelp[lang])} );
    $('#ointressantHelp').click( function(){alert(ointressantHelp[lang])} );

    $('#openAll').click(function(){
        $('.openmoreinfolink').eq(0).each(function(){
            if(counter % 2 == 0)
                $('.closemoreinfolink').click();
            else
                $('.openmoreinfolink').click();

            counter++;
        });

    });

    $('#resetSubmit').click(function(){
        if($('#resetCheckbox:checked').val()){
            resetPostFilter();
        }
    });

    $('#filtreraSaknadeNu').click(function(){
        settings.notHave = $('#Saknar').val().split("\n");
        localStorage.setItem('antagningLocalStored', JSON.stringify(settings));
        obehorig();
    });

    $('#filtreraOintressantaNu').click(function(){
        settings.notWant = $('#Ointressant').val().split("\n");
        settings.notWant.sort();
        localStorage.setItem('antagningLocalStored', JSON.stringify(settings));
        ointressantFilterer();
    });


    // When buttons are pressed, appropiate function is activated
    $("#rensaperiodnu").click( rensaPeriod );

    // When Show More is clicked, there might be new things in the list that wasn't cleaned out.
    // Therefore, activate the button again.
    $("a#showmore").click(
        function(){
            document.getElementById('rensaperiodnu').disabled = '';
        });

    // Pace Start
    //-----------------------------------------------------------------------------
    $('#rensastudietaktnu').click(function(){
        // Number of currently shown hits before cleaning
        var before = parseInt( $("#searchResult").children("li[style!='display: none;']").length );

        // Hide unchecked ones
        // This indicates which ones are hidden
        if( !$('#Helfart:checked').val() ){
            hideStudieTakt(helfart[lang], "100");
            $('#Helfart').hide();
        }
        if( !$('#Trekvartsfart:checked').val() ){
            hideStudieTakt(trekvartsfart[lang], 75);
            $('#Trekvartsfart').hide();
        }
        if( !$('#Halvfart:checked').val() ){
            hideStudieTakt(halvfart[lang], 50);
            $('#Halvfart').hide();
        }
        if( !$('#Kvartsfart:checked').val() ){
            hideStudieTakt(kvartsfart[lang], 25);
            $('#Kvartsfart').hide();
        }
        if( !$('#Flexibel:checked').val() ){
            hideStudieTakt(flexibel[lang], 0);
            $('#Flexibel').hide();
        }

        // Count the remaining courses shown in the list,
        // and how many was thus removed.
        // Subtract this from the text stating "A total of X courses match this criteria".
        var after = parseInt( $("#searchResult").children("li[style!='display: none;']").length );
        var taBort = (before-after);
        var total = parseInt( $("#totalnumberofhits").html().replace("&nbsp;","") ) - taBort;

        // Update the "Now showing X courses"
        // and "A total of X courses match this criteria" texts.
        $("#totalnumberofhits").html("" + total);
        $(".searchhitinfo").children('span').eq(0).html("" + total);
        $("#numberofhits").html("" + after);
    });

    // Hide pace of study based on the word (ord) or number% (siffra)
    // Loops the <li>s, checks if it's a number or word and if that number or word should be hidden
    function hideStudieTakt(ord, siffra){
        $('.coursebasics').each(function(){
            var studietakt = $(this).children("div.coursecolumn").eq(1).children("div.coursecolumncontent").eq(0).
            children("p:contains('"+studietaktSelector[lang]+"')").html();
            studietakt = studietakt.substr(studietakt.indexOf("</label>")+8);

            // Check if it is in %, e.g a number
            if(studietakt.indexOf("%") >= 0)
            {
                // Take away the % and parse to a number
                studietakt = parseInt(studietakt.replace("%",""));

                // If it is in this %-class, e.g 50-74% for "Half-time", hide it
                if( (studietakt > siffra && studietakt < (siffra+25)) ){
                    $(this).parent().parent().parent().parent().hide();
                }
            }
            else if(studietakt.indexOf(ord) >= 0)
            {
                $(this).parent().parent().parent().parent().hide();
            }
        });
    }
    //-----------------------------------------------------------------------------
    // Pace End


    // Level Start
    //-----------------------------------------------------------------------------
    $("#rensanivaernu").click(function(){
        // Number of currently shown hits before cleaning
        var before = parseInt( $("#searchResult").children("li[style!='display: none;']").length );

        // Hide the unckecked boxes to indicate what Levels are hidden
        if( !$('#Forutbildning:checked').val() ){
            hideLevels(forutbildningSelector[lang]);
            $('#Forutbildning').hide();
        }
        if( !$('#Grundniva:checked').val() ){
            hideLevels(grundnivaSelector[lang]);
            $('#Grundniva').hide();
        }
        if( !$('#Avancerad:checked').val() ){
            hideLevels(avanceradSelector[lang]);
            $('#Avancerad').hide();
        }    

        // Count the remaining courses shown in the list,
        // and how many was thus removed.
        // Subtract this from the text stating "A total of X courses match this criteria".
        var after = parseInt( $("#searchResult").children("li[style!='display: none;']").length );
        var taBort = (before-after);
        var total = parseInt( $("#totalnumberofhits").html().replace("&nbsp;","") ) - taBort;

        // Update the "Now showing X courses"
        // and "A total of X courses match this criteria" texts.
        $("#totalnumberofhits").html("" + total);
        $(".searchhitinfo").children('span').eq(0).html("" + total);
        $("#numberofhits").html("" + after);
    });

    // Finds the <li>s where Pace is "ord", and hides them.
    function hideLevels(ord){
        $('.coursebasics').each(function(){
            var level = $(this).children("div.coursecolumn").eq(0).children("div.coursecolumncontent").eq(0).
            children("p:contains('"+nivaSelector[lang]+"')").html();
            level = level.substr(level.indexOf("</label>")+8);

            if(level.toLowerCase().indexOf(ord.toLowerCase()) >= 0)
            {
                $(this).parent().parent().parent().parent().hide();
            }
        });
    }
    //-----------------------------------------------------------------------------
    // Level End


    // Antagning updates the counter upon Show More-click, according to how many it THINKS are showing...
    // We wait 1 second, then correct this.
    $('#showmore').click(function(){
        setTimeout(function() {
            $('#numberofhits').html( $("#searchResult").children("li[style!='display: none;']").length );
        }, 1000);
    });


    // Make sure the Continue To Application-button works; the script must've messed with it...
    // NOTE: Deprecated!
    //$("#continuetoapplication").click(function(){
    //    top.location="mypages/applications/merge";
    //});
}



// Period Start
//-----------------------------------------------------------------------------
//
// Function for cleaning all but requested Period
function rensaPeriod()
{
    // Number of currently shown hits before cleaning
    var before = parseInt( $("#searchResult").children("li[style!='display: none;']").length );

    // Clean all course that was not the selected "Clean"-Period
    if( $("#period").val() == "1" )
        $('li:contains("Period 2")').hide();
    else if( $("#period").val() == "2" )
        $('li:contains("Period 1")').hide();

    // Disable the selector and go-button;
    // no need to press them when the cleaning is done.
    document.getElementById('rensaperiodnu').disabled = 'disabled';
    document.getElementById('period').disabled = 'disabled';

    // Count the remaining courses shown in the list,
    // and how many was thus removed.
    // Subtract this from the text stating "A total of X courses match this criteria".
    var after = parseInt( $("#searchResult").children("li[style!='display: none;']").length );
    var taBort = (before-after);
    var total = parseInt( $("#totalnumberofhits").html().replace("&nbsp;","") ) - taBort;

    // Update the "Now showing X courses"
    // and "A total of X courses match this criteria" texts.
    $("#totalnumberofhits").html("" + total);
    $(".searchhitinfo").children('span').eq(0).html("" + total);
    $("#numberofhits").html("" + after);
}
//-----------------------------------------------------------------------------
// Period End



// Reset Start
//-----------------------------------------------------------------------------
function resetPostFilter(){
    $("li[style='display: none;']:not(.manuallyHidden)").show();// Show all hidden courses
    var selectedCoursesHtml = $('ul.selectedcourses').html();	// Get the HTML of the courses we have Selected
    $("#myList").html(myListDefaultHtml + myFilterHtml);		// Reset the HTML of the Selected-box & filter-controllers...
    $('ul.selectedcourses').html(selectedCoursesHtml);			// ... and insert our selectedCoursesHtml again.
    setClicks();												// Reinstate the .click()-functions for our controllers

    // Reset the Result-counters
    $("#totalnumberofhits").html( defaultTotalNumberOfHits );
    $(".searchhitinfo").children('span').eq(0).html(defaultTotalNumberOfHits);
    $("#numberofhits").html("" + $("#searchResult").children("li[style!='display: none;']").length);
}
//-----------------------------------------------------------------------------
// Reset End

var tillAnmalanURL = 'https://www.antagning.se/se/mypages/applications/merge';
$('#continuetoapplication').html( '<a href="' + tillAnmalanURL + '" style="color:white;">' + $('#continuetoapplication').html() + '</a>' );

$('#showmore').parent().append('<a id="showall" class="showmore" rel="nofollow" href=""><span>Visa alla</span></a>');


var active = true;

$('#showall').click(function(){
    active = false;
    if( $('#showmore').not(':hidden') ){
        setInterval( function(){ 
            if( $('#showmore').is(':hidden') && $('#showall').css("display") != "none" ){
                $('#showall').hide();
                obehorig();
                ointressantFilterer();
                setTimeout(addManualHiders,1000);
                active = true;
            }
            else if($('#showall').css("display") != "none"){
                document.getElementById('showmore').click();
            }
        }, 1500 );
    }
    return false;
});

manuallyHidden = localStorage.getItem('antagningManualLocalStored');

if(!manuallyHidden){
    manuallyHidden = new Array("abc");
    localStorage.setItem('antagningManualLocalStored', JSON.stringify(manuallyHidden));
}
else{manuallyHidden = JSON.parse(manuallyHidden);}

function addManualHiders(){
    // New feature: Manually hide individual courses, rather than based on their name
    $('li[id*=rowindex]').not(".hasManualHider").each(function(){
        var id = $(this).attr('id').replace(/rowindex_.T\d+-/i,"").toString();
        $(this).addClass("hasManualHider");

        if( $.inArray(id, manuallyHidden) == -1 ){
            $(this).prepend('<div class="manualHidingArea" id="hideManually_'+id+'">[ &nbsp;]</div>');
            $(this).removeClass('manuallyHidden');
        } else {
            $(this).prepend('<div class="manualHidingArea" id="hideManually_'+id+'">[X]</div>');
            $(this).addClass('manuallyHidden');
        }

        $('#hideManually_'+id).click(function(){
            if( $.inArray(id, manuallyHidden) == -1 ){
                $(this).html("[X]");
                manuallyHidden.push(id);
                $(this).parent().addClass('manuallyHidden');
            } else {
                $(this).html("[ &nbsp;]");

                for(var i=0; i<manuallyHidden.length; i++){
                    if(manuallyHidden[i] == id){
                        manuallyHidden.splice(i, 1);
                        break;
                    }
                }
                $(this).parent().removeClass('manuallyHidden');
            }
            localStorage.setItem('antagningManualLocalStored', JSON.stringify(manuallyHidden));
        });

    });

    if($('#meepCss').length <= 0){
        $('#searchResult').prepend("<style id=meepCss>.manuallyHidden{display:none;opacity:0.4;}</style>");
        $('#searchResult').prepend("<style>.manualHidingArea{position:absolute;margin:20px 0 0 -25px;}</style>");
    }

    $('#unhideManuallyHidden').click(function(){
        if( $(this).is(":checked") ){
            $('#meepCss').html(".manuallyHidden{display:block;}");
            $('.manuallyHidden').css('opacity','0.4');
        } else {
            $('#meepCss').html(".manuallyHidden{display:none;}");
            $('.manuallyHidden').css('opacity','1.0');
        }
    });
}
addManualHiders();



$('#showmore').click(function(){
    if(active){
        setTimeout(obehorig,1000);
        setTimeout(ointressant,1000);
        setTimeout(ointressantFilterer,1000);
        setTimeout(addManualHiders,1000);
    }
});


setClicks();


$('#footer').hide();
