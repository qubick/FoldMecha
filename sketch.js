var pageMode
const front = 0
const open_close = 1
const flapping = 2
const planetary = 3
const my_sketch = 9

var bgcolor1, bgcolor2
var temp_windowWidth = 1200
var temp_windowHeight = 660
var pair_petal, gearSize_petal, motorType_petal
var pair_wing, gearType_wing, gearSize_wing, motorType_wing, UI_wing
var planet_pair,motorType_Pl

function setup() {
  createCanvas(temp_windowWidth, temp_windowHeight)
  bgcolor1 = color(255)
  bgcolor2 = color(200)
  tempC = color(0,120,230)
  Flower3 = new OpenClose()
  Flower3.init()
  Bird1 = new Bird()
  Bird1.init()

  Planet1 = new Planetary()
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

  if (pageMode==front){ //mode 0
    Panel.Front()
    Panel.button_front()
  }

  else if (pageMode==open_close){ //mode 1
   Panel.initUI()
   Panel.putText_OpenClose()
   //Panel.button_OpenClose()
   //Panel.OpenClose()

  //  Flower3.compOpenclose_UP(pair_petal,gearSize_petal)
    Flower3.opencloseUI()
    Flower3.compGear(pair_petal, gearSize_petal, motorType_petal)

  }else if (pageMode==flapping){ //mode 2

    Panel.initUI()
    Panel.putText_Wings(UI_wing)
    // Panel.button_Wings()
    // Panel.Wings(UI_wing)

    Bird1.flappingUI(UI_wing) //draw things
    Bird1.compBird(pair_wing,gearType_wing,gearSize_wing,motorType_wing)

  }else if (pageMode==planetary){ //mode 3
    Panel.initUI()
    Panel.putText_Planetary()
    // Panel.button_Planetary()

    Planet1.compGears(planet_pair,motorType_Pl)

  }else if (pageMode==my_sketch){ //mode 9

    Panel.initUI()
    Panel.putText_My()

    var galleryMode = Panel.findDrawingFunc()
    //var savedDesign = Panel.findSavedDesign()
    galleryMode.forEach(function(mode){

      //all case is independent
      if(mode == 1){
        Flower3.compGear(pair_petal, gearSize_petal, motorType_petal)
      }

      if(mode == 2){
        //pass param based on returned savedDesign
        Bird1.compBird(pair_wing,gearType_wing,gearSize_wing,motorType_wing)
      }

      if(mode == 3){
        Planet1.compGears(planet_pair,motorType_Pl)
      }
    })

    // Panel.button_My() //creating gallery buttons upon save data
  }
}

function mousePressed(){ //map mouse release position to function

//Universal Navigation  --> directly map button to function
  if (mouseX>60 && mouseX<210 && mouseY>615 && mouseY<635){ // Go to Home
      pageMode = front
  }else if (mouseX>60 && mouseX<210 && mouseY>590 && mouseY<610){
      pageMode = my_sketch
  }

//For each Mode --> this all to be moved to UI.js
  if (pageMode == 0){ //front menu
    if (mouseX>250 && mouseX<350 && mouseY>100 && mouseY<200){
    // temp Open & Close Mode
      pageMode = 1
    }else if (mouseX>400 && mouseX<500 && mouseY>100 && mouseY<200){
    // temp Flapping Mode
      pageMode = 2
    }else if (mouseX>550 && mouseX<650 && mouseY>100 && mouseY<200){
    // temp Planetary gear Mode
      pageMode = 3
    }else if (mouseX>100 && mouseX<200 && mouseY>400 && mouseY<500){
    // temp My sketchbook Mode
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

    if (mouseX>115 && mouseX<135 && mouseY>405 && mouseY<425){
    // button 1 : Gear Size 1
       gearSize_petal = 1
    }else if (mouseX>150 && mouseX<170 && mouseY>405 && mouseY<425){
    // button 2 : Gear Size 2
       gearSize_petal = 2
    }else if (mouseX>185 && mouseX<205 && mouseY>405 && mouseY<425){
    // button 3 : Gear Size 3
       gearSize_petal = 3
    }else if (mouseX>220 && mouseX<240 && mouseY>405 && mouseY<425){
    // button 4 : Gear Size 4
       gearSize_petal = 4
    }

    if (mouseX>50 && mouseX<90 && mouseY>460 && mouseY<480){
    // button 180 : Motor Type
       motorType_petal = 180

    }else if (mouseX>140 && mouseX<215 && mouseY>460 && mouseY<480){
    // button Continuous : Motor Type
       motorType_petal = 360
    }
  }

  if (pageMode == 2) { //flapping

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
    if (mouseX>150 && mouseX<175 && mouseY>375 && mouseY<395){
    // button A : Gear Type
       gearType_wing = 1
       console.log("this button")
    }else if (mouseX>200 && mouseX<225 && mouseY>375 && mouseY<395){
    // button B : Gear Type
       gearType_wing = 0
    }

    if (mouseX>115 && mouseX<135 && mouseY>405 && mouseY<425){
    // button 1 : Gear Size 1
       gearSize_wing = 1
    }else if (mouseX>150 && mouseX<170 && mouseY>405 && mouseY<425){
    // button 2 : Gear Size 2
       gearSize_wing = 2
    }else if (mouseX>185 && mouseX<205 && mouseY>405 && mouseY<425){
    // button 3 : Gear Size 3
       gearSize_wing = 3
    }else if (mouseX>220 && mouseX<240 && mouseY>405 && mouseY<425){
    // button 4 : Gear Size 4
       gearSize_wing = 4
    }

    if (mouseX>50 && mouseX<90 && mouseY>460 && mouseY<480){
    // button 180 : Motor Type
       motorType_wing = 180

    }else if (mouseX>140 && mouseX<215 && mouseY>460 && mouseY<480){
    // button Continuous : Motor Type
       motorType_wing = 360
    }
  }

  if (pageMode == 3) {
    if (mouseX>50 && mouseX<95 && mouseY>390 && mouseY<410){
    // Add another Planet gear: Pairing Yes
       planet_pair = 0
    }else if (mouseX>160 && mouseX<210 && mouseY>390 && mouseY<410){
    // Delete another Planet gear: Pairing No
       planet_pair = 1
    }
    if (mouseX>50 && mouseX<90 && mouseY>460 && mouseY<480){
    // button 180 : Motor Type for Planetary Gears
       motorType_Pl = 180
    }else if (mouseX>140 && mouseX<215 && mouseY>460 && mouseY<480){
    // button Continuous : Motor Type for Planetary Gears
       motorType_Pl = 360
    }
  }

}
