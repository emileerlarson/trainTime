  var config = {
    apiKey: "AIzaSyAJqT9pmGhub6zLMUyynAPFtlyOHOn_osg",
    authDomain: "train-b58a6.firebaseapp.com",
    databaseURL: "https://train-b58a6.firebaseio.com",
    projectId: "train-b58a6",
    storageBucket: "train-b58a6.appspot.com",
    messagingSenderId: "286777759809"
  };
  firebase.initializeApp(config);

    var database = firebase.database();

    // Initial Values

    var trainName = "";

    var destination = "";

    var firstTrainTime = 0;

    var frequency = "";

    // Capture Button Click

    $("#submit").on('click', function(){
      event.preventDefault();

     trainName = $('#name-input').val().trim();
     destination = $('#destination-input').val().trim();
     firstTrainTime = $('#firstTrainTime-input').val().trim();
     frequency = $('#frequency-input').val().trim();

     database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
      });

      $('#name-input').val(" ");
      $('#destination-input').val(" ");
      $('#firstTrainTime-input').val(" ");
      $('#frequency-input').val(" ");

   })

       database.ref().on("child_added", function(snapshot){

       $('#name-input').text(snapshot.val().trainName);
       $('#destination-input').text(snapshot.val().destination);
       $('#firstTrainTime-input').text(snapshot.val().firstTrainTime);
       $('#frequency-input').text(snapshot.val().frequency);

      var newRow = $('<tr>');
      var trainNew = $('<td>');
      var destinationNew = $('<td>');
      var nextArival = $('<td>');
      var frequencyNew = $('<td>');
      var minNew = $('<td>');

      var tFrequency = moment(frequency, "minutes");
      console.log(tFrequency)
    
      var firstTime = moment(firstTrainTime, "hmm").format("HH:mm");
      console.log(firstTrainTime)
    
      var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
      // console.log(firstTimeConverted);

    
      var currentTime = moment();
      // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      // console.log("DIFFERENCE IN TIME: " + diffTime);

    
      var tRemainder = diffTime % tFrequency;
      // console.log(tRemainder);

    
      var tMinutesTillTrain = tFrequency - tRemainder;
      // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

         trainNew.text(snapshot.val().trainName);
         destinationNew.text(snapshot.val().destination);
         nextArival.text(nextTrain);
         frequencyNew.text(snapshot.val().frequency);
         minNew.text(tMinutesTillTrain);

         newRow.append(trainNew);
         newRow.append(destinationNew);
         newRow.append(frequencyNew);
         newRow.append(nextArival); 
         newRow.append(minNew);
         // newRow.append(rateNew);
         // newRow.append(billedNew);

       $('#newData').append(newRow);
     }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);


    });