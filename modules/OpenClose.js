function OpenClose(){

  this.minNumberOfTeeth=3
  this.maxNumberOfTeeth=30
  this.rotationAngle=3
  this.rotationDirection = 1
  this.lengthGap = 10

  this.rack_Y = height/2-42
  this.rack_Y_reset1 = false
  this.rack_Y_reset2 = false
  this.rack_Y_reset3 = false
  this.rack_Y_reset4 = false

  this.change_direction = -1

  this.angle_increase = 0.01 //  to rotate pinion (circular) gear

  this.compGear = function(pair_petal,gear_size,motorType){
    //pinion gear is circular / rack gear is rotational gear

    if(gear_size ==1){
      this.radius= 48
      this.rack_increase_change = .485

      if (this.rack_Y_reset1 == false){
          this.rack_Y = height/2-53
          this.rotationAngle = 3
          this.angle_increase = 0.01
          this.change_direction = -1

          this.rack_Y_reset1 = true
          this.rack_Y_reset2 = false
          this.rack_Y_reset3 = false
          this.rack_Y_reset4 = false
        }

    }else if(gear_size ==2){
      this.radius= 56
      this.rack_increase_change = .57

      if (this.rack_Y_reset2 == false){
          this.rack_Y = height/2-66
          this.rotationAngle = 3
          this.angle_increase = 0.01
          this.change_direction = -1

          this.rack_Y_reset2 = true
          this.rack_Y_reset1 = false
          this.rack_Y_reset3 = false
          this.rack_Y_reset4 = false
        }

    }else if(gear_size ==3){
      this.radius= 64
      this.rack_increase_change = .63

      if (this.rack_Y_reset3 == false){
          this.rack_Y = height/2-100
          this.rotationAngle = 3
          this.angle_increase = 0.01
          this.change_direction = -1

          this.rack_Y_reset3 = true
          this.rack_Y_reset1 = false
          this.rack_Y_reset2 = false
          this.rack_Y_reset4 = false
        }

    }else if(gear_size ==4){
      this.radius= 72
      this.rack_increase_change = .72

      if (this.rack_Y_reset4 == false){
          this.rack_Y = height/2-138
          this.rotationAngle = 3
          this.angle_increase = 0.01
          this.change_direction = -1

          this.rack_Y_reset4 = true
          this.rack_Y_reset1 = false
          this.rack_Y_reset2 = false
          this.rack_Y_reset3 = false
        }

    }
    this.centerPositionY_rack = height/2+150
    this.motorType = motorType

    this.centerPositionX_pinion = temp_windowWidth/2+200

    this.drawPinionGear(this.radius, this.centerPositionX_pinion, this.centerPositionY_rack,motorType)

}

  this.drawRackGear = function(radius, centerPositionX_rack,centerPositionY_rack){

    this.numberOfTeeth=radius/4
    this.temp_rackX = 40 // where the rack gear starts drawing
    this.teethAngle=TWO_PI/this.numberOfTeeth
    this.teethWidth=sin(this.teethAngle/2)*radius
  //  this.interlock = 0

    this.RlineY=cos(this.teethAngle/2)*radius+this.teethHeight

    push()
    translate(centerPositionX_rack,this.rack_Y+this.teethWidth)
    rotate(PI/2)
    fill(150)
    stroke(255)
//    this.RlineY = 55 // temporary setting to define where to draw gear teeth
  this.numberOfTeeth = 15
    for (var i=0; i<this.numberOfTeeth; i++){
      stroke(150)
      strokeWeight(1)
      triangle((-3*this.teethWidth/4)+this.teethWidth*2*i-this.teethWidth, -this.RlineY+this.teethHeight, this.teethWidth/2+this.teethWidth*2*i-this.teethWidth, -this.RlineY+this.teethHeight, -this.teethWidth/2+this.teethWidth*2*i-this.teethWidth, -this.RlineY)
      triangle((this.teethWidth/4)+this.teethWidth*2*i-this.teethWidth, -this.RlineY, -this.teethWidth/2+this.teethWidth*2*i-this.teethWidth, -this.RlineY, this.teethWidth/2+this.teethWidth*2*i-this.teethWidth, -this.RlineY+this.teethHeight)
      stroke(150)
      strokeWeight(1.5)
      line(-this.teethWidth/2+this.teethWidth*2*i-this.teethWidth, -this.RlineY, this.teethWidth/2+this.teethWidth*2*i-this.teethWidth, -this.RlineY+this.teethHeight)
    }

    this.rack_Y_size = this.numberOfTeeth*this.teethWidth*2
    this.rack_X_size = 70
    fill(150)
    rect((-3*this.teethWidth/4)-this.teethWidth, -this.RlineY+this.teethHeight,this.rack_Y_size, this.rack_X_size)

    noStroke()
    fill(255,0,0)
    ellipse((-3*this.teethWidth/4)-this.teethWidth, -this.RlineY+this.teethHeight+this.rack_X_size/2,8,8)
    // point F1
    pop()

    if(this.change_direction == 1){
      this.rack_change_apply = abs(this.rack_increase_change)*-1
    }else{
      this.rack_change_apply = abs(this.rack_increase_change)
    }

    this.rack_Y = this.rack_Y-this.rack_change_apply

  }

  this.drawPinionGear = function(radius, centerPositionX, centerPositionY,motorType){
    this.numberOfTeeth=radius/4
    this.teethHeight=0.25*radius
    this.teethAngle=TWO_PI/this.numberOfTeeth
    this.teethWidth=sin(this.teethAngle/2)*radius
    this.lineY=cos(this.teethAngle/2)*radius+this.teethHeight

    push()

    translate(centerPositionX, centerPositionY)
    rotate(this.rotationAngle)

    if (motorType == 180){
      this.TN = 1
      if (this.rotationAngle >PI){
        this.rotationAngle = PI
      }
      if (this.rotationAngle <0){
        this.rotationAngle = 0
      }

      if(this.rotationAngle==PI || this.rotationAngle==0){
        this.angle_increase = this.angle_increase*-1
        this.change_direction = this.change_direction*-1
      }
    }

    else if (motorType == 360){

      this.TN = 2/3
      this.angle_increase = .01
      if(this.rotationAngle>=2*PI){
        this.rotationAngle = 0
      }

      if(this.rotationAngle>=PI || this.rotationAngle<=0){
        this.change_direction = this.change_direction*-1
      }

    }
    this.rotationAngle = this.rotationAngle + this.angle_increase


     fill(150)
     stroke(255)
    // this.numberOfTeeth = 2
    for (var i=0; i<this.numberOfTeeth*this.TN; i++)
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

    ellipse(0,0, 2*(-this.lineY+this.teethHeight), 2*(-this.lineY+this.teethHeight))
    stroke(color(tempC))
    strokeWeight(5)
    fill(0)
    ellipse(0,0,20,20)

    pop()

    this.centerPositionX_rack = centerPositionX - this.radius*2 - this.teethHeight
    this.drawRackGear(radius,this.centerPositionX_rack,centerPositionY-50)

  }

  this.init = function(){
  // init all the variables inside the class (instance vars) here.
    this.t1 = new Turtle()
    this.t2 = new Turtle()
    this.dist_a = 60
    this.dist_b = 240
    this.dist_c = 50
    this.dist_d = 150
    this.dist_e = 250
    this.centerwidth = 15  // base length
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

  }

  this.opencloseUI = function(){

    push()
    translate(20,40)

    fill(150)
    triangle(200,55,40,10,50,55)
    stroke(150)
    line(115,50,200,130) // side D:

    for(var i=55; i<130;i=i+8){
      line(200,i,200,i+4)
    }

    noStroke()
    fill(0)
    ellipse(200,55,6,6)
    ellipse(200,130,6,6)

    fill(0)
    text("A", 30,40)
    text("B", 115,30)
    text("C", 80,73)
    text("D", 165,73)
    text("E", 145, 105)

  }

}
