
function ocultar(){
    document.getElementById('menu').style.display = 'none';
    document.getElementById('container').style.display = 'none';
    document.getElementById('tabla').style.display = 'none';
    document.getElementById('ProgressBarr').style.display='none';
    document.getElementById('text').style.display= 'none';
}
function mostrar(){
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    var ClassName=document.getElementsByClassName("input")[0].value;
    document.getElementById('nombre').innerHTML='Bienvenido(a) ' + ClassName;
    document.getElementById('container').style.display = 'block';
    document.getElementById('prev').disabled = true;
    document.getElementById('tabla').style.display = 'block';
    document.getElementById('ProgressBarr').style.display='block';
    document.getElementById('text').style.display= 'block';
}

(function() 
 {
  var allQuestions = [{
    question: "El árbol que envía las raíces desde sus ramas hasta el suelo se conoce como:",
    options: ["Roble", "Pino", "Secretario", "Palma"],
    answer: 2
  }, {
    question: "El filamento de la bombilla eléctrica está hecho de:",
    options: ["Cobre", "Aluminio", "Plomo", "Tungsteno"],
    answer: 3
  }, {
    question: "El no metal que permanece líquido a temperatura ambiente es:",
    options: ["Fósforo", "Bromo", "Cloro","Helio"],
    answer: 1
  },{
    question: "¿Cuál de los siguientes materiales se utiliza en los lápices?",
    options: ["Grafito", "Silicio", "Carbon", "Fósforo"],
    answer: 0
  }, {
    question: "Fórmula quimica del agua: ",
    options: ["NaA1O2", "H2O", "Al2O3", "CaSiO3"],
    answer: 1
  },{
    question: "¿El gas que se llena en la bombilla eléctrica es?",
    options: ["Nitrogeno", "Hidrogeno", "Dioxido de carbono", "Oxigeno"],
    answer: 0
  },{
    question: "El nombre común para la soda de lavado es:",
    options: ["Carbonato de sodio", "Bicarbonato de calcio", "Bicarbonato de sodio", "Carbonato de calcio"],
    answer: 2
  },{
    question: "¿Qué gas no es conocido como gas de efecto invernadero?",
    options: ["Metano", "Oxido nitroso", "Dioxido de carbono", "Hidrogeno"],
    answer: 3
  },{
    question: "Que pais no pertenece a Asia: ",
    options: ["China", "Japón", "Singapur", "Australia"],
    answer: 3
    }];
  
  var quesCounter = 0; //contamos el # de preguntas
  var selectOptions = []; //opciones a sellecionae
  var quizSpace = $('#quiz'); //espacio donde se realizara el test

      
  nextQuestion(); //seguiente pregunta
    
  $('#next').click(function () 
    {
        chooseOption(); 
        if (isNaN(selectOptions[quesCounter]))  //IsNaN evalua si el argumento es un número "IsNaN(Valor a evaluar)"
        {
            alert('¡POR FAVOR SELECCIONA UNA OPCIÓN!');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
      quesCounter--;  
      chooseOption();
      nextQuestion();
    });
    
    $('#result').click(function () 
    {
      chooseOption();
      quesCounter++;
      document.getElementById('question').style.display='none';
      var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                    $('#result').hide(); 
    });

  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Pregunta ' + (index + 1) + ' de ' + allQuestions.length +'</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        var preg = document.getElementById(quesCounter*1);
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
        document.getElementById('contestadas').innerHTML='Preguntas realizadas: '+ (quesCounter+1);
        if(selectOptions[quesCounter] === allQuestions[quesCounter].answer)
        {
          preg.style.backgroundColor= 'green';
        }
        else
        {
          preg.style.backgroundColor= 'red';
        }
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                      $('#prev').removeAttr('disabled');
                      $('#result').hide();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').show();
                      $('#next').show();
                      $('#result').hide();
                    }
                    else if (quesCounter === 8) {
                      $('#next').hide();
                      $('#result').show();
                    }
                }
              /*else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }*/
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        var calificacion = 0;
        var minPreg = 6;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        calificacion = (5 / allQuestions.length) * correct;
        if(correct >= minPreg){
          var result = "¡APROBASTE!";
        }
        else{
          var result = "¡REPROBASTE!";
        }
        score.append('Tuviste ' + correct + ' respuesta(s) correcta(s) de ' +allQuestions.length + 
        '<br>'+ 'Tu calificación es '+ redondeo(calificacion) + '<br>' + result);
        return score;
  }
})();

function redondeo(numero) {
  var resultado = parseFloat(numero).toFixed(2);	
  return resultado;
}

var width = 10;
function progresBar() 
{
  var elem = document.getElementById("ProgressBar");
  if (width < 100) {
    width+=10;
    elem.style.width = width + '%';
    elem.innerHTML = width * 1 + '%';
  }
}

/*function Resultados()
{
  var score = $('<p>',{id: 'question'});
  var calificacion = 0;
  calificacion = (5 / allQuestions.length) * correct;
  score.append('Tu calificación es '+ calificacion );
}*/