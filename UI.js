function UI(){

  this.done = false
  // this.UI_created = false
  // this.button_front_created = false
  // this.button_OP_created = false
  // this.button_Wings_created = false
  // this.button_Planetary_created = false
  // this.button_My_created = false
  this.lengthGap = 10
  this.bgcolor2 = color(200)
  this.temp_windowHeight = 660

  this.btn = [] //button array for my sketch
  var _this = this
  var stdSliderValue = [{}] //sketch object to restore slider from/to different module
    ,mySavedSketch = [{}]
    ,currentModule = 0 // 1 OpenClose
                        // 2 Bird
                        // 3 PlanetaryGear
  this.currentGearSize     = 2 //default
  this.currentServoAngle   = 1 // 1:180, 2:continue
  this.currentDrivingGear  = "LEFT"
  this.currentMirroring    = false
  this.currentParing       = 1

  this.menu_OP  = createButton('OPEN & CLOSE')
  this.menu_W   = createButton('FLAPPING')
  this.menu_P   = createButton('PLANETARY GEARS')
  this.menu_My  = createButton('MY SKETCHBOOK')

  this.pl_paring_toggle = createButton('Cancel').mousePressed(toggleParing)
  this.OP_mtr180 = createButton('180°').mousePressed(setServoAngle)
  this.OP_mtr360 = createButton('Continuous').mousePressed(setServoAngle)
  this.Mech_show = createButton ('Show Mechanism')
  this.Mech_hide = createButton ('Hide Mechanism')
  this.Btn_plt = createButton ('Save in My Palette').mousePressed(saveDesign)
  this.Btn_net = createButton ('View the Folding Net')
  this.Btn_my = createButton ('Go to My Sketch')//.mousePressed()
  this.Btn_home = createButton ('Go to Home')//.mousePressed()
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

  //individual button event functions
  //_this : this object
  //this : caller button element
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
      _this.currentServoAngle = 2
    else
      _this.currentServoAngle = 1

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

  //this is for saving module data which will be available in my sketch
  function saveDesign(){

    console.log("start to save data for module: ", _this.currentModule)

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
      case 2: //Flapping
        temp.module = 2
        temp.F = _this.F_slider.value()
        temp.X = _this.X_slider.value()
        temp.Y = _this.Y_slider.value()

        temp.gearSize   = _this.currentGearSize //number 1~4
        temp.servoAngle = _this.currentServoAngle //1:180, 2:cont
        temp.mirroring  = _this.currentMirroring// True/False
        temp.driveGear  = _this.currentDrivingGear
        break;
      case 3: //PlanetaryGear
        temp.module   = 3

        temp.F        = _this.F_slider.value()
        temp.pairing  = _this.currentParing// True/False
        break;
      default:
      } // end of switch - case

      mySavedSketch.push(temp)
      console.log(mySavedSketch)
  }

  this.initUI = function() { //initializer
    //GRAY & BLACK background for LEFT PANEL
    noStroke()
    fill(this.bgcolor2)
    rect(0,0,270,this.temp_windowHeight)
    fill(0)
    rect(0,575,270,125)
    rect(0,0,270,35)
    //checkbox
    fill(255)
    rect(20,35,230,150)

    // if(this.UI_created == false){
    //     this.UI_created = true
    // }
  } // end of function initUI()

  this.button_front = function(){
    // if(this.button_front_created == false){
      this.menu_OP.size(100,100).position(250,100).show()
      this.menu_W.size(100,100).position(400,100).show()
      this.menu_P.size(100,100).position(550,100).show()
      this.menu_My.size(100,100).position(100,400).show()
    //   this.button_front_created = true
    // }

    // this.Pl_Pair_Y.hide()
    // this.Pl_Pair_N.hide()
    this.pl_paring_toggle.hide()
    this.OP_mtr180.hide()
    this.OP_mtr360.hide()
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

    // this.button_OP_created = false
    // this.button_Wings_created = false
    // this.button_Planetary_created = false
    // this.button_My_created = false

    this.currentModule = 0

  }// end of function btn_front

  this.button_OpenClose = function(){

    // if(this.button_OP_created == false){
      this.mirr_apply.show().position(138,315)
      this.mirr_cancel.show().position(190,315)

      this.size_1.show().position(115,405)
      this.size_2.show().position(150,405)
      this.size_3.show().position(185,405)
      this.size_4.show().position(220,405)

      this.OP_mtr180.show().position(50, 460)
      this.OP_mtr360.show().position(140, 460)

      this.Btn_plt.show().size(150,20).position(60,520)
      this.Btn_net.show().size(150,20).position(60,545)
      this.Btn_my.show().size(150,20).position(60,590)
      this.Btn_home.show().size(150,20).position(60,615)

    //   this.button_OP_created = true
    //
    // }

    this.menu_OP.hide()
    this.menu_W.hide()
    this.menu_P.hide()
    this.menu_My.hide()

    this.BtnStatus_mtr_A.hide()
    this.BtnStatus_mtr_B.hide()
    // this.Pl_Pair_Y.hide()
    // this.Pl_Pair_N.hide()
    this.pl_paring_toggle.hide()
    this.menu_OP.hide()
    this.menu_W.hide()
    this.menu_P.hide()
    this.menu_My.hide()

    this.F_slider.hide()
    this.X_slider.hide()
    this.Y_slider.hide()

    // this.button_Wings_created = false
    // this.button_Planetary_created = false
    // this.button_My_created = false
    // this.button_front_created = false

    this.currentModule = 1
}// end of function btn_openClose()

  this.button_Wings = function(){

    // if(this.button_Wings_created == false){

      this.mirr_apply.show().position(138,315)
      this.mirr_cancel.show().position(190,315)

      this.BtnStatus_mtr_A.show().position(150, 375)
      this.BtnStatus_mtr_B.show().position(200, 375)

      this.size_1.show().position(115,405)
      this.size_2.show().position(150,405)
      this.size_3.show().position(185,405)
      this.size_4.show().position(220,405)

      this.OP_mtr180.show().position(50, 460)
      this.OP_mtr360.show().position(140, 460)

      this.Btn_plt.show().size(150,20).position(60,520)
      this.Btn_net.show().size(150,20).position(60,545)
      this.Btn_my.show().size(150,20).position(60,590)
      this.Btn_home.show().size(150,20).position(60,615)

    //   this.button_Wings_created = true
    // }
    this.menu_OP.hide()
    this.menu_W.hide()
    this.menu_P.hide()
    this.menu_My.hide()

    // this.Pl_Pair_Y.hide()
    // this.Pl_Pair_N.hide()
    this.pl_paring_toggle.hide()
    this.menu_OP.hide()
    this.menu_W.hide()
    this.menu_P.hide()
    this.menu_My.hide()

    // this.button_OP_created = false
    // this.button_Planetary_created = false
    // this.button_My_created = false
    // this.button_front_created = false

    this.currentModule = 2
}

