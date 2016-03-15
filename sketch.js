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
var pair_petal, gearSize_petal, motorType_petal
var pair_wing, gearType_wing, gearSize_wing, motorType_wing, UI_wing
var planet_pair,motorType_Pl

var flowerCnt = 0

function setup() {
  createCanvas(temp_windowWidth, temp_windowHeight)
  bgcolor1 = color(255)
  bgcolor2 = color(200)
  tempC = color(0,120,230)
  blue = color(70,150,255)
  white = color(255)
  Flower3 = new OpenClose()
  Flower3.init()
  Bird1 = new Bird()
  Bird1.init()
  IntroM1 = new Intro()

  pair_petal = 1
  gearSize_petal = 2
  motorType_petal = 180
  pair_wing = 0
  gearType_wing = 1
  gearSize_wing = 2
  motorType_wing = 360
  UI_wing = 1
  planet_pair = 1
  motorType_Pl = 180
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
    Flower3.compGear(pair_petal, gearSize_petal, motorType_petal)

  }else if (pageMode == open_close_net){ //mode 2
    Panel.initUI()
    Panel.putText_OpenClose_net()

    Flower3.drawNet( gearSize_petal, motorType_petal)

  }else if (pageMode == flapping){ //mode 3

    Bird1.compBird(pair_wing,gearType_wing,gearSize_wing,motorType_wing)

    Panel.initUI()
    Panel.putText_Wings(UI_wing)
    Panel.button_Wings()
    // Panel.Wings(UI_wing)

    Bird1.flappingUI(UI_wing) //draw things

  }else if (pageMode==flapping_net){ //mode 4
    Panel.initUI()
    Panel.putText_Flapping_net()

    Bird1.drawNet(pair_wing,gearSize_wing)

  }else if (pageMode == my_sketch){ //mode 9

    Panel.initUI()
    Panel.putText_My()
    Panel.callButton_MY()

    var mySavedModule = Panel.findDrawingFunc()
    //var savedDesign = Panel.findSavedDesign()
    mySavedModule.forEach(function(entity, i){
      //all case is independent
      if(entity.module == 1){
        push()
        translate(i*-50, i*-50) //move based on my_sketch setting
        //pair_petal = entity.paring?
        gearSize_petal = entity.gearSize
        motorType_petal = entity.servoAngle
        Flower3.compGear(pair_petal, gearSize_petal, motorType_petal)
        pop()
      }

      if(entity.module == 3){
        //pass param based on returned savedDesign
        push()
        translate(i*-50, i*-50) //move based on my_sketch setting
        pair_wing = entity.mirroring
        //gearType_wing = entity.
        gearSize_wing = entity.gearSize
        motorType_wing = entity.servoAngle
        Bird1.compBird(pair_wing, gearType_wing, gearSize_wing, motorType_wing)
        pop()
      }

      //should pass separate json of entity?
      //can passed 'i' entify which entity?
      Panel.mySketch_ModuleText(entity, i)
    })

    // Panel.button_My() //creating gallery buttons upon save data
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
    // temp Planetary gear Mode
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

  if (pageMode == 2){
    if (mouseX>60 && mouseX<210 && mouseY>590 && mouseY<610){
    // back to the simulation
       pageMode = 1
       Panel.initCurrentSelection(pageMode)
    }
  }

  if (pageMode == 4){
    if (mouseX>60 && mouseX<210 && mouseY>590 && mouseY<610){
    // back to the simulation
       pageMode = 3
       Panel.initCurrentSelection(pageMode)
    }
  }


}
