Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90});
camera=document.getElementById("camera");
Webcam.attach('camera');
function takeSnapshot()
{
    navigator.mediaDevices.getUserMedia({ video: true});
    Webcam.snap(function(data_uri){
        snapshot= '<img id="captured_image" src="'+data_uri+'"/>';
        document.getElementById("result").innerHTML=snapshot;
    });
}
console.log("ml5 version:", ml5.version);
    classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/6pNjx6PiZ/model.json", modelReady);
function modelReady(){
    console.log("Model Ready!");
}
function speak()
{
    var synth= window.speechSynthesis;
    speak_data1= "The first prediction is"+prediction1;
    speak_data2= "The second prediction is"+prediction2;
    var utterThis= new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}
function predict()
{
    img=document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}
function gotResults (error, results){
    if (error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if (prediction1== "Amazing")
        {
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
        if (prediction1== "Best")
        {
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        if (prediction1== "Victory")
        {
            document.getElementById("update_emoji").innerHTML="&#9996;"
        }
        if (prediction2=="Amazing")
        {
            document.getElementById("update_emoji2").innerHTML="&#128076;"
        }
        if (prediction2=="Best")
        {
            document.getElementById("update_emoji2").innerHTML="&#128077;";
        }
        if(prediction2=="Victory")
        {
            document.getElementById("update_emoji2").innerHTML="&#9996;";
        }
    }
}
