// ==UserScript==
// @name       Antagning Filter
// @version    1.0.0
// @author     Mogle
// @namespace  https://github.com/MeeperMogle
// @match      https://www.antagning.se/*/search?*
// @match      https://www.universityadmissions.se/*/search?*
// @include    https://www.antagning.se/*/search?*
// @include    https://www.universityadmissions.se/*/search?*
// @require    http://code.jquery.com/jquery-1.9.1.js
// ==/UserScript==

// They added an annoying footer; let's turn that off shall we?
$("#footer").hide();

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

// Period
periodHelp["se"] = "Under terminerna går kurser ofta i två perioder, 1 och 2.\n"
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

// Reset
var resetSubmitText = new Object();
resetSubmitText["se"] = "Återställ filter";
resetSubmitText["intl"] = "Reset filter";

// ----------------------------------------------------------------
// Language Stuff End


// Control HTML Start
// ----------------------------------------------------------------
// Complete HTML for all the controls is defined in this variable.
var myFilterHtml = "<div id=cleaner>"

// Period
+ "<h3>"+period[lang]+" <a href='javascript:return;' id=periodHelp>?</a></h3>"
+ "<table border=0 cellpadding=10 cellspacing=0>"
+ "<tr><td><center>"+period[lang]+" </td>"
+ "<td><center><select id=period><option value=1>1</option><option value=2 selected>2</option></select></td>"
+ "</tr>"
+ "<tr><td colspan=2><center><input type=submit id=rensaperiodnu value='"+doljAndraPerioder[lang]+"'></td></tr>"
+ "</table>"
// !Period

+ "<br>"

// Studietakt (Pace)
+ "<h3>"+studietakt[lang]+" <a href='javascript:return;' id=studietaktHelp>?</a></h3>"
+ "<table border=0 cellpadding=10 cellspacing=0>"
+ "<tr><td width=20%><center>100%</td><td width=20%><center>75%</td><td width=20%><center>50%</td><td width=20%><center>25%</td><td width=20%><center>"+ flexibel[lang]+"</td></tr>"
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
+ "<h3>"+nivaer[lang]+" <a href='javascript:return;' id=nivaerHelp>?</a></h3>"
+ "<table border=0 cellpadding=10 cellspacing=0>"
+ "<tr><td width=33%><center>"+ forutbildning[lang]+"</td><td width=33%><center>"+ grundniva[lang]+"</td><td width=33%><center>"+ avancerad[lang]+"</td></tr>"
+ "<tr>"
+ "<td><center><input type=checkbox value=Forutbildning id=Forutbildning checked></td>"
+ "<td><center><input type=checkbox value=Grundniva id=Grundniva checked></td>"
+ "<td><center><input type=checkbox value=Avancerad id=Avancerad checked></td>"
+ "</tr>"
+ "<tr><td colspan=3><center><input type=submit id=rensanivaernu value='"+doljEjKryssadeNivaer[lang]+"'></tr>"
+ "</table>"
// !Nivåer(Levels)

+ "<hr><center><input type=checkbox id=resetCheckbox> <input type=submit id=resetSubmit value='"+resetSubmitText[lang]+"'>";

+ "</div>";
// ----------------------------------------------------------------
// Controls HTML End



// Add our own controllers to the right-hand interactive box.
// This way it moves with you if you scroll down the page.
var myListDefaultHtml = $("#myList").html();
$("#myList").html( $("#myList").html()
                  + myFilterHtml
                 );

// Move it up a bit to fit everything better
$("#myList").css("margin-top","-25px");

setClicks();

// Function for setting all .click() functions of buttons, to make things work.
// Needed its own function since the reset-function demands a re-definition of these .click()-functions.
function setClicks(){
    $('#periodHelp').click( function(){alert(periodHelp[lang])} );
    $('#studietaktHelp').click( function(){alert(studietaktHelp[lang])} );
    $('#nivaerHelp').click( function(){alert(nivaerHelp[lang])} );
    
    $('#resetSubmit').click(function(){
        if($('#resetCheckbox:checked').val()){
            resetPostFilter();
        }
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
            var studietakt = $(this).children("div.coursecolumn").eq(1).children("div.coursecolumncontent").eq(0).children("p:contains('"+studietaktSelector[lang]+"')").html();
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
            var level = $(this).children("div.coursecolumn").eq(0).children("div.coursecolumncontent").eq(0).children("p:contains('"+nivaSelector[lang]+"')").html();
            level = level.substr(level.indexOf("</label>")+8);
            
            if(level.indexOf(ord) >= 0)
            {
                $(this).parent().parent().parent().parent().hide();
            }
        });
    }
    //-----------------------------------------------------------------------------
    // Level End
    
    
    // Make sure the Continue To Application-button works; the script must've messed with it...
    $("#continuetoapplication").click(function(){
        window.location="mypages/applications/merge";
    });
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
    $("li[style='display: none;']").show(); 					// Show all hidden courses
    var selectedCoursesHtml = $('ul.selectedcourses').html();	// Get the HTML of the courses we have Selected
    $("#myList").html(myListDefaultHtml + myFilterHtml);		// Reset the HTML of the Selected-box & filter-controllers...
    $('ul.selectedcourses').html(selectedCoursesHtml);			// ... and insert our selectedCoursesHtml again.
    setClicks();												// Reinstate the .click()-functions for our controllers
}
//-----------------------------------------------------------------------------
// Reset End