this.button_Planetary = function(){

  // if(this.button_Planetary_created == false){
    // this.Pl_Pair_Y = createButton('Apply').position(110, 390)
    // this.Pl_Pair_N = createButton('Cancel').position(160, 390)

    this.pl_paring_toggle.position(160, 390).show()

    this.Btn_plt.show().size(150,20).position(60,520)
    this.Btn_net.show().size(150,20).position(60,545)
    this.Btn_my.show().size(150,20).position(60,590)
    this.Btn_home.show().size(150,20).position(60,615)

  //   this.button_Planetary_created = true
  // }

  this.menu_OP.hide()
  this.menu_W.hide()
  this.menu_P.hide()
  this.menu_My.hide()

  this.BtnStatus_mtr_A.hide()
  this.BtnStatus_mtr_B.hide()
  this.menu_OP.hide()
  this.menu_W.hide()
  this.menu_P.hide()
  this.OP_mtr180.hide()
  this.OP_mtr360.hide()
  this.menu_My.hide()
  this.mirr_apply.hide()
  this.mirr_cancel.hide()
  this.size_1.hide()
  this.size_2.hide()
  this.size_3.hide()
  this.size_4.hide()

  // this.button_OP_created = false
  // this.button_front_created = false
  // this.button_Wings_created = false
  // this.button_My_created = false

  this.currentModule = 3
}

