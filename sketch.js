var pageMode
const front = 0
const open_close = 1
const open_close_net = 2
const flapping = 3
const flapping_net = 4
const walking = 5
const walking_net = 6
const my_sketch = 9

var bgcolor1, bgcolor2
var temp_windowWidth = 1200
var temp_windowHeight = 660
var pair_petal
    ,gearSize_petal
    ,motorType_petal
    ,petalX = 0
    ,petalY = 0
var pair_wing
    ,gearType_wing
    ,gearSize_wing
    ,motorType_wing
    ,UI_wing
    ,wingX = 0
    ,wingY = 0
var pair_leg
    ,add_leg
    ,gearSize_walk

function setup() {
  createCanvas(temp_windowWidth, temp_windowHeight)
  bgcolor1 = color(255)
  bgcolor2 = color(200)
  tempC = color(0,120,230)
  blue = color(70,150,255)
  white = color(255)
  colorsend_1 = color(255,0,0)
  colorsend_2 = color(200,0,255)
  colorsend_3 = color(50,200,200)

  colorSet = [tempC, blue, colorsend_1, colorsend_2, colorsend_3] //first is nominal

  Flower3 = new OpenClose()
  Flower3.init()
  Bird1 = new Bird()
  Bird1.init()
  Walk1 = new Walk()
  Walk2 = new Walk()
  Walk3 = new Walk()
  Walk4 = new Walk()
  Walk1.init()
  Walk2.init()
  Walk3.init()
  Walk4.init()
  IntroM1 = new Intro()

  pair_petal = 0
  gearSize_petal = 2
  motorType_petal = 180
  pair_wing = 0
  gearType_wing = 1
  gearSize_wing = 2
  motorType_wing = 180
  UI_wing = 1
  pair_leg = 0
  add_leg = 0
  gearSize_walk = 2
  UI_walk = 1
  PullPush_mecType = 0
  OpenClose_mecType = 0
  Panel = new UI()

  textSize(15)
  pageMode = 0
}

