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
  this.mySavedSketch = [{}]

  this.currentGearSize     = 2 //default
  this.currentServoAngle   = 180 // 180 or 360
  this.currentDrivingGear  = 0 // 0:left, 1:right
  this.currentPairing      = 1

  this.master = 0 //linked module as parent
  this.slave  = 0

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

//maybe we can integrate all slider events into one function as well..
  this.A_slider = createSlider(0, 400, 60).size(100).position(20, 200).changed(sliderAUpdate)
  this.B_slider = createSlider(0, 400, 240).size(100).position(140, 200).changed(sliderBUpdate)
  this.C_slider = createSlider(0, 400, 50).size(100).position(20, 235).changed(sliderCUpdate)
  this.D_slider = createSlider(0, 400, 150).size(100).position(140, 235).changed(sliderDUpdate)
  this.E_slider = createSlider(0, 400, 250).size(100).position(20, 270).changed(sliderEUpdate)
  this.F_slider = createSlider(0, 400, 150).size(100).position(140,270).changed(sliderFUpdate)
  this.G_slider = createSlider(0, 400, 150).size(100).position(140,270).changed(sliderGUpdate)

  this.X_slider = createSlider(0, 200, 20).size(100).position(20, 200).changed(sliderXUpdate)
  this.Y_slider = createSlider(0, 200, 40).size(100).position(140,200).changed(sliderYUpdate)

  this.selectParent = [] //array
  // this.sliderRotation = [] //= createSlider(0, 360, 0).hide()
  this.btnPlus      = []
  this.btnMinus     = []
  this.btnRotateCW  = []
  this.btnRotateCCW = []
  this.btnFlip      = []
  this.btnDelete    = []

  // for individual module
  for(var i=0; i<5; i++){ //up to # of saved models or saving limit (now 4)
    var sel = createSelect().hide()
    sel.attribute('id', i)
       .option('None') //default

    // var rotationRange = createSlider(0,360,0).hide()
    //                                           .attribute('id',i)
    //                                           .changed(rotationUpdated)
    var btnDel        = createButton('Delete').hide()
                                              .attribute('id', 'del'+i)
                                              .mousePressed(deleteModule)
       ,btnP          = createButton('+').hide()
                                         .attribute('id', 'plus'+i)
                                         .mousePressed(scaleUpdate)
       ,btnM          = createButton('-').hide()
                                         .attribute('id', 'minus'+i)
                                         .mousePressed(scaleUpdate)
       ,btnRotCW      = createButton('CW').hide()
                                          .attribute('id', 'rotate'+i)
                                          .mousePressed(rotationUpdated)
       ,btnRotCCW    = createButton('CCW').hide()
                                           .attribute('id', 'rotate'+i+5)
                                           .mousePressed(rotationUpdated)
       ,btnFl        = createButton('Flip').hide()
                                            .attribute('id', 'flip'+i)
                                            .mousePressed(flipModule)
    this.selectParent.push(sel)
    // this.sliderRotation.push(rotationRange)
    this.btnPlus.push(btnP)
    this.btnMinus.push(btnM)
    this.btnRotateCW.push(btnRotCW)
    this.btnRotateCCW.push(btnRotCCW)
    this.btnFlip.push(btnFl)
    this.btnDelete.push(btnDel)
  }

  // for linked module
  this.linked         = false
  //this.selectLinked   = [] //for what??
  this.btnEnlarge     = createButton('+').hide().mousePressed(scaleUpdate)
  this.btnEnsmall     = createButton('-').hide().mousePressed(scaleUpdate)
  this.selectDriver   = createSelect().hide()
  this.selectDirection= createSelect().hide().changed(mySelectedLinkDirection)
  this.cancelLink     = createButton('Cancel This Link').hide().mousePressed(toggleLinking) //this maybe array for further linking

  this.selectDirection.attribute('id',0).option('Right')
  this.selectDirection.attribute('id',1).option('Left')
  this.selectDirection.attribute('id',2).option('Up')
  this.selectDirection.attribute('id',3).option('Down')
  this.selectDirection.attribute('id',4).option('Merge')

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
        _this.currentPairing      = 0

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
        _this.currentPairing      = 0
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
      if(stdSliderValue.walker == undefined){ //initial values

        _this.currentGearSize     = 2 //default
        _this.currentPairing      = 0 //fale

        highlightMirroring(0)
        highlightGearSize(2) // default gear size  = 2
      } else {
        //invoke saved json obj
        _this.A_slider.value(stdSliderValue.walker.A)
        _this.B_slider.value(stdSliderValue.walker.B)
        _this.C_slider.value(stdSliderValue.walker.C)
        _this.D_slider.value(stdSliderValue.walker.D)
        _this.E_slider.value(stdSliderValue.walker.E)
        _this.F_slider.value(stdSliderValue.walker.F)
        _this.G_slider.value(stdSliderValue.walker.G)

        highlightMirroring(stdSliderValue.walker.pair)
        highlightGearSize(stdSliderValue.walker.gearSize)
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

    this.selectParent.forEach(function(s){ s.hide() });
    // this.sliderRotation.forEach(function(s){ s.hide() });
    this.btnRotateCW.forEach(function(b){ b.hide() });
    this.btnDelete.forEach(function(b){ b.hide() });
    this.btnFlip.forEach(function(b){ b.hide() });
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

    Walker()
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
    _this.X_slider.hide()
    _this.Y_slider.hide()

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
} //EOF


  this.putText_Flapping_net = function(){

    fill(255)
    text("FOLDING NET  :  FLAPPING", 37, 540)
  } //EOF

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
  } //EOF

  this.putText_My = function(){
    //this: caller button, _this: UI
    fill(_this.bgcolor2)
    rect(0,35,270, _this.temp_windowHeight-160)
    noStroke()
    fill(255)
    text("MY SKETCHBOOK", 70, 25)
    //button_My()
  } //EOF

  this.Front = function(){
    background(bgcolor2)
    noStroke()
    fill(0)
    textSize(28)
    text("FoldMecha",550,70)
    textSize(15)
    text("design your own mechanical movement and download the folding net to bulid",360,100)
    //button_front()
  } //EOF