this.button_My = function(){

  this.Btn_net.show().size(150,20).position(60,590)
  this.Btn_home.show().size(150,20).position(60,615)

  if(!this.done){
  //button creation - show is called every moment - might be overflowing
  var index = 0
  mySavedSketch.forEach(function(design){
    if(design.A != undefined){ //only when valid object
      var title = ""

      if(design.module == 1){
        title = "flower"
      } else if(design.module == 2){
        title = "flapping"
      } else if(design.module == 3){
        title = "planetary"
      }

      _this.btn[index++] = createButton(title).size(100,100).position(100+150*index, 50)
    }
  }); //end of foreach

  (_this.btn).forEach(function(b){
    b.show().mousePressed(_this.putUI)
    //console.log("button title: ", b.elt.innerHTML)
  });
  this.done = true
}
  // this.Pl_Pair_Y.hide()
  // this.Pl_Pair_N.hide()
  this.pl_paring_toggle.hide()
  this.OP_mtr180.hide()
  this.OP_mtr360.hide()
  this.BtnStatus_mtr_A.hide()
  this.BtnStatus_mtr_B.hide()
  this.menu_OP.hide()
  this.menu_W.hide()
  this.menu_P.hide()
  this.menu_My.hide()
  this.Btn_plt.hide()
  this.Btn_my.hide()
  this.size_1.hide()
  this.size_2.hide()
  this.size_3.hide()
  this.size_4.hide()
  this.mirr_apply.hide()
  this.mirr_cancel.hide()

  this.A_slider.hide()
  this.B_slider.hide()
  this.C_slider.hide()
  this.D_slider.hide()
  this.E_slider.hide()
  this.F_slider.hide()
  this.X_slider.hide()
  this.Y_slider.hide()
/*
  this.button_OP_created = false
  this.button_front_created = false
  this.button_Wings_created = false
  this.button_Planetary_created = false
*/
    this.currentModule = 9
  }

  this.putUI = function(){
    console.log("mouse binding function: ", this) //this is caller button
    console.log("caller: ", this.elt.innerHTML)

    if(this.elt.innerHTML == "flower"){
      _this.putText_OpenClose() //this is not calling yet
    }else if(this.elt.innerHTML == "flapping")
      _this.putText_Wings()
    else if(this.elt.innerHTML == "Planetary")
      _this.putText_Planetary()
  }

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
    text("Gear Size :", 20, 420)
    text("Servo Rotation Angle :", 20, 450)
  }

  this.putText_Wings = function(UI_mode){
    noStroke()
    fill(255)
    text("FLAPPING", 100, 25)
    fill(0)
    text("Model Mirroring :", 20, 330)
    text("Driver Gear :", 20, 390)
    text("Gear Size :", 20, 420)
    text("Servo Rotation Angle :", 20, 450)

    if(UI_mode == 1){
      text("A", 25, 230)
      text("B", 145, 230)
      text("C", 25, 265)
      text("D", 145, 265)
      text("E", 25, 300)
      text("F", 145, 300)
    } else if(UI_mode == 2) {
      text("X", 25, 230)
      text("Y", 145, 230)
    }
  }

  this.putText_Planetary = function(){
    noStroke()
    fill(255)
    text("PLANETARY GEARS", 65, 25)
    fill(0)
    text("A", 25, 230)
    text("B", 145, 230)
    text("C", 25, 265)
    text("D", 145, 265)
    text("E", 25, 300)
    text("F", 145, 300)
    text("Pairng Planet Gear :", 20, 380)
  }

  this.putText_My = function(){
    fill(this.bgcolor2)
    rect(0,35,270,this.temp_windowHeight-160)
    noStroke()
    fill(255)
    text("MY SKETCHBOOK", 70, 25)
  }
  this.Front = function(){
    background(bgcolor2)
    noStroke()
    fill(0)
    text("HELLO WORLD!",100,70)
  }

