song = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload()
{
    song = loadSound("music.mp3");
}


function setup() 
{
    canvas = createCanvas(600, 500);
   canvas.center();
   
   video= createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " +leftWristX +" leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " +rightWristX +" rightWristY = "+ rightWristY);
    }
}

function modelLoaded() {
    console.log('poseNet Is Initialized');
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#00FFFF");
    stroke("#FF00FF");

    circle(rightWristX,rightWristY,20);

   if(scoreRightWrist > 0.2)
   {
    if(rightWristy >0 && rightWristY <= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5)
    }

   else if(rightWristy >100 && rightWristY <= 200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.0x";
        song.rate(1.0)
    }

    else if(rightWristy >200 && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5)
    }

    else if(rightWristy >300 && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2.0x";
        song.rate(2.0)
    }

    else if(rightWristy >400 && rightWristY <= 500)
    {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5)
    }
   }


    
    if(scoreLeftWrist > 0.2)
    {
            

    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimmals = floor(InNumberleftWristY);
    volume = remove_decimmals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }

}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}