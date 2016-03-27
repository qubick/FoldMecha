function UI(){

  this.lengthGap = 10
  this.bgcolor2 = color(200)
  this.temp_windowHeight = 660
  this.UI_mode = 1 //default

  var _this = this
  var stdSliderValue = [{}] //sketch object to restore slider from/to different module
      ,currentModule = 0 // 1 OpenClose
                        // 3 Wings
                        // 5 Walker
                        // 9 MySketch
  this.myBtnList = [] //button array for my sketch
  this.mySavedSketch = [{}]

  this.currentGearSize     = 2 //default
  this.currentServoAngle   = 180 // 180 or 360
  this.currentDrivingGear  = 0 // 0:left, 1:right
  this.currentPairing      = 1

  this.Mech_show  = createButton ('Show Mechanism')
  this.Mech_hide  = createButton ('Hide Mechanism')
  this.Btn_reset  = createButton ('Reset all').mousePressed(resetAll)
  this.Btn_pdf    = createButton ('Download PDF')
  this.Btn_back   = createButton ('Back to Simulation')
  this.Btn_plt    = createButton ('Save in My Palette').mousePressed(saveDesign)
  this.Btn_net    = createButton ('View the Folding Net').mousePressed(button_folding_net)
  this.Btn_my     = createButton ('Go to My Sketch').mousePressed(button_My)
  this.Btn_home   = createButton ('Go to Home')//.mousePressed(_this.Front)
  this.mirr_apply = createButton('Apply').mousePressed(setMirroring)
  this.mirr_cancel= createButton('Cancel').mousePressed(setMirroring)
  this.new_apply  = createButton('Apply')

  this.mtr_L = createButton('L').mousePressed(setDrivingGear)
  this.mtr_R = createButton('R').mousePressed(setDrivingGear)

  this.size_1 = createButton('1').mousePressed(setGearSize) //bind to same function
  this.size_2 = createButton('2').mousePressed(setGearSize)
  this.size_3 = createButton('3').mousePressed(setGearSize)
  this.size_4 = createButton('4').mousePressed(setGearSize)

  this.mtr180 = createButton('180°').mousePressed(setServoAngle)
  this.mtr360 = createButton('Continuous').mousePressed(setServoAngle)

  this.A_slider = createSlider(0, 400, 60).size(100).position(20, 200)
  this.B_slider = createSlider(0, 400, 240).size(100).position(140, 200)
  this.C_slider = createSlider(0, 400, 50).size(100).position(20, 235)
  this.D_slider = createSlider(0, 400, 150).size(100).position(140, 235)
  this.E_slider = createSlider(0, 400, 250).size(100).position(20, 270)
  this.F_slider = createSlider(0, 400, 150).size(100).position(140,270)
  this.G_slider = createSlider(0, 400, 150).size(100).position(140,270)

  this.X_slider = createSlider(0, 200, 20).size(100).position(20, 200)
  this.Y_slider = createSlider(0, 200, 40).size(100).position(140,200)

  this.selectParent = [] //array
  this.btn180 = []
  this.btnContd = []
  this.linked = false

  // for individual module
  for(var i=0; i<5; i++){ //up to # of saved models or saving limit (now 4)
    var sel = createSelect().hide()
    //sel.attribute('id','option'+i).option('None') //default
    sel.attribute('id', i).option('None') //default

    var btn180 = createButton("180°").hide()
    var btn360 = createButton("Continuous").hide()
    this.selectParent.push(sel)
    this.btn180.push(btn180)
    this.btnContd.push(btn360)
  }
  this.button_Delete = createButton("Delete").hide()

  // for linked module
  this.selectLinked = []

  function resetAll(){
    this.currentGearSize    = 2 //default
    this.currentServoAngle  = 180 // 180 or 360
    this.currentDrivingGear = 0 // 0:left, 1:right
    this.currentPairing     = 0
  }

  this.initCurrentSelection = function(pageMode){

    //invoke slider selection
    //I feel somehow this is little redundant
    if(pageMode == 1) {
      //take a look at stdSliderValue.openclose
      if(stdSliderValue.openclose == undefined){ //initial values
        _this.currentGearSize     = 2 //default
        _this.currentServoAngle   = 180 // 180 or 360
        _this.currentPairing    = 0

        highlightMirroring(0)
        highlightGearSize(2) // default gear size  = 2
        highlightServoAngle(180) //default angle = 180
      } else {
        //invoke saved json obj

        _this.A_slider.value(stdSliderValue.openclose.A)
        _this.B_slider.value(stdSliderValue.openclose.B)
        _this.C_slider.value(stdSliderValue.openclose.C)
        _this.D_slider.value(stdSliderValue.openclose.D)
        _this.E_slider.value(stdSliderValue.openclose.E)

        highlightMirroring(stdSliderValue.openclose.pair)
        highlightGearSize(stdSliderValue.openclose.gearSize)
        highlightServoAngle(stdSliderValue.openclose.servoAngle)
      }
    } else if(pageMode == 3){
      //take a look at stdSliderValue.wings
      if(stdSliderValue.wings == undefined){
        _this.currentGearSize     = 2 //default
        _this.currentServoAngle   = 180 // 180 or 360
        _this.currentPairing    = 0
        _this.currentDrivingGear  = 0 // 0:left, 1:right

        highlightMirroring(0)
        highlightGearSize(2) // default gear size  = 2
        highlightServoAngle(180) //dafault
        highlightDrivingGear(0) //default: left(0)
      } else {
        //invoke saved json obj
        _this.A_slider.value(stdSliderValue.wings.A)
        _this.B_slider.value(stdSliderValue.wings.B)
        _this.C_slider.value(stdSliderValue.wings.C)
        _this.D_slider.value(stdSliderValue.wings.D)
        _this.E_slider.value(stdSliderValue.wings.E)
        _this.F_slider.value(stdSliderValue.wings.F)

        _this.X_slider.value(stdSliderValue.wings.X)
        _this.Y_slider.value(stdSliderValue.wings.Y)

        highlightMirroring(stdSliderValue.wings.pair)
        highlightGearSize(stdSliderValue.wings.gearSize)
        highlightServoAngle(stdSliderValue.wings.servoAngle)
        highlightDrivingGear(stdSliderValue.wings.drivingGear)
      }
    } else if(pageMode == 5){
      if(stdSliderValue.openclose == undefined){ //initial values
        _this.currentGearSize     = 2 //default
        _this.currentPairing    = 0

        highlightMirroring(0)
        highlightGearSize(2) // default gear size  = 2
    }
  }
}

  function setGearSize(){
    var gearSize = parseInt(this.elt.innerHTML)
    highlightGearSize(gearSize)
    _this.currentGearSize = parseInt(this.elt.innerHTML)

    console.log(gearSize)
  }

  function highlightMirroring(pair){
    if(pair == 1){
      _this.mirr_apply.style("background-color",blue)
      _this.mirr_cancel.style("background-color",white)
    }else if(pair == 0){
      _this.mirr_apply.style("background-color",white)
      _this.mirr_cancel.style("background-color",blue)
    }

  }
  function highlightGearSize(gearSize){
    if(gearSize == 1){
       _this.size_1.style("background-color",blue)
       _this.size_2.style("background-color",white)
       _this.size_3.style("background-color",white)
       _this.size_4.style("background-color",white)
     }else if(gearSize == 2){
       _this.size_1.style("background-color",white)
       _this.size_2.style("background-color",blue)
       _this.size_3.style("background-color",white)
       _this.size_4.style("background-color",white)
     }else if(gearSize == 3){
       _this.size_1.style("background-color",white)
       _this.size_2.style("background-color",white)
       _this.size_3.style("background-color",blue)
       _this.size_4.style("background-color",white)
     }else if(gearSize == 4){
       _this.size_1.style("background-color",white)
       _this.size_2.style("background-color",white)
       _this.size_3.style("background-color",white)
       _this.size_4.style("background-color",blue)
     }
  }

  function setServoAngle(){
    if(this.elt.innerHTML == "Continuous")
      _this.currentServoAngle = 360
    else
      _this.currentServoAngle = 180

    highlightServoAngle(_this.currentServoAngle)
  }

  function highlightServoAngle(servo){
    if(servo == 180){
        _this.mtr180.style('background',blue)
        _this.mtr360.style('background-color',white)
    } else { //360
        _this.mtr180.style('background-color',white)
        _this.mtr360.style('background-color',blue)
    }
  }

  function setMirroring(pair){
    if(this.elt.innerHTML == "Apply"){
      highlightMirroring(pair)
      _this.currentPairing = 1
    }else{ //Cancel
      _this.currentPairing = 0
      highlightMirroring(pair)
    }
    console.log(_this.currentPairing)
  }

  function setDrivingGear(){
    if(this.elt.innerHTML == 'L'){
      highlightDrivingGear(0)
      _this.currentDrivingGear = "LEFT"
    }else { // R
      highlightDrivingGear(1)
      _this.currentDrivingGear = "RIGHT"
    }
  }

  function highlightDrivingGear(drivingGear){ // 0: left, 1:right
      if(drivingGear == 0){
          _this.mtr_L.style('background-color', blue)
          _this.mtr_R.style('background-color', white)
      } else { // 1
          _this.mtr_L.style('background-color', white)
          _this.mtr_R.style('background-color', blue)
      }
  }

  function constructPanel(){
    console.log(this.elt.innerHTML) //caller gallery btn

    if(this.elt.innerHTML == "Flower"){
      console.log("flower left panel construction")
      button_OpenClose()
    } else if(this.elt.innerHTML == "Flapping"){
      console.log("Wings left panel construction")
      button_Wings()
    }
  }

  this.findDrawingFunc = function(){
    return _this.mySavedSketch
  }
  //this is for saving module data which will be available in my sketch
  function saveDesign(){

    var temp = {  //this is common for all modules
      A: _this.A_slider.value()
      ,B: _this.B_slider.value()
      ,C: _this.C_slider.value()
      ,D: _this.D_slider.value()
      ,E: _this.E_slider.value()
      ,gearSize:   _this.currentGearSize //number 1~4
      ,servoAngle: _this.currentServoAngle //1:180, 2:cont
      ,mirroring:  _this.currentPairing// True/False
      ,linekedTo: 'none'
    }

    switch (_this.currentModule) { //module specific informaion
      case 1: //OpenClose
        temp.module     = 1
        break;
      case 3: //Flapping
        temp.module = 3 // <-- this is for user to see from mysketch
        temp.F = _this.F_slider.value()
        temp.X = _this.X_slider.value()
        temp.Y = _this.Y_slider.value()

        temp.driveGear  = _this.currentDrivingGear
        break;
      case 5: //Walking
      console.log("walking should be saved")
        temp.module = 5
        temp.F = _this.F_slider.value()
        temp.G = _this.G_slider.value()
        break;
      default:
      } // end of switch - case

      _this.mySavedSketch.push(temp)

      if(temp.module != 0){
        _this.selectParent.forEach(function(sel){
           if(temp.module == 5) //walking cannot be linked to any
             return
          var ii = _this.mySavedSketch.length-1
          sel.option('Module '+ ii)
        });
      }
  }

  this.initUI = function(){ //initializer

    //GRAY & BLACK background for LEFT PANEL
    noStroke()
    fill(_this.bgcolor2)
    rect(0,0,270,_this.temp_windowHeight)
    fill(0)
    rect(0,575,270,125)
    rect(0,0,270,35)
    //checkbox
    fill(255)
    rect(20,35,230,150)

  } // end of function initUI()

  this.initUI_net = function(){ //initializer
    //GRAY & BLACK background for LEFT PANEL
    noStroke()
    fill(_this.bgcolor2)
    rect(0,550,270,_this.temp_windowHeight-550)
    fill(0)
    rect(0,515,270,35)

  } // end of function initUI()

  this.button_front = function(){

    this.mtr180.hide()
    this.mtr360.hide()
    this.Btn_reset.hide()
    this.Btn_pdf.hide()
    this.Btn_plt.hide()
    this.Btn_net.hide()
    this.Btn_back.hide()
    this.Btn_my.hide()
    this.Btn_home.hide()
    this.mtr_L.hide()
    this.mtr_R.hide()
    this.size_1.hide()
    this.size_2.hide()
    this.size_3.hide()
    this.size_4.hide()
    this.Mech_show.hide()
    this.Mech_hide.hide()
    this.mirr_apply.hide()
    this.mirr_cancel.hide()
    this.new_apply.hide()

    this.A_slider.hide()
    this.B_slider.hide()
    this.C_slider.hide()
    this.D_slider.hide()
    this.E_slider.hide()
    this.F_slider.hide()
    this.G_slider.hide()

    this.X_slider.hide()
    this.Y_slider.hide()

    this.selectParent.forEach(function(entity){
      entity.hide()
    });
    this.btn180.forEach(function(entity){
      entity.hide()
    });
    this.btnContd.forEach(function(entity){
      entity.hide()
    });
    this.myBtnList.forEach(function(btn){
      btn.hide()
    });

    this.currentModule = 0

  }// end of function btn_front

  this.button_OpenClose = function(){

    _this.mirr_apply.show().position(138,315)
    _this.mirr_cancel.show().position(190,315)

    _this.size_1.show().position(115,375)
    _this.size_2.show().position(150,375)
    _this.size_3.show().position(185,375)
    _this.size_4.show().position(220,375)

    _this.mtr180.show().position(50, 430)
    _this.mtr360.show().position(140, 430)

    _this.Btn_reset.show().size(150,20).position(60,495)
    _this.Btn_plt.show().size(150,20).position(60,520)
    _this.Btn_net.show().size(150,20).position(60,545)
    _this.Btn_my.show().size(150,20).position(60,590)
    _this.Btn_home.show().size(150,20).position(60,615)

    _this.mtr_L.hide()
    _this.mtr_R.hide()
    _this.Btn_pdf.hide()
    _this.Btn_back.hide()
    _this.new_apply.hide()

    _this.F_slider.hide()
    _this.G_slider.hide()
    _this.X_slider.hide()
    _this.Y_slider.hide()

    OpenClose()
    _this.currentModule = 1
}// end of function btn_openClose()

  this.button_Wings = function(){

    if(_this.currentPairing == 0){ // cancel pairing
      _this.mirr_apply.show().position(138,315).style("background-color",white)
      _this.mirr_cancel.show().position(190,315).style("background-color",blue)

      _this.mtr_L.hide()
      _this.mtr_R.hide()

    }else if(_this.currentPairing == 1){  // paired!
      _this.mirr_apply.show().position(138,315).style("background-color",blue)
      _this.mirr_cancel.show().position(190,315).style("background-color",white)

      text("Driver Gear :", 20, 360)

      _this.mtr_L.show().position(150, 345)
      _this.mtr_R.show().position(200, 345)
    }

    _this.size_1.show().position(115,375)
    _this.size_2.show().position(150,375)
    _this.size_3.show().position(185,375)
    _this.size_4.show().position(220,375)

    _this.mtr180.show().position(50, 430)//.style("background-color",blue)
    _this.mtr360.show().position(140, 430)//.style("background-color",white)

    _this.Btn_reset.show().size(150,20).position(60,495)
    _this.Btn_plt.show().size(150,20).position(60,520)
    _this.Btn_net.show().size(150,20).position(60,545)
    _this.Btn_my.show().size(150,20).position(60,590)
    _this.Btn_home.show().size(150,20).position(60,615)

    _this.Btn_pdf.hide()
    _this.Btn_back.hide()
    _this.new_apply.hide()

    Wings()
    _this.currentModule = 3
}

this.button_walk = function(num_leg){
  _this.mirr_apply.show().position(138,315)
  _this.mirr_cancel.show().position(190,315)

  if(num_leg<3){
    _this.new_apply.show().position(138,345).style("background-color",white)

  }else{
    _this.new_apply.hide()
    console.log("****")

  }
  fill(0)
  text("Add New :", 20, 360)

  _this.size_1.show().position(115,375)
  _this.size_2.show().position(150,375)
  _this.size_3.show().position(185,375)
  _this.size_4.show().position(220,375)

  _this.Btn_reset.show().size(150,20).position(60,495)
  _this.Btn_plt.show().size(150,20).position(60,520)
  _this.Btn_net.show().size(150,20).position(60,545)
  _this.Btn_my.show().size(150,20).position(60,590)
  _this.Btn_home.show().size(150,20).position(60,615)

  _this.Btn_pdf.hide()
  _this.Btn_back.hide()

  _this.currentModule = 5
}

function button_folding_net(){

  _this.size_1.hide() //bind to same function
  _this.size_2.hide()
  _this.size_3.hide()
  _this.size_4.hide()
  _this.mtr180.hide()
  _this.mtr360.hide()
  _this.mtr_L.hide()
  _this.mtr_R.hide()
  _this.Btn_reset.hide()
  _this.Btn_plt.hide()
  _this.Btn_net.hide()
  _this.A_slider.hide()
  _this.B_slider.hide()
  _this.C_slider.hide()
  _this.D_slider.hide()
  _this.E_slider.hide()
  _this.F_slider.hide()
  _this.G_slider.hide()
  _this.mirr_apply.hide()
  _this.mirr_cancel.hide()
  _this.new_apply.hide()

  _this.Btn_pdf.show().size(150,20).position(60,565)
  _this.Btn_back.show().size(150,20).position(60,590)
}

this.callButton_MY = function(){
  button_My()
}
function button_My(){

  _this.Btn_net.show().size(150,20).position(60,590)
  _this.Btn_home.show().size(150,20).position(60,615)

  //button creation - show is called every moment - might be overflowing
  var index = 0

    _this.mirr_apply.hide()
    _this.mirr_cancel.hide()
    _this.new_apply.hide()
    _this.mtr180.hide()
    _this.mtr360.hide()
    _this.mtr_L.hide()
    _this.mtr_R.hide()
    _this.Btn_reset.hide()
    _this.Btn_pdf.hide()
    _this.Btn_plt.hide()
    _this.Btn_back.hide()
    _this.Btn_my.hide()
    _this.size_1.hide()
    _this.size_2.hide()
    _this.size_3.hide()
    _this.size_4.hide()

    _this.A_slider.hide()
    _this.B_slider.hide()
    _this.C_slider.hide()
    _this.D_slider.hide()
    _this.E_slider.hide()
    _this.F_slider.hide()
    _this.G_slider.hide()

    _this.X_slider.hide()
    _this.Y_slider.hide()

    _this.currentModule = 9
  }

  //*********** UI Panel texts
  this.putText_OpenClose = function(){

    noStroke()
    fill(255)
    text("OPENING & CLOSING", 60, 25)
    fill(0)
    text("A", 25, 230)
    text("B", 145, 230)
    text("C", 25, 265)
    text("D", 145, 265)
    text("E", 25, 300)
    text("F", 145, 300)
    text("Model Mirroring :", 20, 330)
    text("Gear Size :", 20, 390)
    text("Motor Rotation Angle :", 20, 420)

  }

  this.putText_OpenClose_net = function(){

    fill(255)
    text("FOLDING NET  :  OPEN & CLOSE", 22, 540)

  }

  this.putText_Wings = function(UI_wing){
    _this.UI_mode = UI_wing

    noStroke()
    fill(255)
    text("FLAPPING", 100, 25)
    fill(0)
    text("Model Mirroring :", 20, 330)
    text("Driver Gear :", 20, 360)
    text("Gear Size :", 20, 390)
    text("Motor Rotation Angle :", 20, 420)

    if(_this.UI_mode == 1){
      text("A", 25, 230)
      text("B", 145, 230)
      text("C", 25, 265)
      text("D", 145, 265)
      text("E", 25, 300)
      text("F", 145, 300)
    } else if(_this.UI_mode == 2) {
      text("X", 25, 230)
      text("Y", 145, 230)
    }
  //  button_Wings()
  }


  this.putText_Flapping_net = function(){

    fill(255)
    text("FOLDING NET  :  FLAPPING", 37, 540)
  }

  this.putText_walk = function(){
    _this.UI_mode_walk = UI_walk

    noStroke()
    fill(255)
    text("WALKING", 103, 25)
    fill(0)
    text("Model Pairing :", 20, 330)
//    text("A New Pair :", 20, 360)
    text("Gear Size :", 20, 390)

    if(_this.UI_mode_walk == 1){
      text("A", 25, 230)
      text("B", 145, 230)
      text("C", 25, 265)
      text("D", 145, 265)
      text("E", 25, 300)
      text("F", 145, 300)
    }else if(_this.UI_mode_walk == 2){
      text("G", 25, 230)
    }
  }

  this.putText_My = function(){
    //this: caller button, _this: UI
    fill(_this.bgcolor2)
    rect(0,35,270, _this.temp_windowHeight-160)
    noStroke()
    fill(255)
    text("MY SKETCHBOOK", 70, 25)
    //button_My()
  }

  this.Front = function(){
    background(bgcolor2)
    noStroke()
    fill(0)
    textSize(28)
    text("FoldMecha",550,70)
    textSize(15)
    text("design your own mechanical movement and download the folding net to bulid",360,100)
    //button_front()
  }

/*   from here:   slider section */
  this.UI_OpenClose_init = function(){
      // set default values
    }
  this.UI_Wings_init = function(){
      // set default values
    }

  function OpenClose(){

    _this.A_slider.show()
    _this.B_slider.show()
    _this.C_slider.show()
    _this.D_slider.show()
    _this.E_slider.show()

    var moduleObj = [{}] //empty json

      moduleObj.A = _this.A_slider.value()
      moduleObj.B = _this.B_slider.value()
      moduleObj.C = _this.C_slider.value()
      moduleObj.D = _this.D_slider.value()
      moduleObj.E = _this.E_slider.value()

      moduleObj.mirroring = _this.currentPairing
      moduleObj.gearSize  = _this.currentGearSize
      moduleObj.servoAngle= _this.currentServoAngle

      stdSliderValue.openclose = moduleObj
      //console.log(stdSliderValue.openclose)
    // }

    _this.A_slider.changed(_this.sliderAUpdate)
    _this.B_slider.changed(_this.sliderBUpdate)
    _this.C_slider.changed(_this.sliderCUpdate)
    _this.D_slider.changed(_this.sliderDUpdate)
    _this.E_slider.changed(_this.sliderEUpdate)

    //console.log("current Module #:", _this.currentModule)
  }

  function Wings(){
    var moduleObj = [{}] //empty json for wing

    if(_this.UI_mode == 1){

      _this.A_slider.show()
      _this.B_slider.show()
      _this.C_slider.show()
      _this.D_slider.show()
      _this.E_slider.show()
      _this.F_slider.show()

      _this.X_slider.hide()
      _this.Y_slider.hide()

    } else if(_this.UI_mode == 2){

      _this.A_slider.hide()
      _this.B_slider.hide()
      _this.C_slider.hide()
      _this.D_slider.hide()
      _this.E_slider.hide()
      _this.F_slider.hide()
      _this.G_slider.hide()

      _this.X_slider.show()
      _this.Y_slider.show()
    }

     //save current slider information into empty json
      //for the first time, have to create json obj
      moduleObj.A = _this.A_slider.value()
      moduleObj.B = _this.B_slider.value()
      moduleObj.C = _this.C_slider.value()
      moduleObj.D = _this.D_slider.value()
      moduleObj.E = _this.E_slider.value()
      moduleObj.F = _this.F_slider.value()
      moduleObj.G = _this.G_slider.value()

      moduleObj.X = _this.X_slider.value()
      moduleObj.Y = _this.Y_slider.value()

      moduleObj.mirring = _this.currentPairing
      moduleObj.gearSize = _this.currentGearSize
      moduleObj.servoAngle = _this.currentServoAngle
      moduleObj.drivingGear = _this.currentDrivingGear

      stdSliderValue.wings = moduleObj
      //console.log(stdSliderValue.wings)

    _this.A_slider.changed(_this.sliderAUpdate) //calling several times since it is adjusted by system
    _this.B_slider.changed(_this.sliderBUpdate) //how to differetiate user change vs. system update?
    _this.C_slider.changed(_this.sliderCUpdate)
    _this.D_slider.changed(_this.sliderDUpdate)
    _this.E_slider.changed(_this.sliderEUpdate)
    _this.F_slider.changed(_this.sliderFUpdate)
    _this.G_slider.changed(_this.sliderGUpdate)

    _this.X_slider.changed(_this.sliderXUpdate)
    _this.Y_slider.changed(_this.sliderYUpdate)

    //console.log("current Module #:", _this.currentModule)
  }

  /* from here: flower sliders */
  this.calcSliderPos2 = function(min, max, value) { // Open & Close
    return map(value,0,250,min,max) //
  }

  this.sliderAUpdate = function() {

    //update slider min/max range in common
      Bird1.setA(_this.A_slider.value())
      _this.A_slider.attribute('min', Bird1.dist_aMin)
                    .attribute('max', Bird1.dist_aMax)

      switch (_this.currentModule) {
        case 1: // OpenClose Flower

          //we assume this is only possible when there is already json obj created
          _this.A_slider.attribute('value', _this.calcSliderPos2(Bird1.dist_aMin, Bird1.dist_aMax, Bird1.getA()))
          stdSliderValue.openclose.A = _this.A_slider.value()
          break
        case 3: // Flagppig Bird
          _this.A_slider.attribute('value', _this.calcSliderPos3(Bird1.dist_aMin, Bird1.dist_aMax, Bird1.getA()))
          stdSliderValue.wings.A = _this.A_slider.value()
          break

        default:
      }
  }

  this.sliderBUpdate = function() {
    Bird1.setB(_this.B_slider.value())
    _this.B_slider.attribute('min', Bird1.dist_bMin)
                  .attribute('max', Bird1.dist_bMax)

    switch (_this.currentModule) {
      case 1: // OpenClose Flower
        _this.B_slider.attribute('value', _this.calcSliderPos2(Bird1.dist_bMin, Bird1.dist_bMax, Bird1.getB()))
        stdSliderValue.openclose.B = _this.B_slider.value()
        break
      case 3: // Flagppig Bird
        _this.B_slider.attribute('value', _this.calcSliderPos3(Bird1.dist_bMin, Bird1.dist_bMax, Bird1.getB()))
        stdSliderValue.wings.B = _this.B_slider.value()
        break

      default:
    }
  }

  this.sliderCUpdate = function() {
    Bird1.setC(_this.C_slider.value())
    _this.C_slider.attribute('min', Bird1.dist_cMin)
                  .attribute('max', Bird1.dist_cMax)

    switch (_this.currentModule) {
      case 1: // OpenClose Flower
        _this.C_slider.attribute('value', _this.calcSliderPos2(Bird1.dist_cMin, Bird1.dist_cMax, Bird1.getC()))
        stdSliderValue.openclose.C = _this.C_slider.value()
        break
      case 3: // Flagppig Bird
        _this.C_slider.attribute('value', _this.calcSliderPos3(Bird1.dist_cMin, Bird1.dist_cMax, Bird1.getC()))
        stdSliderValue.wings.C = _this.C_slider.value()
        break

      default:
    }
  }

  this.sliderDUpdate = function() {
    Bird1.setD(_this.D_slider.value())
    _this.D_slider.attribute('min', Bird1.dist_dMin)
                  .attribute('max', Bird1.dist_dMax)

    switch (_this.currentModule) {
      case 1: // OpenClose Flower
        _this.D_slider.attribute('value', _this.calcSliderPos2(Bird1.dist_dMin, Bird1.dist_dMax, Bird1.getD()))
        stdSliderValue.openclose.D = _this.D_slider.value()
        break
      case 3: // Flagppig Bird
        _this.D_slider.attribute('value', _this.calcSliderPos3(Bird1.dist_dMin, Bird1.dist_dMax, Bird1.getD()))
        stdSliderValue.wings.D = _this.D_slider.value()
        break
      default:
    }
  }

  this.sliderEUpdate = function() {
    Bird1.setE(_this.E_slider.value())
    _this.E_slider.attribute('min', Bird1.dist_eMin)
                  .attribute('max', Bird1.dist_eMax)
    switch (_this.currentModule) {
      case 1: // OpenClose Flower
        _this.E_slider.attribute('value', _this.calcSliderPos3(Bird1.dist_eMin, Bird1.dist_eMax, Bird1.getE()))
        stdSliderValue.openclose.E = _this.E_slider.value()
        break
      case 3: // Flagppig Bird
        _this.E_slider.attribute('value', _this.calcSliderPos3(Bird1.dist_eMin, Bird1.dist_eMax, Bird1.getE()))
        stdSliderValue.wings.E = _this.E_slider.value()
        break
      default:
    }
  }

  this.sliderFUpdate = function() {
    // no switch case cuz OP module doesn't have slider F --> might not true now...
    Bird1.setF(_this.F_slider.value())

    _this.F_slider.attribute('min', Bird1.dist_fMin)
                  .attribute('max', Bird1.dist_fMax)
                  .attribute('value', _this.calcSliderPos3(Bird1.dist_fMin, Bird1.dist_fMax, Bird1.getF()))
    stdSliderValue.wings.F = _this.F_slider.value()
  }

  this.sliderGUpdate = function() {
    // no switch case cuz other module doesn't have slider G

  }

  this.sliderXUpdate = function() {
    Bird1.setX(_this.X_slider.value())
    stdSliderValue.wings.X = _this.X_slider.value()
  }

  this.sliderYUpdate = function() {
    Bird1.setY(_this.Y_slider.value())
    stdSliderValue.wings.Y = _this.Y_slider.value()
  }

  /* from here: wing sliders */
  this.calcSliderPos3 = function(min, max, value) { // Wings
    return map(value,0,400,min,max)
  }


  this.mySketch_ModuleText = function(entity, index){

    if(_this.linked){
      console.log("drawing ", index, "th linked module: ", entity)
      console.log(entity.module, entity.linkedFrom, entity.linkedTo)

      _this.selectParent.forEach(function(entity){
        entity.hide()
      });

      //and then redraw for linked module
        var title = ''
            ,y    = 85 + (index-1)*160

        if((entity.linkedFrom != undefined) && (entity.linkedTo == undefined)){ //either parent or no linker

          fill(50)
          rect(0,y-50, 270,30) //(x,y,width,height)
          fill(255)

          fill(0)
          text("Position: ",  25, y)
          text("Scale: ",     25, y+30)
          text("Rotation: ",  25, y+60)
          text("Link: ",    25, y+90) //walker does not need this

          //informations - should be flexible by saved info
          text("XX YY",       100, y) //position
          text("100",         100, y+30) //scale
          text("360",         100, y+60) //rotate

          // if(entity.linkedTo == undefined) {//sth is linked as parent

            //module specific interface
            if(entity.module == 1){
              title = "Flapping "
            }
            if(entity.module == 3){
              title = "Flying "
            } // no entity.modue == 5, since walker can't be linked

            if(entity.linkedFrom == 1){
              title += " && Flapping"
            }
            if(entity.linkedFrom == 3){
              title += " && Flying"
            }

            fill(255)
            text("Module "+ index + ": "+ title, 25, y-30) //index should be done in different way

          }

          if ((entity.linkedFrom == undefined) && (entity.linkedTo == undefined)) { //entity.linkedFrom != undefined && linkedTo != undefined, this is child
            //should draw as usuall

            fill(50)
            rect(0,y-50, 270,30) //(x,y,width,height)
            fill(255)

            fill(0)
            text("Position: ",  25, y)
            text("Scale: ",     25, y+30)
            text("Rotation: ",  25, y+60)
            text("Link: ",    25, y+90) //walker does not need this

            //informations - should be flexible by saved info
            text("XX YY",       100, y) //position
            text("100",         100, y+30) //scale
            text("360",         100, y+60) //rotate

            //module specific interface
            if(entity.module == 1){
              title = "Flapping"
            }
            if(entity.module == 3){
              title = "Flying"
            }
            if(entity.module == 5){
              title = "Walking"
            }
            fill(255)
            text("Module "+ index + ": "+ title, 25, y-30) //index should be done in different way

          //}
        }
        if((entity.linkedFrom == undefined) && (entity.linkedTo != undefined)) { //entity.linkedFrom == undefined
          //linked as child, should have been drawn above by parent
            return
        }
      //}); //end of if (this.linked == true)

    } else { // if all modules are individual (this.linked == false)
      if(index < 2) //override empty default obejct (index == 0)
        var y = 85
      else
        var y = 85 + (index-1)*160

      var title = ''
      fill(50)
      rect(0,y-50, 270,30) //(x,y,width,height)
      fill(255)

      fill(0)
      text("Position: ",  25, y)
      text("Scale: ",     25, y+30)
      text("Rotation: ",  25, y+60)
      text("Link: ",    25, y+90) //walker does not need this

      //informations - should be flexible by saved info
      text("XX YY",       100, y) //position
      text("100",         100, y+30) //scale
      text("360",         100, y+60) //rotate

      //toggle button hide/show or delete
      // _this.btnDelete.show()

      //module specific interface
      if(entity.module == 1){
        // _this.selectParent[index].remove(_this.selectParent[index].index)
        _this.selectParent[index].changed(mySelectedEvent)
                          .position(100, y+75).show()
        title = "Flapping"
      }
      if(entity.module == 3){
        // _this.selectParent[index].remove(_this.selectParent[index].index)
        _this.selectParent[index].changed(mySelectedEvent)
                          .position(100, y+75).show()
        title = "Flying"
      }
      if(entity.module == 5){
        title = "Walking"
      }

      fill(255)
      text("Module "+ index + ": "+ title, 25, y-30)
    }
  }

  function mySelectedEvent(){ //anonymous function to deal with selection event

    // this.elt.id: caller selector(link from)
    // this.elt.value: selected option value from that selector (linked to)
    var caller = this.elt.id
    var callee = this.elt.value.slice(-1) //"module3" etc. get the last character - linked module

    console.log("linked from: ", caller, " linked to: ", callee)
    _this.mySavedSketch[caller].linkedTo = callee //etc. caller(later) is linked to option
    _this.mySavedSketch[callee].linkedFrom = caller //caller, linked each other

    // console.log(mySavedSketch[caller].linkedTo)
    // console.log(mySavedSketch[callee].linkedFrom)

    _this.linked = true //-->> if delete is called, this should be revoked again
  }
}