/*   from here:   slider section */
  this.UI_OpenClose_init = function(){
      // set default values
    }
  this.UI_Wings_init = function(){
      // set default values
    }

  this.OpenClose = function(){

    this.A_slider.show()
    this.B_slider.show()
    this.C_slider.show()
    this.D_slider.show()
    this.E_slider.show()

    var sliderObj = [{}] //empty json

    if(stdSliderValue.openclose != undefined){

      this.A_slider.value(stdSliderValue.openclose.A)
      this.B_slider.value(stdSliderValue.openclose.B)
      this.C_slider.value(stdSliderValue.openclose.C)
      this.D_slider.value(stdSliderValue.openclose.D)
      this.E_slider.value(stdSliderValue.openclose.E)

      //I don't think this is needed anymore if this is updated
      //delete stdSliderValue.openclose
    }

    this.A_slider.changed(this.sliderAUpdate)
    this.B_slider.changed(this.sliderBUpdate)
    this.C_slider.changed(this.sliderCUpdate)
    this.D_slider.changed(this.sliderDUpdate)
    this.E_slider.changed(this.sliderEUpdate)

    console.log("current Module #:", this.currentModule)
  }

  this.Wings = function(UI_mode){

    var sliderObj = [{}] //empty json for wing

    if(UI_mode == 1){
      this.A_slider.show()
      this.B_slider.show()
      this.C_slider.show()
      this.D_slider.show()
      this.E_slider.show()
      this.F_slider.show()

      this.X_slider.hide()
      this.Y_slider.hide()

    } else if(UI_mode == 2){
      this.A_slider.hide()
      this.B_slider.hide()
      this.C_slider.hide()
      this.D_slider.hide()
      this.E_slider.hide()
      this.F_slider.hide()

      this.X_slider.show()
      this.Y_slider.show()
    }

    if(stdSliderValue.wings != undefined){ //once this module is opened, so that previous information is set up

      this.A_slider.value(stdSliderValue.wings.A) //restore values from json obejct storage
      this.B_slider.value(stdSliderValue.wings.B)
      this.C_slider.value(stdSliderValue.wings.C)
      this.D_slider.value(stdSliderValue.wings.D)
      this.E_slider.value(stdSliderValue.wings.E)
      this.F_slider.value(stdSliderValue.wings.F)

      this.X_slider.value(stdSliderValue.wings.X)
      this.Y_slider.value(stdSliderValue.wings.Y)

      //delete stdSliderValue.wings
    }

    this.A_slider.changed(this.sliderAUpdate) //calling several times since it is adjusted by system
    this.B_slider.changed(this.sliderBUpdate) //how to differetiate user change vs. system update?
    this.C_slider.changed(this.sliderCUpdate)
    this.D_slider.changed(this.sliderDUpdate)
    this.E_slider.changed(this.sliderEUpdate)
    this.F_slider.changed(this.sliderFUpdate)

    this.X_slider.changed(this.sliderXUpdate)
    this.Y_slider.changed(this.sliderYUpdate)

    console.log("current Module #:", this.currentModule)
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
        case 2: // Flagppig Bird
          _this.A_slider.attribute('value', _this.calcSliderPos3(Bird1.dist_aMin, Bird1.dist_aMax, Bird1.getA()))
          break
        case 3:
            //do something for planetary
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
      case 2: // Flagppig Bird
        _this.B_slider.attribute('value', _this.calcSliderPos3(Bird1.dist_bMin, Bird1.dist_bMax, Bird1.getB()))
        break
      case 3:
          //do something for planetary
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
      case 2: // Flagppig Bird
        _this.C_slider.attribute('value', _this.calcSliderPos3(Bird1.dist_cMin, Bird1.dist_cMax, Bird1.getC()))
        break
      case 3:
          //do something for planetary
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
      case 2: // Flagppig Bird
        _this.D_slider.attribute('value', _this.calcSliderPos3(Bird1.dist_dMin, Bird1.dist_dMax, Bird1.getD()))
        break
      case 3:
          //do something for planetary
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
      case 2: // Flagppig Bird
        //_this.E_slider.value(_this.calcSliderPos3(Bird1.dist_eMin, Bird1.dist_eMax, Bird1.getE()))
        break
      case 3:
          //do something for planetary
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
  // this.calcSliderPos4 = function(min, max, value) { // Wings
  //   return map(value,0,100,min,max) //
  // }
  // this.calcSliderPos5 = function(min, max, value) { // Wings
  //   return map(value,0,200,min,max) //
  // }

}
