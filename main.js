var video = "";
var status = "";
objects = [];
var sound=""

function preload() {
  sound = loadSound("emergency_alert.mp3");
}

function setup() {
  video= createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  canvas = createCanvas(380, 380);
  canvas.center();

  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
  console.log("Model is Loaded");
  status = true;
  //objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
  image(video, 0, 0, 380, 380);

  if (status != "") {
    r= random(255);
    g= random(255);
    b= random(255);
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status: Object Detected";
      
      fill(r,g,b);
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "% ", objects[i].x+25, objects[i].y+20);
      noFill();
      stroke(r,g,b);
      rect(objects[i].x-250, objects[i].y+10, objects[i].width, objects[i].height);

      if (objects[i].label=="person"){
        document.getElementById("number_of_objects").innerHTML = "Baby Found"
        sound.stop()
      }
      else{
        document.getElementById("number_of_objects").innerHTML = "Baby Not Found!"
        sound.play()
      }

      if (objects.length==0){
        document.getElementById("number_of_objects").innerHTML = "Baby Not Found!"
        sound.play()
      }
    }
  }
}