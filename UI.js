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

  //default == canceled --> possible action = "apply"
  this.mirroring_toggle = createButton('Apply').mousePressed(toggleMirroring)

  this.Mech_show = createButton ('Show Mechanism')
  this.Mech_hide = createButton ('Hide Mechanism')
  this.Btn_reset = createButton ('Reset all')
  this.Btn_pdf = createButton ('Download PDF')
  this.Btn_back = createButton ('Back to Simulation')
  this.Btn_plt = createButton ('Save in My Palette').mousePressed(saveDesign)
  this.Btn_net = createButton ('View the Folding Net').mousePressed(button_folding_net)
  this.Btn_my = createButton ('Go to My Sketch').mousePressed(button_My)
  this.Btn_home = createButton ('Go to Home')//.mousePressed(_this.Front)

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

  this.X_slider = createSlider(0, 200, 20).size(100).position(20, 200)
  this.Y_slider = createSlider(0, 200, 40).size(100).position(140,200)

  this.selectPartent = [] //array
  this.btn180 = []
  this.btnContd = []

  for(var i=0; i<4; i++){ //up to saved model numbers
    var sel = createSelect().hide()
    sel.option('None')
    sel.option('Module1') //option should be redefined upon relationship btw modules
    sel.option('Module2')
    sel.option('Module3')

    var btn180 = createButton("180°").hide()
    var btn360 = createButton("Continuous").hide()
    this.selectPartent.push(sel)
    this.btn180.push(btn180)
    this.btnContd.push(btn360)
  }

  this.button_hide = createButton("Hide").hide()
  this.button_show = createButton("show").hide()
  this.button_Delete = createButton("Delete").hide()

  this.initCurrentSelection = function(pageMode){
    // this.currentGearSize     = 2 //default
    // this.currentServoAngle   = 180 // 180 or 360
    // this.currentDrivingGear  = 0 // 0:left, 1:right
    // this.currentMirroring    = false

    //reverse slider selection

    console.log("initUI is called")

    if(pageMode == 1) {
      //take a look at stdSliderValue.openclose
      if(stdSliderValue.openclose == undefined){
        this.currentGearSize     = 2 //default
        this.currentServoAngle   = 180 // 180 or 360
        this.currentMirroring    = false

        _this.size_1.style('background-color','white')
        _this.size_2.style('background-color','blue')
        _this.size_3.style('background-color','white')
        _this.size_4.style('background-color','white')

        _this.mtr180.style('background-color','blue')
        _this.mtr360.style('background-color','white')
      } else {
        //invoke saved json obj
      }
    } else if(pageMode == 3){
      //take a look at stdSliderValue.wings
      if(stdSliderValue.wings == undefined){
        this.currentGearSize     = 2 //default
        this.currentServoAngle   = 180 // 180 or 360
        this.currentMirroring    = false
        this.currentDrivingGear  = 0 // 0:left, 1:right
        //this.currentParing       = 1

        _this.size_1.style('background-color','white')
        _this.size_2.style('background-color','blue')
        _this.size_3.style('background-color','white')
        _this.size_4.style('background-color','white')

        _this.mtr180.style('background-color','blue')
        _this.mtr360.style('background-color','white')

        _this.mtr_L.style('background-color','blue')
        _this.mtr_R.style('background-color','white')
      } else {
        //invoke saved json obj
      }
    }
  }
  // individual button event functions
  // _this: this object, this : caller button element
  function toggleMirroring(){ //no highlight needed

    if(!_this.currentMirroring) //if applied state
      _this.mirroring_toggle.html('Cancle')
    else
      _this.mirroring_toggle.html('Apply')

    _this.currentMirroring = 1 - _this.currentMirroring //toggle btw true(1) - false(0)
    console.log("current paring status: ", _this.currentMirroring)

  }

  function setGearSize(){
    var gearSize = parseInt(this.elt.innerHTML)
    _this.currentGearSize = gearSize

    //maybe this to be toggled, not setting all manually
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

    console.log(gearSize)
  }

  function setServoAngle(){
    if(this.elt.innerHTML == "Continuous"){
      _this.mtr180.style('background-color','white')
      _this.mtr360.style('background-color','blue')

      _this.currentServoAngle = 360
    }else
      _this.mtr180.style('background','blue')
      _this.mtr360.style('background-color','white')

      _this.currentServoAngle = 180

    console.log(_this.currentServoAngle)
  }

  function setDrivingGear(){
    if(this.elt.innerHTML == 'L'){
      _this.mtr_L.style('background-color', 'blue')
      _this.mtr_R.style('background-color', 'white')

      _this.currentDrivingGear = "LEFT"
    }else { // R
      _this.mtr_L.style('background-color', 'white')
      _this.mtr_R.style('background-color', 'blue')

      _this.currentDrivingGear = "RIGHT"
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

  this.initUI_net = function(){ //initializer
    //GRAY & BLACK background for LEFT PANEL
    noStroke()
    fill(_this.bgcolor2)
    rect(0,500,270,_this.temp_windowHeight-500)
    fill(0)
    rect(0,575,270,125)
    rect(0,500,270,35)

    //checkbox
    fill(255)
    rect(20,35,230,150)

  } // end of function initUI()

  this.button_front = function(){

    this.mirroring_toggle.hide()
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

    this.A_slider.hide()
    this.B_slider.hide()
    this.C_slider.hide()
    this.D_slider.hide()
    this.E_slider.hide()
    this.F_slider.hide()
    this.X_slider.hide()
    this.Y_slider.hide()

    this.selectPartent.forEach(function(entity){
      entity.hide()
    });
    this.btn180.forEach(function(entity){
      entity.hide()
    })
    this.btnContd.forEach(function(entity){
      entity.hide()
    })

    this.myBtnList.forEach(function(btn){
      btn.hide()
    });

    this.currentModule = 0

  }// end of function btn_front

  this.button_OpenClose = function(){

    // _this.mirr_apply.show().position(138,315)
    // _this.mirr_cancel.show().position(190,315)
    _this.mirroring_toggle.show().position(164, 315)

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

    _this.F_slider.hide()
    _this.X_slider.hide()
    _this.Y_slider.hide()

    OpenClose()
    _this.currentModule = 1
}// end of function btn_openClose()

  this.button_Wings = function(){

    _this.mirroring_toggle.show().position(164, 315)

    if(_this.currentMirroring == 0){ // cancel pairing
      _this.mtr_L.hide()
      _this.mtr_R.hide()

    }else if(_this.currentMirroring == 1){  // paired!
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

    //_this.pl_paring_toggle.hide()
    _this.Btn_pdf.hide()
    _this.Btn_back.hide()

    Wings()
    _this.currentModule = 3
}

function button_folding_net(){

  _this.Btn_pdf.show().size(150,20).position(60,545)
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
      // if( delete stdSliderValue.openclose)
      //   console.log('succeed')
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

      //delete stdSliderValue.wings
    } else {
      //save current slider information into empty json
      //for the first time, have to create json obj
      //should saving ahppens everytime it changed?
      sliderObj.A = _this.A_slider.value()
      sliderObj.B = _this.B_slider.value()
      sliderObj.C = _this.C_slider.value()
      sliderObj.D = _this.D_slider.value()
      sliderObj.E = _this.E_slider.value()
      sliderObj.F = _this.F_slider.value()

      sliderObj.X = _this.X_slider.value()
      sliderObj.Y = _this.Y_slider.value()

      sliderObj.mirring = _this.currentMirroring
      sliderObj.gearSize = _this.currentGearSize
      sliderObj.servoAngle = _this.currentServoAngle

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

          //we assume this is only possible when there is already json obj created
          stdSliderValue.openclose.A = _this.A_slider.value()
          break
        case 3: // Flagppig Bird
          stdSliderValue.wings.A = _this.A_slider.value()
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
        stdSliderValue.openclose.B = _this.B_slider.value()
        break
      case 3: // Flagppig Bird
        stdSliderValue.wings.B = _this.B_slider.value()
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
        stdSliderValue.openclose.C = _this.C_slider.value()
        break
      case 3: // Flagppig Bird
        stdSliderValue.wings.C = _this.C_slider.value()
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
    switch (_this.currentModule) {
      case 1: // OpenClose Flower
        //_this.E_slider.value(_this.calcSliderPos2(Flower3.eMin, Flower3.eMax, Flower3.getE()))
        stdSliderValue.openclose.E = _this.E_slider.value()
        break
      case 3: // Flagppig Bird
        //_this.E_slider.value(_this.calcSliderPos3(Bird1.dist_eMin, Bird1.dist_eMax, Bird1.getE()))
        stdSliderValue.wings.E = _this.E_slider.value()
        break
      default:
    }
  }

  this.sliderFUpdate = function() {
    // no switch case cuz OP module doesn't have slider F
    Bird1.setF(_this.F_slider.value())
    stdSliderValue.wings.F = _this.F_slider.value()
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

    if(index < 2)
      var y = 85
    else
      var y = (index)*150

    //these are common
    fill(50)
    rect(0,y-50, 270,30) //(x,y,width,height)
    fill(255)
    text("Module"+index, 25, y-30)

    fill(0)
    text("Position: ",  25, y)
    text("Scale: ",     25, y+30)
    text("Rotation: ",  25, y+60)
    text("Parent: ",    25, y+90)

    //informations
    text("XX YY",       100, y) //position
    text("100",         100, y+30) //scale
    text("360",         100, y+60) //rotate

    _this.selectPartent[index].changed(mySelectedEvent)
                      .position(100, y+75)
                      .show()

    //toggle button hide/show or delete
    /*
    btnHide.show()
    btnShow.show()
    btnDelete.show()
    */

    //module specific interface
    if(entity.module == 1){
      text("Servo Rotation Angle: ", 25, y+120)

      //toggle button 180 or continuous
      this.btn180[index-1].position(50, y+135).show()
      this.btnContd[index-1].position(150, y+135).show()

    }

    if(entity.module == 3){

    }
  }

  function mySelectedEvent(){ //anonymous function to deal with selection event

  }
}
