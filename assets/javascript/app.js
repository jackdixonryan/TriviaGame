$(document).ready(function() { 

    //Defining correct answers in a separate array independent from the objects array.
    var correctAnswers = ["Electron", "Neutrino", "Einstein", "The exact position of an electron", "Bounce", "Flavourdynamics"];

    //User answers--initialized empty
    var userAnswers = [];

    //Right and wrong answer counters... will increment
    var right = 0;
    var wrong = 0;

    //Sets the time to forty seconds.
    var time = 40;


   //An array of objects populated by questions, answers, and solutions.
    var questions = [
        {
            question: "Which of these is a particle?",
            answers: ["Magnets", "Electron", "Carbon", "Atom"],
            solution: "Electron"
        },
        {
            question: "What is the smallest of these particles?",
            answers: ["Neutron", "Lepton", "Photon", "Neutrino"],
            solution: "Neutrino"
        },
        {
            question: "Who proposed that no observer in the universe can ever correctly claim to be at rest?",
            answers: ["Schroedinger", "Einstein", "Fermi", "Heisenberg"],
            solution: "Einstein"
        },
        {
            question: "What does Heisenberg's Uncertainty Principle propose cannot ever be observed?",
            answers: ["The Higgs-Boson", "Gravitons", "The exact position of an electron", "Fermion Orbital States"],
            solution: "The exact position of an electron"
        },
        {
            question: "Which of these is not a flavour quality of quarks?",
            answers: ["Strangeness", "Charm", "Topness", "Bounce"],
            solution: "Bounce"
        },
        {
            question: "The study of the weak interaction in particle physics is called Quantum:", 
            answers: ["Flavourdynamics", "Chromodynamics", "Electrodynamics"],
            solution: "Flavourdynamics"
        }
    ]

    //Timer function
    function timer() {
        //Hides the 'start' button;
        $(".btn-primary").hide();
        //Defined empty
        var interval;

        //Creates and appends the countdown timer to the DOM
        var clock = $("<h3>")
        $(clock).text(time);
        $(".jumbotron").append(clock);

        //Starts the actual timer movement.
        interval = setInterval(function() {
            time--;
            $(clock).text(time);
            //if time has run out...
            if (time === 0) {

                //The interval clears and the end game message displays
                clearInterval(interval);
                $(clock).text("You are out of time!")

                

                //The userAnswers array is populated with the values of the radio inputs selected on the DOM at the conclusion of the timer.
                $(".radio").each(function() {
                    if ($(this).prop("checked")) {
                        userAnswers.push($(this).attr("id"));
                    }
                });

                //Compares the user answers against the solutions array.
                    for (var i = 0; i < userAnswers.length; i++) {
                        if (userAnswers[i] === correctAnswers[i]) {
                            right++;
                        } else if (userAnswers[i] !== correctAnswers[i]) {
                            wrong++;
                        }
                    }
               
                //Replaces the 'play' button with a replay button that effectively does the same thing but also serves as a reset button for some variables.
                 replay = $("<button>");
                 $(replay).attr("class", "btn btn-primary");
                 $(replay).text("Try Again");
                 $(".jumbotron").append(replay);

                 $(replay).click(function() {
                    userAnswers = [];
                    right = 0;
                    wrong = 0;
                    time = 40;
                    $(".container").text("");
                    $(clock).text("");
                    questionGenerator();
                    timer();
                 });

                //Replaces the question form with the wins/losses information.
                $(".container").html("<h2>Correct Answers: " + right + "</h2><h2>Wrong Answers: " + wrong);
            }
        }, 1000);
    }

    //Generates the questions.
    function questionGenerator() {

        //Iterating through the questions array...
        for (var j = 0; j < questions.length; j++) {
            
            var form = $("<form>");
            form.addClass("form");
            $(form).html("<p>" + questions[j].question + "</p>");
            //creating elements
            //for each answer
            for (var i = 0; i < questions[j].answers.length; i++) {

                //add an input
                var input = $("<input>");

                //set input to a radio type.
                $(input).attr("type", "radio");

                //Setting the id to match with the label
                $(input).attr("id", questions[j].answers[i]);
                $(input).addClass("radio");

                //renders only one of the radio buttons selectable at any point.
                $(input).attr("name", "option");



                //Adds a class of correct to the appropriate questions.
                if ($(input).attr("Id") === questions[j].solution) {
                    $(input).addClass("correct");
                }

                //Making the label and matching it to the input.
                var label = $("<label>")
                $(label).text(questions[j].answers[i]);
                $(label).attr("for", questions[j].answers[i]);

                //appending all.
                $(form).append(input);
                $(form).append(label);
            }
            $(".container").append(form);
    }

}

    $(".btn-primary").click(function() {
        //Both the timer and the questionGenerator functions don't run until the start button is clicked (or the reset button). 
        questionGenerator();
        timer(); 
    });

});
