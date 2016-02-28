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
  this.rack_Y_reset5 = false
  this.rack_Y_reset6 = false
  this.rack_Y_reset7 = false
  this.rack_Y_reset8 = false

  this.change_direction = -1

  this.angle_increase = 0.01 //  to rotate pinion (circular) gear

  this.compGear = function(pair_petal,gear_size,motorType){
    //pinion gear is circular / rack gear is linear gear
    this.motorType = motorType

    if(this.motorType ==180){
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
            this.rack_Y_reset5 = false
            this.rack_Y_reset6 = false
            this.rack_Y_reset7 = false
            this.rack_Y_reset8 = false
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
            this.rack_Y_reset5 = false
            this.rack_Y_reset6 = false
            this.rack_Y_reset7 = false
            this.rack_Y_reset8 = false
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
            this.rack_Y_reset5 = false
            this.rack_Y_reset6 = false
            this.rack_Y_reset7 = false
            this.rack_Y_reset8 = false
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
            this.rack_Y_reset5 = false
            this.rack_Y_reset6 = false
            this.rack_Y_reset7 = false
            this.rack_Y_reset8 = false
          }

      }
    }else if(this.motorType ==360){
      if(gear_size ==1){
        this.radius= 48

        if (this.rack_Y_reset5 == false){
          this.rotationAngle = PI+PI/2-.18
          this.rack_Y = height/2-53

          this.rack_Y_reset5 = true
          this.rack_Y_reset1 = false
          this.rack_Y_reset2 = false
          this.rack_Y_reset3 = false
          this.rack_Y_reset4 = false
          this.rack_Y_reset6 = false
          this.rack_Y_reset7 = false
          this.rack_Y_reset8 = false
        }
      }else if(gear_size ==2){
        this.radius= 56
        this.rack_increase_change = .57

        if (this.rack_Y_reset6 == false){
          this.rotationAngle = PI+PI/4
          this.rack_Y = height/2-66

          this.rack_Y_reset6 = true
          this.rack_Y_reset1 = false
          this.rack_Y_reset2 = false
          this.rack_Y_reset3 = false
          this.rack_Y_reset4 = false
          this.rack_Y_reset5 = false
          this.rack_Y_reset7 = false
          this.rack_Y_reset8 = false
        }

      }else if(gear_size ==3){
        this.radius= 64
        this.rack_increase_change = .63


        if (this.rack_Y_reset7 == false){
          this.rotationAngle = PI+PI/4+.2
          this.rack_Y = height/2-100

          this.rack_Y_reset7 = true
          this.rack_Y_reset1 = false
          this.rack_Y_reset2 = false
          this.rack_Y_reset3 = false
          this.rack_Y_reset4 = false
          this.rack_Y_reset5 = false
          this.rack_Y_reset6 = false
          this.rack_Y_reset8 = false
        }

      }else if(gear_size ==4){
        this.radius= 72
        this.rack_increase_change = .72

        if (this.rack_Y_reset8 == false){
          this.rotationAngle = PI+PI/4+.43
          this.rack_Y = height/2-138

          this.rack_Y_reset8 = true
          this.rack_Y_reset1 = false
          this.rack_Y_reset2 = false
          this.rack_Y_reset3 = false
          this.rack_Y_reset4 = false
          this.rack_Y_reset5 = false
          this.rack_Y_reset6 = false
          this.rack_Y_reset7 = false
        }

      }

    }
    this.centerPositionY_rack = height/2+150

    this.centerPositionX_pinion = temp_windowWidth/2+200

    this.drawPinionGear(this.radius, this.centerPositionX_pinion, this.centerPositionY_rack,motorType)
}

  this.drawRackGear = function(radius, centerPositionX_rack,centerPositionY_rack,motorType){

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

    this.drawOP_X = -3*this.teethWidth/4-this.teethWidth
    this.drawOP_Y = -this.RlineY+this.teethHeight+this.rack_X_size/2

    fill(255,0,255)
    ellipse((-3*this.teethWidth/4)-this.teethWidth, -this.RlineY+this.teethHeight+this.rack_X_size/2,15,15)
    pop()


    if (motorType == 180){
      if(this.change_direction == 1){
        this.rack_change_apply = abs(this.rack_increase_change)*-1
      }else{
        this.rack_change_apply = abs(this.rack_increase_change)
      }
    }else if (motorType == 360){
      if (radius == 48){
        if(this.change_direction == 1){
          this.rack_change_apply = abs(this.rack_increase_change)*-3
        }else{
          this.rack_change_apply = abs(this.rack_increase_change)*.99
        }
      }else if (radius == 56){
        if(this.change_direction == 1){
          this.rack_change_apply = abs(this.rack_increase_change)*-3
        }else{
          this.rack_change_apply = abs(this.rack_increase_change)*.9999
        }
      }else if (radius == 64){
        if(this.change_direction == 1){
          this.rack_change_apply = abs(this.rack_increase_change)*-4.12
        }else{
          this.rack_change_apply = abs(this.rack_increase_change)*1.025
        }
      }else if (radius == 72){
        if(this.change_direction == 1){
          this.rack_change_apply = abs(this.rack_increase_change)*-4.14
        }else{
          this.rack_change_apply = abs(this.rack_increase_change)*1.033
        }
      }
    }
    this.rack_Y = this.rack_Y-this.rack_change_apply

    this.drawOpenClose(centerPositionX_rack-this.drawOP_X, this.rack_Y+this.drawOP_Y/2,1)
    //draw OPEN & CLOSE
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
    } else if (motorType == 360){
      this.TN = 2/3
      this.angle_increase = .0051

      this.rotationAngle = this.rotationAngle + this.angle_increase

      if(this.rotationAngle>=2*PI){
        this.rotationAngle = 0
      }
/////FIX IT : gear 2 0~PI*3/2
      if (radius == 48 || radius == 56){
        if(this.rotationAngle>=PI*3/2){
          this.change_direction = 1
        }else{
          this.change_direction = -1
        }
      }else if(radius == 64 || radius == 72){
        if(this.rotationAngle>=PI*8/5){
          this.change_direction = 1
        }else{
          this.change_direction = -1
        }
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
    this.drawRackGear(radius,this.centerPositionX_rack,centerPositionY-50, motorType)

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
    this.dist_aMin = 50
    this.dist_aMax = 400
    this.dist_bMin = 50
    this.dist_bMax = 400
    this.dist_cMin = 50
    this.dist_cMax = 400
    this.dist_dMin = 50
    this.dist_dMax = 400
    this.dist_eMin = 50
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

  this.init = function() {
    this.t1 = new Turtle()
    this.t2 = new Turtle()

    this.dist_a = 60
    this.dist_b = 240
    this.dist_c = 50
    this.dist_d = 150
    this.dist_e = 250

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
    this.centerwidth = 15  // base length
  }

  this.drawOpenClose = function(tempX,tempY,side){

    this.dist_f = sqrt(sq(this.dist_e)-sq(this.dist_d))        // f is calculated from given distances d and e.
    this.dist_f2 = this.dist_f-this.dist_f1

    this.step1_f2 = sq(this.dist_d) + sq(this.dist_e) - sq(this.dist_f2)      //numerator
    this.step2_f2 = 2*this.dist_d*this.dist_e                       // denominator
    this.angle_cosine_f2 = this.step1_f2/this.step2_f2
    this.step3_f2 = acos(this.angle_cosine_f2)
    this.angle_f2 = degrees(this.step3_f2)

    this.step1_d = sq(this.dist_e) + sq(this.dist_f2) - sq(this.dist_d)
    this.step2_d = 2*this.dist_e*this.dist_f2
    this.angle_cosine_d = this.step1_d/this.step2_d
    this.step3_d = acos(this.angle_cosine_d)
    this.angle_d = degrees(this.step3_d)

    this.step1_a = sq(this.dist_b) + sq(this.dist_c+this.dist_d) - sq(this.dist_a)
    this.step2_a = 2*this.dist_b*(this.dist_c+this.dist_d)
    this.angle_cosine_a = this.step1_a/this.step2_a
    this.step3_a = acos(this.angle_cosine_a)
    this.angle_a = degrees(this.step3_a)

    this.step1_cd = sq(this.dist_a) + sq(this.dist_b) - sq(this.dist_c+this.dist_d)
    this.step2_cd = 2*this.dist_a*this.dist_b
    this.angle_cosine_cd = this.step1_cd/this.step2_cd
    this.step3_cd = acos(this.angle_cosine_cd)
    this.angle_cd = degrees(this.step3_cd)


    this.t1.penup()      // Position the drawing starting point.
    this.t1.forward(height/2-tempY)
    this.t1.left(90)
    this.t1.forward(width/2-tempX)

    this.ef_x = this.t1.x
    this.ef_y = this.t1.y

//   console.log("F: "+this.dist_f)
    // Move turtle to point DE.
/*    this.t1.left(this.angle_d)
    this.t1.forward(this.dist_e)

    this.de_x = this.t1.x
    this.de_y = this.t1.y

    this.t1.back(this.dist_e)
    this.t1.right(this.angle_d)*/

    this.t1.back(width/2-tempX)
    this.t1.right(90)
    this.t1.back(height/2-tempY)

    noStroke()
    fill(255,0,0)
//    ellipse(this.ef_x,this.ef_y,10,10)
//    ellipse(this.ef_x,115,10,10)

   //console.log(this.)
  }

}