function draw() {
  background(bgcolor1)

  if (pageMode == front){ //mode 0
    Panel.Front()
    Panel.button_front()

    IntroM1.button_back()
    IntroM1.OpenClose(1, .5, -10, 220) //left petal
    IntroM1.OpenClose(-1, .5, -10, 220) //right petal
    IntroM1.compFlapping()
    IntroM1.walking()

    IntroM1.button_font()
  }

  else if (pageMode == open_close){ //mode 1
    Panel.initUI()
    Panel.putText_OpenClose()
    Panel.button_OpenClose()
     //Panel.OpenClose()

    Flower3.opencloseUI()
    // petalX = 0
    // petalY = 0
    Flower3.compGear(petalX,petalY,pair_petal, gearSize_petal, motorType_petal)

  }else if (pageMode == open_close_net){ //mode 2
    Panel.initUI_net()
    Panel.putText_OpenClose_net()

    Flower3.drawNet( gearSize_petal, motorType_petal)

  }else if (pageMode == open_close_net){ //mode 2
    Panel.initUI_net()
    Panel.putText_OpenClose_net()

    Flower3.drawNet( gearSize_petal, motorType_petal)

  } else if (pageMode == flapping){ //mode 3

    // //this must be change by button trigger --> get return current mirroring status
     wingX = 0
     wingY = 0
    Bird1.compBird(wingX,wingY,pair_wing, gearType_wing, gearSize_wing, motorType_wing)

    Panel.initUI()
    Panel.putText_Wings(UI_wing)
    Panel.button_Wings()
    // Panel.Wings(UI_wing)

    Bird1.flappingUI(UI_wing)

  }else if (pageMode == flapping_net){ //mode 4
    Panel.initUI_net()
    Panel.putText_Flapping_net()

    Bird1.drawNet(pair_wing,gearSize_wing)

  }else if (pageMode == walking){ //mode 5

    Walk1.compWalk(pair_leg,0,gearSize_walk,tempC)

    if(add_leg == 1){
      Walk2.compWalk(pair_leg,1,gearSize_walk,colorsend_1)
    }
    if(add_leg == 2){
      Walk2.compWalk(pair_leg,1,gearSize_walk,colorsend_1)
      Walk3.compWalk(pair_leg,1,gearSize_walk,colorsend_2)
    }
    if(add_leg == 3){
      Walk2.compWalk(pair_leg,1,gearSize_walk,colorsend_1)
      Walk3.compWalk(pair_leg,1,gearSize_walk,colorsend_2)
      Walk4.compWalk(pair_leg,1,gearSize_walk,colorsend_3)
    }

    Panel.initUI()
    Panel.button_walk(add_leg)
    Panel.putText_walk(UI_walk)

    Walk1.walkUI(UI_walk,add_leg)

  } else if (pageMode == my_sketch){ //mode 9

    Panel.initUI()
    Panel.putText_My()
    Panel.callButton_MY()

    var mySavedModule = Panel.findDrawingFunc()

    mySavedModule.forEach(function(entity, i){
      tempC = colorSet[i] //change model colors per saved module
      //all case is independent
      gearSize_petal = entity.gearSize
      motorType_petal = entity.servoAngle

      push()
      scale(1 + Panel.getScaling()*0.1) //response to +/- scaling

      if(entity.module == 1){

          push()
          if(entity.rotation != undefined){

            if(entity.rotation == 90)
              translate(1200+20, 900 - 900/2 - 720)
            if(entity.rotation == 180)
              translate(1600-100, 900+60) //where is the center?

            if (entity.rotation == 270){
              translate(260, 1240)
            // translate(width/2+200, height/2+200)
            // petalX = 100, petalY = 100
            }
        }
        // else {
        //   Flower3.compGear(petalX, petalY, pair_petal, gearSize_petal, motorType_petal)
        // }
        rotate(entity.rotation*PI/180) //rotate in radian

        if(entity.flip){
          translate(1200,0);
          console.log("in sketch.js flip module")
          scale(-1,1)

        }
        if(entity.x != undefined){
          petalX = entity.x
        }
        if(entity.y != undefined){
          petalY = entity.y
        }
        if((entity.x == undefined) && (entity.y == undefined)){
          petalX = i*-50
          petalY = i*-50
        }

        Flower3.compGear(petalX, petalY, pair_petal, gearSize_petal, motorType_petal)

        pop()

      } else if(entity.module == 3){
        //pass param based on returned savedDesign

        pair_wing = entity.mirroring
        gearType_wing = entity.driveGear
        gearSize_wing = entity.gearSize
        motorType_wing = entity.servoAngle

        if(entity.x != undefined){
          wingX = entity.x
        }
        if(entity.y != undefined){
          wingY = entity.y
        }
        if((entity.x == undefined) && (entity.y == undefined)){
          wingX = i*-50
          wingY = i*-50
        }

        if(entity.rotation != undefined){
          push()
          rotate(entity.rotation) //rotate the screen
          Bird1.compBird(wingX, wingY, pair_wing, gearType_wing, gearSize_wing, motorType_wing)
          pop()
        } else {
          Bird1.compBird(wingX, wingY, pair_wing, gearType_wing, gearSize_wing, motorType_wing)
        }

      }else if(entity.module == 5){
        //pass param based on returned savedDesign
        // push()
        // translate(i*-50, i*-50) //move based on my_sketch setting

        Walk1.compWalk(pair_leg,0,gearSize_walk,tempC)

        if(add_leg == 1){
          Walk2.compWalk(pair_leg,1,gearSize_walk,colorsend_1)
        }
        if(add_leg == 2){
          Walk2.compWalk(pair_leg,1,gearSize_walk,colorsend_1)
          Walk3.compWalk(pair_leg,1,gearSize_walk,colorsend_2)
        }
        if(add_leg == 3){
          Walk2.compWalk(pair_leg,1,gearSize_walk,colorsend_1)
          Walk3.compWalk(pair_leg,1,gearSize_walk,colorsend_2)
          Walk4.compWalk(pair_leg,1,gearSize_walk,colorsend_3)
        }
        // pop()
      }

      pop()
      if(i) //only if i is true, index 0 is nominal object
        Panel.mySketch_ModuleText(entity, i) //-> this override thing

    }); //EOForEach

  }
}

