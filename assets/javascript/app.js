$(document).ready(function() { 

    //all these will increment 
    var turn = 0;
    var correctAnswers = 0;
    var wrongAnswers = 0;

    var timeLeft = true;
    var time = 10;

    //Objects, key/value pairs w/key = question and value = answer options..
    var questions = {
        q1: {
            question: "Which planet from the sun is Jupiter?",
            answers: ["5", "6", "4", "3"],
            solution: "5"
        },
        q2: {
            question: "What is the smallest of these particles?",
            answers: ["Neutron", "Lepton", "Photon", "Neutrino"],
            solution: "Neutrino"
        },
        q3: {
            question: "Who proposed that no observer in the universe can ever correctly claim to be at rest?",
            answers: ["Schroedinger", "Einstein", "Fermi", "Heisenberg"],
            solution: "Einstein"
        },
        q4: {
            question: "What does Heisenberg's Uncertainty Principle propose cannot ever be observed?",
            answers: ["The Higgs-Boson", "Gravitons", "The exact position of an electron", "Fermion Orbital States"],
            solution: "The exact position of an electron"
        }
    }

    function timer() {
        $(".btn-primary").hide();
        var interval;

        var clock = $("<h3>")
        $(clock).text(time);
        $(".jumbotron").append(clock);

        if (time < 0) {
            alert("You are out of time!")
            clearInterval(interval);
        }

        interval = setInterval(function() {
            time--;
            $(clock).text(time);
            if (time === 0) {
                clearInterval(interval);
                $(clock).text("You are out of time!")
            }
        }, 1000);
    }



    //PSEUDOCODE: How do we take this function, which generates the radio form for one hard-coded item/key pair, to generate a radio array for EACH question in the questions object?

    function questionGenerator(item) {

            var form = $("<form>");
            $(form).html("<p>" + item.question + "</p>");


            //creating elements
            console.log(item);
            console.log(item.answers);
            console.log(item.answers.length);
            //for each answer
            for (var i = 0; i < item.answers.length; i++) {

                //add an input
                var input = $("<input>");

                //set input to a radio type.
                $(input).attr("type", "radio");

                //Setting the id to match with the label
                $(input).attr("id", item.answers[i]);
                $(input).addClass("radio");

                //renders only one of the radio buttons selectable at any point.
                $(input).attr("name", "option");

                //Making the label and matching it to the input.
                var label = $("<label>")
                $(label).text(item.answers[i]);
                $(label).attr("for", item.answers[i]);

                //appending all.
                $(form).append(input);
                $(form).append(label);
            }
            $(".container").append(form);
    }

    $(".btn-primary").click(function() {
        //Running the timer and number generator
        
        questionGenerator(questions.q1);
        questionGenerator(questions.q2);
        questionGenerator(questions.q3);
        questionGenerator(questions.q4);

        timer();

        //userChoice initialized.
        var userChoice;

        //when a radio button is changed (only works within the scope of the btn-primary onclick, I believe because the radios only really exist within the scope of this function.)
        $('.radio').change(function() {
            //userChoice is set to the id of whichever radio button was last chosen.
            if (time > 0) {
                userChoice = this.id;
            } 

            //Here's where it becomes a problem: Evaluating. Coding it 10x repeated once is bad enough. Coding it ten times repeated again means that something is horribly wrong.
            if (userChoice === questions.q1.solution) {
                alert("You got it right!");
            } else {
                alert("That's the wrong answer.");
            }
        });
    });
});