/*   from here:   slider section */
  this.UI_OpenClose_init = function(){
      // set default values
    }
  this.UI_Wings_init = function(){
      // set default values
    }
  this.UI_Waling_init = function(){
      // set default values
    }
  function OpenClose(){

    _this.A_slider.show()
    _this.B_slider.show()
    _this.C_slider.show()
    _this.D_slider.show()
    _this.E_slider.show()
    _this.F_slider.show()

    var moduleObj = [{}] //empty json

    moduleObj.A = _this.A_slider.value()
    moduleObj.B = _this.B_slider.value()
    moduleObj.C = _this.C_slider.value()
    moduleObj.D = _this.D_slider.value()
    moduleObj.E = _this.E_slider.value()
    moduleObj.F = _this.F_slider.value()

    moduleObj.mirroring = _this.currentPairing
    moduleObj.gearSize  = _this.currentGearSize
    moduleObj.servoAngle= _this.currentServoAngle

    stdSliderValue.openclose = moduleObj

  } //EOF

  function Wings(){
    var moduleObj = [{}] //empty json for wing

    if(_this.UI_mode == 1){

      _this.A_slider.show()
      _this.B_slider.show()
      _this.C_slider.show()
      _this.D_slider.show()
      _this.E_slider.show()
      _this.F_slider.show()

      _this.G_slider.hide()
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

    moduleObj.X = _this.X_slider.value()
    moduleObj.Y = _this.Y_slider.value()

    moduleObj.mirring = _this.currentPairing
    moduleObj.gearSize = _this.currentGearSize
    moduleObj.servoAngle = _this.currentServoAngle
    moduleObj.drivingGear = _this.currentDrivingGear

    stdSliderValue.wings = moduleObj
  }  //EOF

  function Walker(){
    var moduleObj = [{}] //empty json for wing

    if(_this.UI_mode == 1){

      _this.A_slider.show()
      _this.B_slider.show()
      _this.C_slider.show()
      _this.D_slider.show()
      _this.E_slider.show()
      _this.F_slider.show()

      _this.G_slider.hide()
      _this.X_slider.hide()
      _this.Y_slider.hide()

    } else if(_this.UI_mode == 2){

      _this.G_slider.show()

      _this.A_slider.hide()
      _this.B_slider.hide()
      _this.C_slider.hide()
      _this.D_slider.hide()
      _this.E_slider.hide()
      _this.F_slider.hide()

      _this.X_slider.hide()
      _this.Y_slider.hide()
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

    moduleObj.mirring = _this.currentPairing
    moduleObj.gearSize = _this.currentGearSize
    moduleObj.servoAngle = _this.currentServoAngle
    moduleObj.drivingGear = _this.currentDrivingGear

    stdSliderValue.walker = moduleObj
  } //EOF


  /* from here: flower sliders */
  this.calcSliderPos2 = function(min, max, value) { // Open & Close
    return map(value,0,250,min,max) //
  }

//how do Flower3 && Bird1 communicate with variables from sketch.js?
  function sliderAUpdate() {

      switch (_this.currentModule) {
        case 1: // OpenClose Flower
          Flower3.setA(_this.A_slider.value())
          //we assume this is only possible when there is already json obj created
          _this.A_slider.attribute('value', _this.calcSliderPos2(Flower3.dist_aMin, Flower3.dist_aMax, Flower3.getA()))
          stdSliderValue.openclose.A = _this.A_slider.value()
          break
        case 3: // Flagppig Bird
          Bird1.setA(_this.A_slider.value())
          // this will update b & c
          // then it has to update min/max b&c as well
          _this.A_slider.attribute('min', Bird1.dist_aMin)
                        .attribute('max', Bird1.dist_aMax)
                        .attribute('value', _this.calcSliderPos3(Bird1.dist_aMin, Bird1.dist_aMax, Bird1.getA()))

          stdSliderValue.wings.A = _this.A_slider.value()
          break
        case 5: // Walking Centipede
          //what is the slider value relationship?
          _this.A_slider.attribute('value', _this.calcSliderPos3(Walk1.dist_aMin, Bird1.dist_aMax, Bird1.getA()))
          stdSliderValue.walker.A = _this.A_slider.value()
          break
        default:
      }
      //where saved slider value saved to my saved design?
  }

  function sliderBUpdate() {

    switch (_this.currentModule) {
      case 1: // OpenClose Flower
        Flower3.setB(_this.B_slider.value())
        _this.B_slider.attribute('value', _this.calcSliderPos2(Flower3.dist_bMin, Flower3.dist_bMax, Flower3.getB()))
        stdSliderValue.openclose.B = _this.B_slider.value()
        break
      case 3: // Flagppig Bird
        Bird1.setB(_this.B_slider.value())
        _this.B_slider.attribute('min', Bird1.dist_bMin)
                      .attribute('max', Bird1.dist_bMax)
                      .attribute('value', _this.calcSliderPos3(Bird1.dist_bMin, Bird1.dist_bMax, Bird1.getB()))

        stdSliderValue.wings.B = _this.B_slider.value()
        break
      case 5: // Walking Centipede
        Walk1.setB(_this.B_slider.value())
        _this.B_slider.attribute('value', _this.calcSliderPos3(Walk1.dist_bMin, Bird1.dist_bMax, Bird1.getB()))
        stdSliderValue.walker.B = _this.B_slider.value()
        break
      default:
    }
  }

  function sliderCUpdate() {

    switch (_this.currentModule) {
      case 1: // OpenClose Flower
        Flower3.setC(_this.C_slider.value())
        _this.C_slider.attribute('value', _this.calcSliderPos2(Flower3.dist_cMin, Flower3.dist_cMax, Flower3.getC()))
        stdSliderValue.openclose.C = _this.C_slider.value()
        break
      case 3: // Flagppig Bird
        Bird1.setC(_this.C_slider.value())
        _this.C_slider.attribute('min', Bird1.dist_cMin)
                      .attribute('max', Bird1.dist_cMax)
                      .attribute('value', _this.calcSliderPos3(Bird1.dist_cMin, Bird1.dist_cMax, Bird1.getC()))

        stdSliderValue.wings.C = _this.C_slider.value()
        break
      case 5: // Walking Centipede
        Walk1.setC(_this.C_slider.value())
        _this.C_slider.attribute('value', _this.calcSliderPos3(Walk1.dist_cMin, Bird1.dist_cMax, Bird1.getC()))
        stdSliderValue.walker.C = _this.C_slider.value()
        break
      default:
    }
  }

  function sliderDUpdate() {

    switch (_this.currentModule) {
      case 1: // OpenClose Flower
        Flower3.setD(_this.D_slider.value())
        _this.D_slider.attribute('value', _this.calcSliderPos2(Flower3.dist_dMin, Flower3.dist_dMax, Flower3.getD()))
        stdSliderValue.openclose.D = _this.D_slider.value()
        break
      case 3: // Flagppig Bird
        Bird1.setD(_this.D_slider.value())
        _this.D_slider.attribute('min', Bird1.dist_dMin)
                      .attribute('max', Bird1.dist_dMax)
                      .attribute('value', _this.calcSliderPos3(Bird1.dist_dMin, Bird1.dist_dMax, Bird1.getD()))

        stdSliderValue.wings.D = _this.D_slider.value()
        break
      case 5: // Walking Centipede
        Walk1.setD(_this.D_slider.value())
        _this.D_slider.attribute('value', _this.calcSliderPos3(Walk1.dist_dMin, Bird1.dist_dMax, Bird1.getD()))
        stdSliderValue.walker.D = _this.D_slider.value()
        break
      default:
    }
  }

  function sliderEUpdate() {

    switch (_this.currentModule) {
      case 1: // OpenClose Flower
        Flower3.setE(_this.E_slider.value())
        _this.E_slider.attribute('value', _this.calcSliderPos3(Flower3.dist_eMin, Flower3.dist_eMax, Flower3.getE()))
        stdSliderValue.openclose.E = _this.E_slider.value()
        break
      case 3: // Flagppig Bird
        Bird1.setE(_this.E_slider.value())
        _this.E_slider.attribute('min', Bird1.dist_eMin)
                      .attribute('max', Bird1.dist_eMax)
                      .attribute('value', _this.calcSliderPos3(Bird1.dist_eMin, Bird1.dist_eMax, Bird1.getE()))
        stdSliderValue.wings.E = _this.E_slider.value()
        break
      case 5: // Walking Centipede
        Walk1.setE(_this.E_slider.value())
        _this.E_slider.attribute('value', _this.calcSliderPos3(Walk1.dist_eMin, Bird1.dist_eMax, Bird1.getE()))
        stdSliderValue.walker.E = _this.E_slider.value()
        break
      default:
    }
  }

  function sliderFUpdate() {

    switch (_this.currentModule) {
      case 1: // OpenClose Flower
        Flower3.setF(_this.F_slider.value())
        _this.F_slider.attribute('value', _this.calcSliderPos3(Flower3.dist_fMin, Flower3.dist_fMax, Flower3.getE()))
        stdSliderValue.openclose.F = _this.F_slider.value()
        break
      case 3: // Flagppig Bird
        Bird1.setF(_this.F_slider.value())
        _this.F_slider.attribute('min', Bird1.dist_fMin)
                      .attribute('max', Bird1.dist_fMax)
                      .attribute('value', _this.calcSliderPos3(Bird1.dist_fMin, Bird1.dist_fMax, Bird1.getF()))
        stdSliderValue.wings.F = _this.F_slider.value()
        break
      case 5: // Walking Centipede
        Walk1.setF(_this.F_slider.value())
        _this.F_slider.attribute('value', _this.calcSliderPos3(Walk1.dist_fMin, Bird1.dist_fMax, Bird1.getF()))
        stdSliderValue.walker.F = _this.F_slider.value()
        break
      default:
    }
  }

  function sliderGUpdate() {
    // no switch case cuz other module doesn't have slider G
    Walk1.setG(_this.G_slider.value())
    stdSliderValue.walker.G = _this.G_slider.value()

  }

  function sliderXUpdate () {
    Bird1.setX(_this.X_slider.value())
    stdSliderValue.wings.X = _this.X_slider.value()
  }

  function sliderYUpdate () {
    Bird1.setY(_this.Y_slider.value())
    stdSliderValue.wings.Y = _this.Y_slider.value()
  }

  /* from here: wing sliders */
  this.calcSliderPos3 = function(min, max, value) { // Wings
    return map(value,0,400,min,max)
  }


  this.mySketch_ModuleText = function(entity, index){

    if(_this.linked){
      //hide all unnecessary UI widgets
      _this.selectParent.forEach(function(s){ s.hide() });
      // _this.sliderRotation.forEach(function(s){ s.hide() });
      _this.btnDelete.forEach(function(b){ b.hide() });
      _this.btnPlus.forEach(function(b){ b.hide() });
      _this.btnMinus.forEach(function(b){ b.hide() });
      _this.btnRotateCW.forEach(function(b){ b.hide() });
      _this.btnRotateCCW.forEach(function(b){ b.hide() });
      _this.btnFlip.forEach(function(b){ b.hide() });

      //and then redraw for linked module
      var title = ''
          ,y    = 85 + (index-1)*160

      if(entity.linkedTo == undefined) { //either parent or no linker

        fill(50)
        rect(0,y-50, 270,30) //(x,y,width,height)
        fill(255)

        fill(0)
        text("Position: ", 25, y)
        text("Scale: ",    25, y+30)
        text("Rotation: ", 25, y+60)

        //informations - should be flexible by saved info
        text("XX YY",       100, y) //position
        text("100",         130, y+30) //scale
        _this.btnEnlarge.position(100, y+15).show() //let's save manually
        _this.btnEnsmall.position(160, y+15).show()
        text("360",         100, y+60) //rotate

        if (entity.linkedFrom != undefined){ //linked as parent
          //module specific interface
          if(entity.module == 1){
            title = "Flapping "
          } else if(entity.module == 3){
            title = "Flying "
          } // no entity.modue == 5, since walker can't be linked

          if(entity.linkedFrom == 1){
            title += " && Flapping"
          } else if(entity.linkedFrom == 3){
            title += " && Flying"
          }

          text("Driver",     25, y+90) //rotate
          fill(255)
          text("Module "+ index + ": "+ title, 25, y-30) //index should be done in different way

          _this.selectDriver.position(20, y+100).show()
          _this.selectDirection.position(150, y+100).show()
          _this.cancelLink.position(20, y+140).show()

        } else if(entity.linkedTo == undefined) { //entity.linkedFrom != undefined && linkedTo != undefined, this is child
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
          _this.btnDelete[index].position(170, y+100).show()

        }
      } else {  //linked as child, should have been drawn above by parent
        //if((entity.linkedFrom == undefined) && (entity.linkedTo != undefined)) { //entity.linkedFrom == undefined
          return
      }  //end of if (this.linked == true)

    } else { // if all modules are individual (this.linked == false)
      //clear all unrelated UI widgets
      this.selectDriver.hide()
      this.selectDirection.hide()
      this.cancelLink.hide()

      if(index < 2) //override empty default obejct (index == 0)
        var y = 85
      else
        var y = 85 + (index-1)*175

      var title = ''
      fill(50)
      rect(0,y-50, 270,30) //(x,y,width,height)
      fill(255)

      fill(0)
      text("Position: ",  25, y)
      text("Scale: ",     25, y+30)
      text("Rotation: ",  25, y+60)

      //informations - should be flexible by saved info
      text("XX YY",       100, y) //position
      text("100",         130, y+30) //scale
      _this.btnPlus[index].position(100, y+15).show()
      _this.btnMinus[index].position(160, y+15).show()

      // _this.sliderRotation[index].position(100, y+45).show()
      _this.btnRotateCW[index].position(100, y+45).show()
      _this.btnRotateCCW[index].position(150, y+45).show()
      _this.btnFlip[index].position(210, y+45).show()

      _this.btnDelete[index].position(170, y+100).show()

      //module specific interface
      if(entity.module == 1){
        //remove myself before to show selector
        // _this.selectParent[index].remove(_this.selectParent[index].index)
        var selectedParent = _this.selectParent[index];
        selectedParent.changed(mySelectedEvent)
                      .position(100, y+75)
                      .show();
        text("Link: ",     25, y+90) //walker does not need this

        title = "Flapping"
      } else if(entity.module == 3){
        // _this.selectParent[index].remove(_this.selectParent[index].index)
        var selectedParent = _this.selectParent[index];
        selectedParent.changed(mySelectedEvent)
                      .position(100, y+75)
                      .show();
        text("Link: ",      25, y+90) //walker does not need this

        title = "Flying"
      } else if(entity.module == 5){
        title = "Walking"
      } else {
        console.log("This should not happens")
      }

      fill(255)
      text("Module "+ index + ": "+ title, 25, y-30)
    }
  }

function deleteModule(){
  var id = this.elt.id.slice(-1) //event sending module element in arr
  delete _this.mySavedSketch[id] //remove from saved btn
}

//**************** event handlers for linking actio
  function mySelectedEvent(){ //anonymous function to deal with selection event

    // this.elt.id: caller selector(link from)
    // this.elt.value: selected option value from that selector (linked to)
    var caller = this.elt.id
    var callee = this.elt.value.slice(-1) //"module3" etc. get the last character - linked module

    //console.log("linked from: ", caller, " linked to: ", callee)
    _this.mySavedSketch[caller].linkedTo = callee //etc. caller(later) is linked to option
    _this.mySavedSketch[callee].linkedFrom = caller //caller, linked each other

    //match gear size and motorType
    _this.mySavedSketch[caller].servoAngle = _this.mySavedSketch[callee].servoAngle
    _this.mySavedSketch[caller].gearSize = _this.mySavedSketch[callee].gearSize

    //this is for same modules are attached
    if(_this.mySavedSketch[caller].module == _this.mySavedSketch[callee].module){
      _this.mySavedSketch[caller].x = 67 //this should be parents' gear size
      _this.mySavedSketch[caller].y = -47 //default is attach right, so only  need 'x' mvmt info

    //this is for wing -> flower
    } else if ((_this.mySavedSketch[caller].module == 3) && (_this.mySavedSketch[callee].module == 1)){
      _this.mySavedSketch[caller].x = 200
      _this.mySavedSketch[caller].y = 62

    } else if ((_this.mySavedSketch[caller].module == 1) && (_this.mySavedSketch[callee].module == 3)){
      _this.mySavedSketch[caller].x = 67
      _this.mySavedSketch[caller].y = -170
    }

    if(!_this.linked){
      _this.selectDriver.attribute('id', 0).option('Module '+callee +' to '+caller) //add each other
      _this.selectDriver.attribute('id', 1).option('Module '+caller+' to '+callee)
    }

    _this.master  = caller
    _this.slave   = callee
    _this.linked  = true //-->> if delete is called, this should be revoked again
  }

  function mySelectedLinkParent(){ //when two modules are linked
    //toggle linking parents and child
  }

  function mySelectedLinkDirection(){
    var direction = this.elt.value
        ,idM = _this.master //linking caller's index in save module array
        ,idS = _this.slave

        ,callerType = _this.mySavedSketch[idM].module
        ,angle      = _this.mySavedSketch[idS].rotation
    console.log('callerType: ', callerType)

    //this is when same gears of size2 attached
    if(_this.mySavedSketch[idM].module == _this.mySavedSketch[idS].module){
      if((angle == 180) || (angle == 360)){ //this is stupid now, but..
        if(direction == 'Right'){
          _this.mySavedSketch[idM].x = -36 //why not 0?
          _this.mySavedSketch[idM].y = 67

        } else if(direction == 'Left'){
          _this.mySavedSketch[idM].x = -167
          _this.mySavedSketch[idM].y = -50

        } else if(direction == 'Up'){
          _this.mySavedSketch[idM].x = -53 //why not 0??
          _this.mySavedSketch[idM].y = -167

        } else if(direction == 'Down'){
          _this.mySavedSketch[idM].x = 67
          _this.mySavedSketch[idM].y = -50 //why not 0??

        } else if(direction == 'Merge'){
          _this.mySavedSketch[idM].x = -50 //should be '0' to overlap gears
          _this.mySavedSketch[idM].y = -50

        } else {
          console.log("mySelectedLinkDirection(): this should not happen")
        }
      } else if ((angle == 90) || (angle == 270)) {
        if(direction == 'Right'){
            _this.mySavedSketch[idM].x = -53 //why not 0??
            _this.mySavedSketch[idM].y = -167
        } else if(direction == 'Left'){
            _this.mySavedSketch[idM].x = -36 //why not 0?
            _this.mySavedSketch[idM].y = 67
        } else if(direction == 'Up'){
            _this.mySavedSketch[idM].x = -167
            _this.mySavedSketch[idM].y = -50
        } else if(direction == 'Down'){
          _this.mySavedSketch[idM].x = 67
          _this.mySavedSketch[idM].y = -50 //why not 0??
        } else if(direction == 'Merge'){
          _this.mySavedSketch[idM].x = -34 //should be '0' to overlap gears
          _this.mySavedSketch[idM].y = -44

        } else {
          console.log("mySelectedLinkDirection(): this should not happen")
        }
      }
    } else if((_this.mySavedSketch[idS].module == 1) && (_this.mySavedSketch[idM].module == 3)){ //when wing is linked to flower
      if(direction == 'Right'){
        _this.mySavedSketch[idM].x = 200
        _this.mySavedSketch[idM].y = 62 //why not 0??

      } else if(direction == 'Left'){
        _this.mySavedSketch[idM].x = -167
        _this.mySavedSketch[idM].y = 62

      } else if(direction == 'Up'){
        _this.mySavedSketch[idM].x = -50 //why not 0??
        _this.mySavedSketch[idM].y = -50

      } else if(direction == 'Down'){
        _this.mySavedSketch[idM].x = -50 //why not 0?
        _this.mySavedSketch[idM].y = 190

      } else if(direction == 'Merge'){
        _this.mySavedSketch[idM].x = -50 //should be '0' to overlap gears
        _this.mySavedSketch[idM].y = 70
      }
    } else if((_this.mySavedSketch[idS].module == 3) && (_this.mySavedSketch[idM].module) == 1){ //when flower is linked to wing
      if(direction == 'Right'){
        _this.mySavedSketch[idM].x = 67
        _this.mySavedSketch[idM].y = -170 //why not 0??

      } else if(direction == 'Left'){
        _this.mySavedSketch[idM].x = -300
        _this.mySavedSketch[idM].y = -170

      } else if(direction == 'Up'){
        _this.mySavedSketch[idM].x = -50 //why not 0??
        _this.mySavedSketch[idM].y = -300

      } else if(direction == 'Down'){
        _this.mySavedSketch[idM].x = -50 //why not 0?
        _this.mySavedSketch[idM].y = -50

      } else if(direction == 'Merge'){
        _this.mySavedSketch[idM].x = -50 //should be '0' to overlap gears
        _this.mySavedSketch[idM].y = -150
      }
    }
  } //EOF

  function rotationUpdated(){ //rotation degree is updated by slider(or button)
    var sender = this.elt.id.slice(-1)
        ,value = _this.mySavedSketch[sender].rotation
    //     ,value = _this.sliderRotation[sender].value()

    if(value != undefined)
      _this.mySavedSketch[sender].rotation += 90
    else
      _this.mySavedSketch[sender].rotation = 90

    if (_this.mySavedSketch[sender].rotation > 360)
        _this.mySavedSketch[sender].rotation -= 360

    console.log("rotation value: ", _this.mySavedSketch[sender].rotation)
  }

  function flipModule() {
    var sender = this.elt.id.slice(-1)

    _this.mySavedSketch[sender].flip = true
    console.log("flip")
  }

  function scaleUpdate(){

  }
  function toggleLinking(){
    console.log("cancel link")
    _this.linked = false
    //revoke drawing positions of individual modules
    _this.mySavedSketch.forEach(function(m){
      delete m.x //this is checked by if (module.x != undefined) from sketch.js
      delete m.y
      delete m.rotation
    });
  }

}