function mousePressed(){ //map mouse pressed position to function

//Universal -> go to HOME
    if (mouseX>60 && mouseX<210 && mouseY>615 && mouseY<635){ // Go to Home
        pageMode = front
    }

// simulation -> *home or my sketch
  if (pageMode == 1 || pageMode ==3){
    if (mouseX>60 && mouseX<210 && mouseY>590 && mouseY<610){
        pageMode = my_sketch
    }
  }

//For each Mode --> this all to be moved to UI.js
  if (pageMode == 0){ //front menu
    if (mouseX>250 && mouseX<450 && mouseY>150 && mouseY<350){
    // temp Open & Close Mode
      pageMode = 1
      Panel.initCurrentSelection(pageMode)
    }else if (mouseX>500 && mouseX<700 && mouseY>150 && mouseY<350){
    // temp Flapping Mode
      pageMode = 3
      Panel.initCurrentSelection(pageMode)
    }else if (mouseX>750 && mouseX<950 && mouseY>150 && mouseY<350){
    // temp Walking Mode
      pageMode = 5
      Panel.initCurrentSelection(pageMode)
    }else if (mouseX>250 && mouseX<450 && mouseY>400 && mouseY<430){
    // temp My SKETCHBOOK
      pageMode = 9
    }

  } else if (pageMode == 1){ //flower menu
    if (mouseX>138 && mouseX<182 && mouseY>315 && mouseY<335){
    // add another petal for open & close
       pair_petal = 1
    }else if (mouseX>190 && mouseX<240 && mouseY>315 && mouseY<335){
    // only pull & push
       pair_petal = 0
    }

    if (mouseX>115 && mouseX<135 && mouseY>375 && mouseY<395){
    // button 1 : Gear Size 1
       gearSize_petal = 1
    }else if (mouseX>150 && mouseX<170 && mouseY>375 && mouseY<395){
    // button 2 : Gear Size 2
       gearSize_petal = 2
    }else if (mouseX>185 && mouseX<205 && mouseY>375 && mouseY<395){
    // button 3 : Gear Size 3
       gearSize_petal = 3
    }else if (mouseX>220 && mouseX<240 && mouseY>375 && mouseY<395){
    // button 4 : Gear Size 4
       gearSize_petal = 4
    }

    if (mouseX>50 && mouseX<90 && mouseY>430 && mouseY<450){
    // button 180 : Motor Type
       motorType_petal = 180

    }else if (mouseX>140 && mouseX<215 && mouseY>430 && mouseY<450){
    // button Continuous : Motor Type
       motorType_petal = 360
    }

    if(mouseX>60 && mouseX<210 && mouseY>495 && mouseY<515){
    // RESET all

       console.log("RESET ENTERED")
    }

    if(mouseX>60 && mouseX<210 && mouseY>545 && mouseY<565){
    // Folding net
       pageMode = 2
       console.log(" FOLDING NET ENTERED")
    }

  }

  if (pageMode == 3) { //flapping

    rect(210,160,15,20)
    fill(255)
    text("1", 215, 175)

    noFill()
    stroke(0)
    rect(230,160,15,20)

    if (mouseX>210 && mouseX<225 && mouseY>160 && mouseY<180){
    // UI mode 1 : show wing parameters
       UI_wing = 1
    }else if (mouseX>230 && mouseX<245 && mouseY>160 && mouseY<180){
    // UI mode 2 : center
       UI_wing = 2
    }

    if (mouseX>138 && mouseX<182 && mouseY>315 && mouseY<335){
    // only one wing
       pair_wing = 1
    }else if (mouseX>190 && mouseX<240 && mouseY>315 && mouseY<335){
    // two wings
       pair_wing = 0
    }

    if (pair_wing == 1){
      if (mouseX>150 && mouseX<175 && mouseY>345 && mouseY<365){
      // button L : Gear Type
         gearType_wing = 1
      }else if (mouseX>200 && mouseX<225 && mouseY>345 && mouseY<365){
      // button R : Gear Type
         gearType_wing = 0
      }
    }else if (pair_wing == 0){
         gearType_wing = 1
    }

    if (mouseX>115 && mouseX<135 && mouseY>375 && mouseY<395){
    // button 1 : Gear Size 1
       gearSize_wing = 1
    }else if (mouseX>150 && mouseX<170 && mouseY>375 && mouseY<395){
    // button 2 : Gear Size 2
       gearSize_wing = 2
    }else if (mouseX>185 && mouseX<205 && mouseY>375 && mouseY<395){
    // button 3 : Gear Size 3
       gearSize_wing = 3
    }else if (mouseX>220 && mouseX<240 && mouseY>375 && mouseY<395){
    // button 4 : Gear Size 4
       gearSize_wing = 4
    }

    if (mouseX>50 && mouseX<90 && mouseY>430 && mouseY<450){
    // button 180 : Motor Type
       motorType_wing = 180

    }else if (mouseX>140 && mouseX<215 && mouseY>430 && mouseY<450){
    // button Continuous : Motor Type
       motorType_wing = 360
    }

    if(mouseX>60 && mouseX<210 && mouseY>495 && mouseY<515){
    // RESET all
       pair_wing = 0
       gearType_wing = 1
       gearSize_wing = 2
       motorType_wing = 360
       console.log(" RESET ENTERED")
    }

    if(mouseX>60 && mouseX<210 && mouseY>545 && mouseY<565){
    // Folding net
       pageMode = 4
       console.log(" FOLDING NET ENTERED")
    }

  }

  if (pageMode == 5){
    if (mouseX>210 && mouseX<225 && mouseY>160 && mouseY<180){
        // UI mode 1 : show wing parameters
       UI_walk = 1
    }else if (mouseX>230 && mouseX<245 && mouseY>160 && mouseY<180){
        // UI mode 2 : center
       UI_walk = 2
    }

    if (mouseX>115 && mouseX<135 && mouseY>375 && mouseY<395){
    // button 1 : Gear Size 1
       gearSize_walk = 1
    }else if (mouseX>150 && mouseX<170 && mouseY>375 && mouseY<395){
    // button 2 : Gear Size 2
       gearSize_walk = 2
    }else if (mouseX>185 && mouseX<205 && mouseY>375 && mouseY<395){
    // button 3 : Gear Size 3
       gearSize_walk = 3
    }else if (mouseX>220 && mouseX<240 && mouseY>375 && mouseY<395){
    // button 4 : Gear Size 4
       gearSize_walk = 4
    }

    if (mouseX>138 && mouseX<182 && mouseY>315 && mouseY<335){
    // only one leg
       pair_leg = 1
    }else if (mouseX>190 && mouseX<240 && mouseY>315 && mouseY<335){
    // two wings
       pair_leg = 0
    }

    if (mouseX>138 && mouseX<182 && mouseY>345 && mouseY<365){
    // add more pair
        add_leg = add_leg+1

        if(add_leg >= 3){
          add_leg = 3
        }
    }

    if(mouseX>60 && mouseX<210 && mouseY>495 && mouseY<515){
    // RESET all
       gearSize_walk = 2
       pair_leg = 0
       add_leg = 0
       console.log(" RESET ENTERED")
    }

}

  if (pageMode == 2){
    if (mouseX>60 && mouseX<210 && mouseY>565 && mouseY<585){
      console.log(" DOWNLOAD PDF")
    }
    if (mouseX>60 && mouseX<210 && mouseY>590 && mouseY<610){
    // back to the simulation
       pageMode = 1
       Panel.initCurrentSelection(pageMode)
    }
  }

  if (pageMode == 4){
    if (mouseX>60 && mouseX<210 && mouseY>565 && mouseY<585){
//      console.log(" DOWNLOAD PDF")
      Bird1.drawPDF()
    }
    if (mouseX>60 && mouseX<210 && mouseY>590 && mouseY<610){
    // back to the simulation
       pageMode = 3
       Panel.initCurrentSelection(pageMode)
    }
  }

}
