function Bird(){

this.driverM = color(0)
this.drivenM = color(255)
this.radius= 64

this.rotation_interlock = PI+.21 //temp
this.in_gear = this.radius-27 //temp

this.rotationAngle=0

this.angle_increase = 0.015
this.minNumberOfTeeth=3
this.maxNumberOfTeeth=30
this.centergearX=width/2+70
this.centergearY=height/2+80

this.UI1_created = false

 this.init = function(){

   this.t2 = new Turtle()
   this.dist_a = 250
   this.dist_b = 100
   this.dist_c = 300
   this.dist_d = 100
   this.dist_e = 360
   this.dist_f = 380

   this.xx = 20
   this.yy = 40

   this.dist_aMin = 0
   this.dist_aMax = 400
   this.dist_bMin = 0
   this.dist_bMax = 400
   this.dist_cMin = 0
   this.dist_cMax = 400
   this.dist_dMin = 0
   this.dist_dMax = 400
   this.dist_eMin = 0
   this.dist_eMax = 400
   this.dist_fMin = 0
   this.dist_fMax = 400
   this.xMin = 0
   this.xMax = 200
   this.yMin = 0
   this.yMax = 200
   this.lengthGap = 10
  }

  this.drawWing = function(centerPositionX,centerPositionY,side){ //x & y are where to start drawing wings

     this.t1 = new Turtle()

     this.wing_axisX = -1*(50+(this.radius+this.teethHeight/2))-20 + (this.xx-15)*side
     this.wing_axisY = this.yy-10
     this.wing_topLengthX = 18
     this.wing_topLengthY = 0

     this.step1_a = sq(this.dist_b) + sq(this.dist_c) - sq(this.dist_a)
     this.step2_a = 2*this.dist_b*this.dist_c
     this.angle_cosine_a = this.step1_a/this.step2_a
     this.step3_a = acos(this.angle_cosine_a)
     this.angle_a = degrees(this.step3_a)

     this.step1_c2 = sq(this.dist_d) + sq(this.dist_e) - sq(this.dist_c)
     this.step2_c2 = 2*this.dist_d*this.dist_e
     this.angle_cosine_c2 = this.step1_c2/this.step2_c2
     this.step3_c2 = acos(this.angle_cosine_c2)
     this.angle_c2 = degrees(this.step3_c2)

     this.step1_e = sq(this.dist_c) + sq(this.dist_d) - sq(this.dist_e)
     this.step2_e = 2*this.dist_c*this.dist_d
     this.angle_cosine_e = this.step1_e/this.step2_e
     this.step3_e = acos(this.angle_cosine_e)
     this.angle_e = degrees(this.step3_e)

     this.t1.penup()
     this.t1.forward(this.wing_axisY+this.wing_topLengthY)
     this.t1.left(90*side)
     this.t1.forward((this.wing_axisX+this.wing_topLengthX*side)*side)

     this.c2_x = this.t1.x
     this.c2_y = this.t1.y      // point C2: where the wing starting point.

   //  if(this.pinion_Xdot<this.c2_x){
     var leftTurn = this.angle_f + this.angle_x
 //    }else if(this.pinion_Xdot>=this.c2_x){
 //      var leftTurn = this.angle_f - this.angle_x
 //    }

 //    console.log("angle f: "+this.angle_f )
     this.t1.right(90*side)
     this.t1.left((180-leftTurn)*side)
     this.t1.forward(this.dist_e)

     this.b_x = this.t1.x
     this.b_y = this.t1.y    // point B: the edge of the wing

     this.t1.back(this.dist_e)
     this.t1.right(this.angle_c2*side)
     this.t1.forward(this.dist_d)

     this.a_x = this.t1.x
     this.a_y = this.t1.y    // point A: headside triangle

     this.t1.left((180-(this.angle_a+this.angle_e))*side)
     this.t1.forward(this.dist_b)

     this.c_x = this.t1.x
     this.c_y = this.t1.y    // point C: top of the wing triangle

 // CACULATION IS DONE _ COME BACK TO HOME
     this.t1.back(this.dist_b)
     this.t1.right((180-(this.angle_a+this.angle_e))*side)

     this.t1.back(this.dist_d)
     this.t1.left(this.angle_c2*side)

     this.t1.right((180-leftTurn)*side)
     this.t1.left(90*side)

     this.t1.back((this.wing_axisX+this.wing_topLengthX*side)*side)
     this.t1.right(90*side)
     this.t1.back(this.wing_axisY+this.wing_topLengthY)

     var theta = this.rotationAngle*this.rotationDirection+this.rotation_interlock
     var len = sqrt(pow(this.in_gear,2)+pow(this.in_gear,2))

     push()
     translate(centerPositionX,centerPositionY)
     var rad = -.11 // due to some mismatch
     this.dist_g = dist(len*cos(theta+rad), len*sin(theta+rad), this.c2_x-centerPositionX, this.c2_y-centerPositionY)

     this.pinion_Xdot = len*cos(theta+rad)
     this.pinion_Ydot = len*sin(theta+rad)

     this.dist_x = abs(this.c2_x-centerPositionX-this.pinion_Xdot)
     this.dist_y = abs(this.c2_y-centerPositionY-this.pinion_Ydot)

     this.step1_x = sq(this.dist_y) + sq(this.dist_g) - sq(this.dist_x)
     this.step2_x = 2*this.dist_y*this.dist_g
     this.angle_cosine_x = this.step1_x/this.step2_x
     this.step3_x =acos(this.angle_cosine_x)
     this.angle_x =degrees(this.step3_x)

     stroke(color(tempC))
//     line(this.pinion_Xdot,this.pinion_Ydot,this.c2_x-centerPositionX,this.c2_y-centerPositionY) // side g
//     line(this.b_x-centerPositionX,this.b_y-centerPositionY,this.c2_x-centerPositionX,this.c2_y-centerPositionY) // side e
     line(this.pinion_Xdot,this.pinion_Ydot,this.b_x-centerPositionX,this.b_y-centerPositionY) // side f
 //    line(this.pinion_Xdot,this.pinion_Ydot,this.b_x-centerPositionX,this.b_y-centerPositionY) // side f
     noStroke()
     fill(color(tempC))
     ellipse(this.pinion_Xdot,this.pinion_Ydot, 8,8) //moving pivot on gears

     pop()

     this.step1_f = sq(this.dist_e) + sq(this.dist_g) - sq(this.dist_f)
     this.step2_f = 2*this.dist_e*this.dist_g
     this.angle_cosine_f = this.step1_f/this.step2_f
     this.step3_f =acos(this.angle_cosine_f)
     this.angle_f =degrees(this.step3_f)

     stroke(color(tempC))
     line(this.a_x,this.a_y,this.c2_x,this.c2_y) // side d
     noStroke()
     fill(color(tempC))
     triangle(this.a_x, this.a_y, this.b_x, this.b_y, this.c_x, this.c_y) //side a,b,c

     fill(0)
     ellipse(this.c2_x,this.c2_y,8,8)

   }

  this.compBird = function(pair_wing,gear_setting,gear_size,motorType){

    if (gear_setting == 1){
      this.motorA = this.driverM
      this.motorB = this.drivenM
    } else if (gear_setting == 0){
      this.motorB = this.driverM
      this.motorA = this.drivenM
    }

    if(gear_size ==1){
      this.radius= 48
      this.in_gear = this.radius-22
    }else if(gear_size ==2){
      this.radius= 56
      this.in_gear = this.radius-25
    }else if(gear_size ==3){
      this.radius= 64
      this.in_gear = this.radius-27
    }else if(gear_size ==4){
      this.radius= 72
      this.in_gear = this.radius-32
    }

    this.motor_status = motorType

    if(pair_wing == 1){

    /* TO DRAW LEFT GEAR */
    this.centerPositionX=this.centergearX
    this.centerPositionY=this.centergearY
    this.rotationDirection = 1
    this.gear_status = this.motorA
    this.drawGear(this.radius, this.centerPositionX, this.centerPositionY, this.rotationDirection,this.gear_status,this.motor_status)

    /* TO DRAW RIGHT GEAR*/
    this.centerPositionX=this.centergearX+(this.radius*2+this.teethHeight)
    this.rotationDirection = -1
    this.gear_status = this.motorB
    this.drawGear(this.radius, this.centerPositionX, this.centerPositionY, this.rotationDirection,this.gear_status,this.motor_status)

   } else if (pair_wing == 0){
     /* TO DRAW CENTER GEAR */
     this.centerPositionX=this.centergearX
     this.centerPositionY=this.centergearY
     this.rotationDirection = 1
     this.gear_status = this.motorA
     this.drawGear(this.radius, this.centerPositionX, this.centerPositionY, this.rotationDirection,this.gear_status,this.motor_status)
     this.motor_status = motorType
   }
 }

  this.drawGear = function(radius, centerPositionX, centerPositionY,rotationDirection,gear_status,motor_status){

    this.teethHeight=0.25*this.radius
    this.numberOfTeeth=radius/4
    this.numberOfTeeth=constrain(this.numberOfTeeth, this.minNumberOfTeeth, this.maxNumberOfTeeth)
    this.teethAngle=TWO_PI/this.numberOfTeeth
    this.teethWidth=sin(this.teethAngle/2)*radius
    this.lineY=cos(this.teethAngle/2)*radius+this.teethHeight

    if(this.rotationDirection ==1){       // left gear
      this.rotation_interlock = 0
    }else if(this.rotationDirection == -1){   //right gear

      if(this.radius == 48){    //  gear size 1
        this.rotation_interlock = (this.radius*2/5)-3.22
      }else if(this.radius ==56){   //  gear size 2
        this.rotation_interlock = (this.radius*2/5)-.17
      }else if(this.radius ==64){   //  gear size 3
        this.rotation_interlock = PI+.21
      }else if(this.radius ==72){   //  gear size 4
        this.rotation_interlock = PI+.18
      }
   }

    push()
    translate(centerPositionX, centerPositionY)
    rotate(this.rotationAngle*rotationDirection+this.rotation_interlock)
    this.rotationAngle = this.rotationAngle + this.angle_increase

    if(motor_status == 180){
      if (this.rotationAngle >PI){ this.rotationAngle = PI }
      else if (this.rotationAngle <0){ this.rotationAngle = 0 }

      if (this.rotationAngle == PI || this.rotationAngle == 0){
        this.angle_increase = this.angle_increase * -1

      }
    }else if (motor_status == 360){
      if (this.rotationAngle >= 2*PI){
          this.rotationAngle = 0
      }
    }

     fill(150)
    for (var i=0; i<this.numberOfTeeth; i++)
    {
      rotate(this.teethAngle)
      stroke(150)
      strokeWeight(1)
      triangle((-3*this.teethWidth/4)+2, -this.lineY+this.teethHeight, this.teethWidth/2, -this.lineY+this.teethHeight, -this.teethWidth/2, -this.lineY)
      triangle((this.teethWidth/4)+2, -this.lineY, -this.teethWidth/2, -this.lineY, this.teethWidth/2, -this.lineY+this.teethHeight)
      stroke(150)
      strokeWeight(2)
      line(-this.teethWidth/2, -this.lineY, this.teethWidth/2, -this.lineY+this.teethHeight)
    }
    ellipse(0, 0, 2*(-this.lineY+this.teethHeight), 2*(-this.lineY+this.teethHeight)) //gear flesh

    if (pair_wing == 0){
      stroke(color(tempC))
      strokeWeight(5)
      fill(0)
      ellipse(0,0,20,20)

    }else if (pair_wing == 1){
      if(gear_status == this.driverM){ //left gear center
        stroke(color(tempC))
        strokeWeight(5)
        fill(0)
        ellipse(0,0,20,20)

      }else if(gear_status == this.drivenM){ //right gear center
        noStroke()
        fill(0)
        ellipse(0,0,15,15)
      }
    }



    pop()

    this.drawWing(centerPositionX,centerPositionY,rotationDirection)
  }

  this.drawGear2 = function(radius, centerPositionX, centerPositionY){

    this.teethHeight=0.35*radius
    this.numberOfTeeth=radius/2
    this.teethAngle=TWO_PI/this.numberOfTeeth
    this.teethWidth=sin(this.teethAngle/2)*radius
    this.lineY=cos(this.teethAngle/2)*radius+this.teethHeight

    push()
    translate(centerPositionX, centerPositionY)
     fill(200)
    for (var i=0; i<this.numberOfTeeth; i++)
    {
      rotate(this.teethAngle)
      stroke(200)
      strokeWeight(1)
      triangle((-3*this.teethWidth/4)+2, -this.lineY+this.teethHeight, this.teethWidth/2, -this.lineY+this.teethHeight, -this.teethWidth/2, -this.lineY)
      triangle((this.teethWidth/4)+2, -this.lineY, -this.teethWidth/2, -this.lineY, this.teethWidth/2, -this.lineY+this.teethHeight)
      stroke(200)
      line(-this.teethWidth/2, -this.lineY, this.teethWidth/2, -this.lineY+this.teethHeight)
    }
    ellipse(0, 0, 2*(-this.lineY+this.teethHeight), 2*(-this.lineY+this.teethHeight)) //gear flesh

    pop()
  }

  this.flappingUI = function(UI_mode){
    if (UI_mode == 1){

      push()
      translate(20,40)

      fill(150)
      triangle(20,70,110,10,165,35)
      stroke(150)
      line(165,35,205,70) // side D:
      line(20,70,180,130) // side F:

      for(var i=20; i<200;i=i+8){
        line(i,70,i+4,70) // dotted line
      }

      noStroke()
      fill(0)
      ellipse(205,70,6,6)
      ellipse(180,130,6,6)

      text("A", 60,35)
      text("B", 140,20)
      text("C", 110,62)
      text("D", 188, 50)
      text("E", 140, 87)
      text("F", 100, 120)
      pop()

      rect(210,160,15,20)
      fill(255)
      text("1", 213, 175)

      noFill()
      stroke(0)
      rect(230,160,15,20)
      fill(0)
      text("2", 233, 175)

    }else if (UI_mode == 2){

      this.drawGear2(28, 120,142)

      stroke(150)
      line(160,60,190,60)   // side X
      line(160,60,160,102)
      line(190,55,190,65)

      for(var i=80; i<160; i=i+8){
        line(i,102,i+4,102)
      }
      for(var i=60; i<178; i=i+8){
        line(160,i,160,i+4)
      }

      fill(0)
      noStroke()
      ellipse(160,60,6,6)
      ellipse(120,140,6,6)
      ellipse(160,102,6,6)

      text("X", 170, 55)
      text("Y", 170, 90)

      noFill()
      stroke(0)
      rect(210,160,15,20)
      fill(0)
      text("1", 213, 175)

      fill(0)
      rect(230,160,15,20)
      fill(255)
      text("2", 233, 175)

    }
  }

  this.drawNet = function(pair_wing,gearSize_wing){

    var radiusN = 8*(5+gearSize_wing)

    this.teethHeight=0.25*radiusN
    this.numberOfTeeth=radiusN/4
    this.teethAngle=TWO_PI/this.numberOfTeeth
    this.teethWidth=sin(this.teethAngle/2)*radiusN
    this.lineY=cos(this.teethAngle/2)*radiusN+this.teethHeight

    var gear_x0 = (-3*this.teethWidth/4)-2.5  // extend
    var gear_y0 = -this.lineY+this.teethHeight+1  // extend
    var gear_x1 = (-3*this.teethWidth/4)+2 // drawing teeth
    var gear_y1 = -this.lineY+this.teethHeight // drawing teeth
    var gear_x2 = -this.teethWidth/2 // drawing teeth
    var gear_y2 = -this.lineY // drawing teeth
    var gear_x3 = (this.teethWidth/4)+2 // drawing teeth
    var gear_y3 = -this.lineY // drawing teeth
    var gear_x4 = this.teethWidth/2 // drawing teeth
    var gear_y4 = -this.lineY+this.teethHeight // drawing teeth
    var gear_x5 = (3*this.teethWidth/4)+2.5  // extend
    var gear_y5 = -this.lineY+this.teethHeight+1  // extend

    stroke(0)
    fill(255)

    if(pair_wing == 0){
      push()
      translate(100, 100)

      for (var i=0; i<this.numberOfTeeth; i++){
        rotate(this.teethAngle)
        line (gear_x0, gear_y0, gear_x1, gear_y1) // extend
        line (gear_x1, gear_y1, gear_x2, gear_y2) // drawing teeth
        line (gear_x2, gear_y2, gear_x3, gear_y3) // drawing teeth
        line (gear_x3, gear_y3, gear_x4, gear_y4) // drawing teeth
        line (gear_x4, gear_y4, gear_x5, gear_y5) // extend
      }
      ellipse(0, 0, 20, 20) //gear center
      pop()

    } else if(pair_wing == 1){
      push()
      translate(100, 100)
      for (var i=0; i<this.numberOfTeeth; i++)
      {
        rotate(this.teethAngle)
        line (gear_x0, gear_y0, gear_x1, gear_y1) // extend
        line (gear_x1, gear_y1, gear_x2, gear_y2) // drawing teeth
        line (gear_x2, gear_y2, gear_x3, gear_y3) // drawing teeth
        line (gear_x3, gear_y3, gear_x4, gear_y4) // drawing teeth
        line (gear_x4, gear_y4, gear_x5, gear_y5) // extend
      }
      ellipse(0, 0, 20, 20) // Left gear center

      // ONE MORE GEAR on Right
      translate(radiusN*3, 0)
      for (var i=0; i<this.numberOfTeeth; i++){
        rotate(this.teethAngle)
        line (gear_x0, gear_y0, gear_x1, gear_y1) // extend
        line (gear_x1, gear_y1, gear_x2, gear_y2) // drawing teeth
        line (gear_x2, gear_y2, gear_x3, gear_y3) // drawing teeth
        line (gear_x3, gear_y3, gear_x4, gear_y4) // drawing teeth
        line (gear_x4, gear_y4, gear_x5, gear_y5) // extend
    }
      ellipse(0, 0, 20, 20) //Right gear center
      pop()

    }
  }
  this.drawPDF = function(){

      console.log("PDF DOWNLADED")// test here


  }


  // get functions
  this.getA = function(){return this.dist_a;}
  this.getB = function(){return this.dist_b;}
  this.getC = function(){return this.dist_c;}
  this.getD = function(){return this.dist_d;}
  this.getE = function(){return this.dist_e;}
  this.getF = function(){return this.dist_f;}
  this.getX = function(){return this.x;}
  this.getY = function(){return this.y;}

  // set functions
  this.setA = function(newA){
    if (newA > this.dist_aMin && newA < this.dist_aMax){
      this.dist_a = newA
      this.updateSim()
      return true
    }
    return false
  }
  this.setB = function(newB){
    if (newB>this.dist_bMin && newB<this.dist_bMax){
      this.dist_b = newB
      this.updateSim()
      return true
    }
      return false
  }
  this.setC = function(newC){
    if (newC>this.dist_cMin && newC<this.dist_cMax){
      this.dist_c = newC
      this.updateSim()
      return true
    }
      return false
  }
  this.setD = function(newD){

    if (newD > this.dist_dMin && newD < this.dist_dMax){
      this.dist_d = newD
      this.updateSim()

      return true
    } //need else anyway - if min and max was well defined, this should not happen
    return false
  }
  this.setE = function(newE){
    if (newE>this.dist_eMin && newE<this.dist_eMax){
      this.dist_e = newE
      this.updateSim()
      return true
    }
      return false
  }
  this.setF = function(newF){
    if (newF>this.dist_fMin && newF<this.dist_fMax){
      this.dist_f = newF
      this.updateSim()
      return true
    }
      return false
  }

  this.setX = function(newX){
    if (newX>this.xMin && newX<this.xMax){
      this.xx = newX
      return true
    }
      return false
  }
  this.setY = function(newY){
    if (newY>this.yMin && newY<this.yMax){
      this.yy = newY
      return true
    }
      return false
  }
  this.updateSim = function(){
    this.dist_aMin = abs(this.dist_b-this.dist_c)+this.lengthGap
    this.dist_aMax = this.dist_b+this.dist_c-this.lengthGap

    this.dist_bMin = abs(this.dist_a-this.dist_c)+this.lengthGap
    this.dist_bMax = this.dist_a+this.dist_c-this.lengthGap

    this.dist_cMin = abs(this.dist_a-this.dist_b)+this.lengthGap
    this.dist_cMax = this.dist_a+this.dist_b-this.lengthGap

    this.dist_dMin = abs(this.dist_c-this.dist_e)+this.lengthGap
    this.dist_dMax = this.dist_c+this.dist_e-this.lengthGap

    this.dist_eMin = abs(this.dist_c-this.dist_d)+this.lengthGap
    this.dist_eMax = this.dist_c+this.dist_d-this.lengthGap

    this.dist_fMin = abs(this.dist_e-this.dist_g)+this.lengthGap
    this.dist_fMax = this.dist_e+this.dist_g-this.lengthGap

    return true
  }

}
