function UI(){

  this.done = false
  this.lengthGap = 10
  this.bgcolor2 = color(200)
  this.temp_windowHeight = 660
  this.UI_mode = 1 //default
  this.mode = 0 //default

  this.myBtnList = [] //button array for my sketch
  this.myBtnNames = []

  var _this = this
  var stdSliderValue = [{}] //sketch object to restore slider from/to different module
    ,mySavedSketch = [{}]
    ,currentModule = 0 // 1 OpenClose
                        // 3 Wings
                        // 9 MySketch
  this.currentGearSize     = 2 //default
  this.currentServoAngle   = 180 // 180 or 360
  this.currentDrivingGear  = 0 // 0:left, 1:right
  this.currentMirroring    = false
  this.currentParing       = 1

//  this.menu_OP  = createButton('OPEN & CLOSE')//.mousePressed(_this.button_OpenClose)
//  this.menu_W   = createButton('FLAPPING').mousePressed(button_Wings)
  // this.menu_My  = createButton('')
  //                 .attribute('src','assets/OpenClose.gif')//.mousePressed(button_My) // MY SKETCHBOOK

  this.pl_paring_toggle = createButton('Cancel').mousePressed(toggleParing)
  this.OP_mtr180 = createButton('180°').mousePressed(setServoAngle)
  this.OP_mtr360 = createButton('Continuous').mousePressed(setServoAngle)
  this.Mech_show = createButton ('Show Mechanism')
  this.Mech_hide = createButton ('Hide Mechanism')
  this.Btn_reset = createButton ('Reset all')
  this.Btn_pdf = createButton ('Download PDF')
  this.Btn_plt = createButton ('Save in My Palette').mousePressed(saveDesign)
  this.Btn_net = createButton ('View the Folding Net').mousePressed(button_folding_net)
  this.Btn_my = createButton ('Go to My Sketch').mousePressed(button_My)
  this.Btn_home = createButton ('Go to Home')//.mousePressed(_this.Front)
  this.mirr_apply = createButton('Apply').mousePressed(setMirroring)
  this.mirr_cancel = createButton('Cancel').mousePressed(setMirroring)
  this.BtnStatus_mtr_A = createButton('L').mousePressed(setDrivingGear)
  this.BtnStatus_mtr_B = createButton('R').mousePressed(setDrivingGear)

  this.size_1 = createButton('1').mousePressed(setGearSize) //bind to same function
  this.size_2 = createButton('2').mousePressed(setGearSize)
  this.size_3 = createButton('3').mousePressed(setGearSize)
  this.size_4 = createButton('4').mousePressed(setGearSize)

  this.A_slider = createSlider(0, 400, 60).size(100).position(20, 200)
  this.B_slider = createSlider(0, 400, 240).size(100).position(140, 200)
  this.C_slider = createSlider(0, 400, 50).size(100).position(20, 235)
  this.D_slider = createSlider(0, 400, 150).size(100).position(140, 235)
  this.E_slider = createSlider(0, 400, 250).size(100).position(20, 270)
  this.F_slider = createSlider(0, 400, 150).size(100).position(140,270)

  this.X_slider = createSlider(0, 200, 20).size(100).position(20, 200)
  this.Y_slider = createSlider(0, 200, 40).size(100).position(140,200)

  // individual button event functions
  // _this: this object, this : caller button element
  function toggleParing(){
    _this.currentParing = 1 - _this.currentParing //toggle btw true(1) - false(0)
    console.log("current paring status: ", _this.currentParing)

    if(!_this.currentParing) //if applied state
      _this.pl_paring_toggle.html('Apply')
    else
      _this.pl_paring_toggle.html('Cancel')

  }
  function setGearSize(){
    _this.currentGearSize = parseInt(this.elt.innerHTML)

    console.log(_this.currentGearSize)
  }

  function setServoAngle(){
    if(this.elt.innerHTML == "Continuous")
      _this.currentServoAngle = 360
    else
      _this.currentServoAngle = 180

    console.log(_this.currentServoAngle)
  }

  function setMirroring(){
    if(this.elt.innerHTML == "Apply")
      _this.currentMirroring = true
    else //Cancel
      _this.currentMirroring = false

    console.log(_this.currentMirroring)
  }

  function setDrivingGear(){
    if(this.elt.innerHTML == 'L')
      _this.currentDrivingGear = "LEFT"
    else // R
      _this.currentDrivingGear = "RIGHT"

    console.log(_this.currentDrivingGear)
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
    //return _this.mode
    return mySavedSketch
  }
  //this is for saving module data which will be available in my sketch
  function saveDesign(){

    console.log("saved Design function called")
    //this is common for all three modules. We will add only unique data per module
    var temp = {
      A: _this.A_slider.value()
      ,B: _this.B_slider.value()
      ,C: _this.C_slider.value()
      ,D: _this.D_slider.value()
      ,E: _this.E_slider.value()
    }

    switch (_this.currentModule) {
      case 1: //OpenClose
        temp.module     = 1
        temp.gearSize   = _this.currentGearSize //number 1~4
        temp.servoAngle = _this.currentServoAngle //1:180, 2:cont

        break;
      case 3: //Flapping
        temp.module = 3
        temp.F = _this.F_slider.value()
        temp.X = _this.X_slider.value()
        temp.Y = _this.Y_slider.value()

        temp.gearSize   = _this.currentGearSize //number 1~4
        temp.servoAngle = _this.currentServoAngle //1:180, 2:cont
        temp.mirroring  = _this.currentMirroring// True/False
        temp.driveGear  = _this.currentDrivingGear

        break;
      default:
      } // end of switch - case

      mySavedSketch.push(temp)
      console.log(mySavedSketch)
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

  this.button_front = function(){

//    this.menu_OP.size(200,200).position(250,150).show()
//    this.menu_W.size(200,200).position(500,150).show()
    //  this.menu_My.size(200,200).position(750,150)
    //              .attribute('style.opacity','0').show()

//    this.menu_OP.hide()
    this.pl_paring_toggle.hide()
    this.OP_mtr180.hide()
    this.OP_mtr360.hide()
    this.Btn_reset.hide()
    this.Btn_pdf.hide()
    this.Btn_plt.hide()
    this.Btn_net.hide()
    this.Btn_my.hide()
    this.Btn_home.hide()
    this.BtnStatus_mtr_A.hide()
    this.BtnStatus_mtr_B.hide()
    this.size_1.hide()
    this.size_2.hide()
    this.size_3.hide()
    this.size_4.hide()
    this.mirr_apply.hide()
    this.mirr_cancel.hide()
    this.Mech_show.hide()
    this.Mech_hide.hide()

    this.A_slider.hide()
    this.B_slider.hide()
    this.C_slider.hide()
    this.D_slider.hide()
    this.E_slider.hide()
    this.F_slider.hide()
    this.X_slider.hide()
    this.Y_slider.hide()

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

    _this.OP_mtr180.show().position(50, 430)
    _this.OP_mtr360.show().position(140, 430)

    _this.Btn_reset.show().size(150,20).position(60,495)
    _this.Btn_plt.show().size(150,20).position(60,520)
    _this.Btn_net.show().size(150,20).position(60,545)
    _this.Btn_my.show().size(150,20).position(60,590)
    _this.Btn_home.show().size(150,20).position(60,615)

    _this.BtnStatus_mtr_A.hide()
    _this.BtnStatus_mtr_B.hide()
    _this.pl_paring_toggle.hide()
    _this.Btn_pdf.hide()
  //  _this.menu_OP.hide()
  //  _this.menu_W.hide()
  //  _this.menu_My.hide()

    _this.F_slider.hide()
    _this.X_slider.hide()
    _this.Y_slider.hide()

    OpenClose()
    _this.currentModule = 1
}// end of function btn_openClose()

  this.button_Wings = function(){

    _this.mirr_apply.show().position(138,315)
    _this.mirr_cancel.show().position(190,315)

    _this.BtnStatus_mtr_A.show().position(150, 345)
    _this.BtnStatus_mtr_B.show().position(200, 345)

    _this.size_1.show().position(115,375)
    _this.size_2.show().position(150,375)
    _this.size_3.show().position(185,375)
    _this.size_4.show().position(220,375)

    _this.OP_mtr180.show().position(50, 430)
    _this.OP_mtr360.show().position(140, 430)

    _this.Btn_reset.show().size(150,20).position(60,495)
    _this.Btn_plt.show().size(150,20).position(60,520)
    _this.Btn_net.show().size(150,20).position(60,545)
    _this.Btn_my.show().size(150,20).position(60,590)
    _this.Btn_home.show().size(150,20).position(60,615)

    _this.pl_paring_toggle.hide()
    _this.Btn_pdf.hide()
  //  _this.menu_OP.hide()
  //  _this.menu_W.hide()
  //  _this.menu_My.hide()

    Wings()
    _this.currentModule = 3
}

function button_folding_net(){
  _this.pl_paring_toggle.hide()
  _this.OP_mtr180.hide()
  _this.OP_mtr360.hide()
  _this.BtnStatus_mtr_A.hide()
  _this.BtnStatus_mtr_B.hide()
//    _this.menu_OP.hide()
//    _this.menu_W.hide()
//    _this.menu_My.hide()
  _this.Btn_reset.hide()
  _this.Btn_plt.hide()
  _this.Btn_my.hide()
  _this.size_1.hide()
  _this.size_2.hide()
  _this.size_3.hide()
  _this.size_4.hide()
  _this.mirr_apply.hide()
  _this.mirr_cancel.hide()

  _this.A_slider.hide()
  _this.B_slider.hide()
  _this.C_slider.hide()
  _this.D_slider.hide()
  _this.E_slider.hide()
  _this.F_slider.hide()
  _this.X_slider.hide()
  _this.Y_slider.hide()

  _this.Btn_net.hide()
  _this.Btn_pdf.show().size(150,20).position(60,590)
}

this.callButton_MY = function(){
  button_My()
}
function button_My(){

  _this.Btn_net.show().size(150,20).position(60,590)
  _this.Btn_home.show().size(150,20).position(60,615)

  //button creation - show is called every moment - might be overflowing
  var index = 0
  // mySavedSketch.forEach(function(design){
  //   if(design.A != undefined){ //only when valid object
  //     var title = ""
  //
  //     if(design.module == 1){
  //       title = "Flower"
  //     } else if(design.module == 3){
  //       title = "Flapping"
  //     }
  //
  //     _this.myBtnNames[index] = design.module //saved kinds of btn module for later reference
  //
  //     //maybe creating button is not needed..
  //     _this.myBtnList[index++] = createButton(title).size(100,100)
  //                                     .position(100+150*index, 20)
  //                                     .mousePressed(constructPanel)
  //   }
  // }); //end of foreach(mySavedSketch)
  //
  // (_this.myBtnList).forEach(function(btn){
  //   btn.hide()//.mousePressed(button_My) //this must be binded to drawing each module?
  // });

    _this.pl_paring_toggle.hide()
    _this.OP_mtr180.hide()
    _this.OP_mtr360.hide()
    _this.BtnStatus_mtr_A.hide()
    _this.BtnStatus_mtr_B.hide()
//    _this.menu_OP.hide()
//    _this.menu_W.hide()
//    _this.menu_My.hide()
    _this.Btn_reset.hide()
    _this.Btn_pdf.hide()
    _this.Btn_plt.hide()
    _this.Btn_my.hide()
    _this.size_1.hide()
    _this.size_2.hide()
    _this.size_3.hide()
    _this.size_4.hide()
    _this.mirr_apply.hide()
    _this.mirr_cancel.hide()

    _this.A_slider.hide()
    _this.B_slider.hide()
    _this.C_slider.hide()
    _this.D_slider.hide()
    _this.E_slider.hide()
    _this.F_slider.hide()
    _this.X_slider.hide()
    _this.Y_slider.hide()

    _this.currentModule = 9
  }

  //*********** UI Panel texts
  this.putText_OpenClose = function(){

    noStroke()
    fill(255)
    text("OPEN & CLOSE", 80, 25)
    fill(0)
    text("A", 25, 230)
    text("B", 145, 230)
    text("C", 25, 265)
    text("D", 145, 265)
    text("E", 25, 300)
    text("Model Mirroring :", 20, 330)
    text("Gear Size :", 20, 390)
    text("Servo Rotation Angle :", 20, 420)

  }

  this.putText_OpenClose_net = function(){

    noStroke()
    fill(255)
    text("FOLDING NET  :  OPEN & CLOSE", 22, 25)
    fill(_this.bgcolor2)
    rect(0,35,270, _this.temp_windowHeight-160)
    fill(0)
    text("Assembly Instruction", 60, 55)

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
    text("Servo Rotation Angle :", 20, 420)

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

    noStroke()
    fill(255)
    text("FOLDING NET  :  FLAPPING", 37, 25)
    fill(_this.bgcolor2)
    rect(0,35,270, _this.temp_windowHeight-160)
    fill(0)
    text("Assembly Instruction", 60, 55)

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

    var sliderObj = [{}] //empty json

    if(stdSliderValue.openclose != undefined){ // have defined by opening this module at least once, so revert previous information

      _this.A_slider.value(stdSliderValue.openclose.A)
      _this.B_slider.value(stdSliderValue.openclose.B)
      _this.C_slider.value(stdSliderValue.openclose.C)
      _this.D_slider.value(stdSliderValue.openclose.D)
      _this.E_slider.value(stdSliderValue.openclose.E)

      //I don't think this is needed anymore if this is updated
      if( delete stdSliderValue.openclose)
        console.log('succeed')
    } else {
      //save current value to empty sliderObj
      sliderObj.A = _this.A_slider.value()
      sliderObj.B = _this.B_slider.value()
      sliderObj.C = _this.C_slider.value()
      sliderObj.D = _this.D_slider.value()
      sliderObj.E = _this.E_slider.value()

      stdSliderValue.openclose = sliderObj
      console.log(stdSliderValue.openclose)
    }

    _this.A_slider.changed(_this.sliderAUpdate)
    _this.B_slider.changed(_this.sliderBUpdate)
    _this.C_slider.changed(_this.sliderCUpdate)
    _this.D_slider.changed(_this.sliderDUpdate)
    _this.E_slider.changed(_this.sliderEUpdate)

    console.log("current Module #:", _this.currentModule)
  }

  function Wings(){
    var sliderObj = [{}] //empty json for wing

    if(_this.UI_mode == 1){
    //if(UI_mode == 1){
      _this.A_slider.show()
      _this.B_slider.show()
      _this.C_slider.show()
      _this.D_slider.show()
      _this.E_slider.show()
      _this.F_slider.show()

      _this.X_slider.hide()
      _this.Y_slider.hide()

    } else if(_this.UI_mode == 2){
    //} else if(UI_mode == 2){
    console.log("UI_mode was changed for X, Y", _this.UI_mode)
      _this.A_slider.hide()
      _this.B_slider.hide()
      _this.C_slider.hide()
      _this.D_slider.hide()
      _this.E_slider.hide()
      _this.F_slider.hide()

      _this.X_slider.show()
      _this.Y_slider.show()
    }

    if(stdSliderValue.wings != undefined){ // this module has been opened at least once, previous information is saved

      _this.A_slider.value(stdSliderValue.wings.A) //restore values from json obejct storage
      _this.B_slider.value(stdSliderValue.wings.B)
      _this.C_slider.value(stdSliderValue.wings.C)
      _this.D_slider.value(stdSliderValue.wings.D)
      _this.E_slider.value(stdSliderValue.wings.E)
      _this.F_slider.value(stdSliderValue.wings.F)

      _this.X_slider.value(stdSliderValue.wings.X)
      _this.Y_slider.value(stdSliderValue.wings.Y)

      delete stdSliderValue.wings
    } else {
      //save current slider information into empty json
      sliderObj.A = _this.A_slider.value()
      sliderObj.B = _this.B_slider.value()
      sliderObj.C = _this.C_slider.value()
      sliderObj.D = _this.D_slider.value()
      sliderObj.E = _this.E_slider.value()
      sliderObj.F = _this.F_slider.value()

      sliderObj.X = _this.X_slider.value()
      sliderObj.Y = _this.Y_slider.value()

      stdSliderValue.wings = sliderObj
      console.log(stdSliderValue.wings)
    }

    _this.A_slider.changed(_this.sliderAUpdate) //calling several times since it is adjusted by system
    _this.B_slider.changed(_this.sliderBUpdate) //how to differetiate user change vs. system update?
    _this.C_slider.changed(_this.sliderCUpdate)
    _this.D_slider.changed(_this.sliderDUpdate)
    _this.E_slider.changed(_this.sliderEUpdate)
    _this.F_slider.changed(_this.sliderFUpdate)

    _this.X_slider.changed(_this.sliderXUpdate)
    _this.Y_slider.changed(_this.sliderYUpdate)

    console.log("current Module #:", _this.currentModule)
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
          //_this.A_slider.attribute('value', _this.calcSliderPos2(Flower3.aMin, Flower3.aMax, Flower3.getA()))
          break
        case 3: // Flagppig Bird
          _this.A_slider.attribute('value', _this.calcSliderPos3(Bird1.dist_aMin, Bird1.dist_aMax, Bird1.getA()))
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
        //_this.B_slider.value(_this.calcSliderPos2(Flower3.bMin, Flower3.bMax, Flower3.getB()))
        break
      case 3: // Flagppig Bird
        _this.B_slider.attribute('value', _this.calcSliderPos3(Bird1.dist_bMin, Bird1.dist_bMax, Bird1.getB()))
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
        //_this.C_slider.value(_this.calcSliderPos2(Flower3.cMin, Flower3.cMax, Flower3.getC()))
        break
      case 3: // Flagppig Bird
        _this.C_slider.attribute('value', _this.calcSliderPos3(Bird1.dist_cMin, Bird1.dist_cMax, Bird1.getC()))
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
        //_this.D_slider.value(_this.calcSliderPos2(Flower3.dMin, Flower3.dMax, Flower3.getD()))
        break
      case 3: // Flagppig Bird
        _this.D_slider.attribute('value', _this.calcSliderPos3(Bird1.dist_dMin, Bird1.dist_dMax, Bird1.getD()))
        break
      default:
    }
  }

  this.sliderEUpdate = function() {
    Bird1.setE(_this.E_slider.value())
    switch (_this.currentModule) {
      case 1: // OpenClose Flower
        //_this.E_slider.value(_this.calcSliderPos2(Flower3.eMin, Flower3.eMax, Flower3.getE()))
        break
      case 3: // Flagppig Bird
        //_this.E_slider.value(_this.calcSliderPos3(Bird1.dist_eMin, Bird1.dist_eMax, Bird1.getE()))
        break
      default:
    }
  }

  this.sliderFUpdate = function() {
    // no switch case cuz OP module doesn't have slider F
    Bird1.setF(_this.F_slider.value())
  }

  this.sliderXUpdate = function() {
    Bird1.setX(_this.X_slider.value())
  }

  this.sliderYUpdate = function() {
    Bird1.setY(_this.Y_slider.value())
  }

  /* from here: wing sliders */
  this.calcSliderPos3 = function(min, max, value) { // Wings
    return map(value,0,400,min,max)
  }


  this.mySketch_ModuleText = function(module, index){
    var y = (index)*150

    if(module == 1){
      //left panel consist of flower
      fill(50)
      rect(0,y-50, 270,30) //(x,y,width,height)
      fill(255)
      text("Module"+index, 25, y-30)

      fill(0)
      text("Position: ",  25, y)
      text("Scale: ",     25, y+30)
      text("Rotation: ",  25, y+60)
      text("Parent: ",    25, y+90)
      text("Servo Rotation Angle: ", 25, y+120)

      //buttons
      //toggle button 180 or continuous
      // toggle button hide/show or delete
    }
    if(module == 3){
      //left paner consist of wing
      fill(50)
      rect(0,y-50, 270,30) //(x,y,width,height)
      fill(255)
      text("Module"+index, 25, y-30)
      
      fill(0)
      text("Position: ",  25, y)
      text("Scale: ",     25, y+30)
      text("Rotation: ",  25, y+60)
      text("Parent: ",    25, y+90)
    }
  }
}
