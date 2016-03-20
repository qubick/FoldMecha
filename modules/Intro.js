function Intro(){
  this.f1 = 0
  this.change_f1=0.5
  // to animate OpenClose

  this.radius = 40
  this.teethHeight=0.25*this.radius
  this.rotationAngle=0
  this.angle_increase = 0.02
  this.in_gear = this.radius-27
  // to animate Flapping

  var turn_L1 = 0
  var change_L1 = 1
  // to animate Walking

  this.button_back = function(){

    if(mouseX>=250 && mouseX<=450 && mouseY>=150 && mouseY<=350){
      fill(250)
      rect(250,150,200,200)
    }else{
      fill(220)
      rect(250,150,200,200)
    }

    if(mouseX>=500 && mouseX<=700 && mouseY>=150 && mouseY<=350){
      fill(250)
      rect(500,150,200,200)
    }else{
      fill(220)
      rect(500,150,200,200)
    }

    if(mouseX>=750 && mouseX<=950 && mouseY>=150 && mouseY<=350){
      fill(250)
      rect(750,150,200,200)
    }else{
      fill(220)
      rect(750,150,200,200)
    }
  }

  this.button_font = function(){

    noStroke()
    if(mouseX>=250 && mouseX<=450 && mouseY>=150 && mouseY<=350){
      fill(0)
      rect(250,320,200,30)
    }else{
      fill(120)
      rect(250,320,200,30)
    }

    if(mouseX>=500 && mouseX<=700 && mouseY>=150 && mouseY<=350){
      fill(0)
      rect(500,320,200,30)
    }else{
      fill(120)
      rect(500,320,200,30)
    }

    if(mouseX>=750 && mouseX<=950 && mouseY>=150 && mouseY<=350){
      fill(0)
      rect(750,320,200,30)
    }else{
      fill(120)
      rect(750,320,200,30)
    }

    if(mouseX>=250 && mouseX<=450 && mouseY>=400 && mouseY<=430){
      fill(0)
      rect(250,400,200,30)
    }else{
      fill(120)
      rect(250,400,200,30)
    }

    if(mouseX>=500 && mouseX<=700 && mouseY>=400 && mouseY<=430){
      fill(0)
      rect(500,400,200,30)
    }else{
      fill(120)
      rect(500,400,200,30)
    }

    if(mouseX>=750 && mouseX<=950 && mouseY>=400 && mouseY<=430){
      fill(0)
      rect(750,400,200,30)
    }else{
      fill(120)
      rect(750,400,200,30)
    }

    fill(255)
    text("OPENING & CLOSING",275,340)
    text("FLAPPING",565,340)
    text("WALKING",815,340)
    text("MY SKETCHBOOK",285,420)
    text("GALLERY",567,420)
    text("ABOUT",823,420)
  }
  this.OpenClose = function(side,mul,tempX,tempY){

    this.t1 = new Turtle()
    this.t2 = new Turtle()
    this.a = 50
    this.b = 150
    this.c = 40
    this.d = 90
    this.e = 140
    this.centerwidth = 15  // base length

    this.f = sqrt(sq(this.e)-sq(this.d))        // f is calculated from given distances d and e.
    this.f2 = this.f-this.f1

    this.step1_f2 = sq(this.d) + sq(this.e) - sq(this.f2)      //numerator
    this.step2_f2 = 2*this.d*this.e                       // denominator
    this.angle_cosine_f2 = this.step1_f2/this.step2_f2
    this.step3_f2 = acos(this.angle_cosine_f2)
    this.angle_f2 = degrees(this.step3_f2)

    this.step1_d = sq(this.e) + sq(this.f2) - sq(this.d)
    this.step2_d = 2*this.e*this.f2
    this.angle_cosine_d = this.step1_d/this.step2_d
    this.step3_d = acos(this.angle_cosine_d)
    this.angle_d = degrees(this.step3_d)

    this.step1_a = sq(this.b) + sq(this.c+this.d) - sq(this.a)
    this.step2_a = 2*this.b*(this.c+this.d)
    this.angle_cosine_a = this.step1_a/this.step2_a
    this.step3_a = acos(this.angle_cosine_a)
    this.angle_a = degrees(this.step3_a)

    this.step1_cd = sq(this.a) + sq(this.b) - sq(this.c+this.d)
    this.step2_cd = 2*this.a*this.b
    this.angle_cosine_cd = this.step1_cd/this.step2_cd
    this.step3_cd = acos(this.angle_cosine_cd)
    this.angle_cd = degrees(this.step3_cd)

    this.t1.penup()      // Position the drawing starting point.
    this.t1.back(20+tempY)
    this.t1.left(90*side)
    this.t1.forward(10+tempX)
    this.t1.right(90*side)

    /* WALK THROUGH FIGURE AND SET CONTROL POINTS. */
    this.t1.forward(this.f1)     // Move turtle to base of figure.

    this.ef_x = this.t1.x
    this.ef_y = this.t1.y

    this.t1.penup()         // Move turtle to point DE.
    this.t1.left(this.angle_d*side)
    this.t1.forward(this.e)

    this.de_x = this.t1.x
    this.de_y = this.t1.y

    this.t1.penup()        // Move turtle to point DF.
    this.t1.right((180-this.angle_f2)*side)
    this.t1.forward(this.d)

    this.df_x = this.t1.x
    this.df_y = this.t1.y      // Store point DF coordinates. df_x is given as the fixed value at the top

    /* NOW WE ARE DONE WALKING THE FIGURE, AND LET'S RETURN TO THE HOME POINT.*/
    this.t1.penup()       // Return to start position
    this.t1.back(this.d)
    this.t1.left((180-this.angle_f2)*side)
    this.t1.back(this.e)
    this.t1.right((this.angle_d)*side)
    this.t1.back(this.f1)
    this.t1.left(90*side)
    this.t1.back(10+tempX)
    this.t1.right(90*side)
    this.t1.forward(20+tempY)
    /*   T2 is for the upper part of the petal structure :triangle ab(c+d)     */
    this.t2.penup()
    this.t2.back(20+tempY)
    this.t2.left(90*side)
    this.t2.forward(10+tempX)
    this.t2.right(90*side)
    this.t2.forward(this.f)
    this.t2.left((180-this.angle_a-(180-this.angle_f2-this.angle_d))*side)
    this.t2.forward(this.b)

    this.ab_x = this.t2.x
    this.ab_y = this.t2.y   // Store point AB coordinates.

    this.t2.penup()
    this.t2.left((180-this.angle_cd)*side)
    this.t2.forward(this.a)

    this.ac_x = this.t2.x
    this.ac_y = this.t2.y  // Store point AC coordinates.

    /* Return to start position */
    this.t2.penup()
    this.t2.back(this.a)
    this.t2.right((180-this.angle_cd)*side)
    this.t2.back(this.b)
    this.t2.right((180-this.angle_a-(180-this.angle_f2-this.angle_d))*side)
    this.t2.back(this.f)
    this.t2.left(90*side)
    this.t2.back(10+tempX)
    this.t2.right(90*side)
    this.t2.forward(20+tempY)

    /*  Drawing Part is here */
    noStroke()
    fill(color(tempC))
    triangle(mul*(this.df_x+100+(this.centerwidth*-1*side)),mul*(this.df_y),mul*(this.de_x+100+(this.centerwidth*-1*side)),mul*(this.de_y),mul*(this.ab_x+100+(this.centerwidth*-1*side)),mul*(this.ab_y))
    triangle(mul*(this.ac_x+100+(this.centerwidth*-1*side)),mul*(this.ac_y),mul*(this.de_x+100+(this.centerwidth*-1*side)),mul*(this.de_y),mul*(this.ab_x+100+(this.centerwidth*-1*side)),mul*(this.ab_y))
    ellipse(mul*(this.ef_x+100+(this.centerwidth*-1*side)),mul*(this.ef_y),5,5)

    stroke(color(tempC))
    line(mul*(this.de_x+100+(this.centerwidth*-1*side)),mul*(this.de_y),mul*(this.ef_x+100+(this.centerwidth*-1*side)),mul*(this.ef_y))
    line(mul*(this.df_x+100+(this.centerwidth*-1*side)),mul*(this.df_y),mul*(this.df_x+100+(this.centerwidth/2*side)),mul*(this.df_y))

    if(this.angle_d+this.angle_f2>150 || this.angle_d+this.angle_f2 <this.angle_a){
      this.change_f1 = this.change_f1*-1
    }

    this.f1=this.f1+this.change_f1
  }

  this.compFlapping = function(){

    this.flapping(width/2-30,height/2-55,1,120,100)
    this.flapping(width/2+30,height/2-55,-1,-110,100)
    stroke(color(tempC))
    line(width/2+8,height/2-90,width/2-8,height/2-90)
  }
  this.flapping = function(centerPositionX,centerPositionY,side,XX,YY){
    this.t3 = new Turtle()
    this.t4 = new Turtle()
    this.dist_a = 65
    this.dist_b = 30
    this.dist_c = 85
    this.dist_d = 20
    this.dist_e = 90
    this.dist_f = 80
    this.xx = XX
    this.yy = YY

    this.lengthGap = 10
    this.rotationDirection = side
    this.rotation_interlock = (this.radius*2/3)-3

    this.wing_axisX = -1*(50+(this.radius+this.teethHeight/2))-20 + (this.xx-15)*side
    this.wing_axisY = this.yy-10
    this.wing_topLengthX = 18

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

    this.t3.penup()
    this.t3.forward(this.wing_axisY)
    this.t3.left(90*side)
    this.t3.forward((this.wing_axisX+this.wing_topLengthX*side)*side)

    this.c2_x = this.t3.x
    this.c2_y = this.t3.y      // point C2: where the wing starting point.

    var leftTurn = this.angle_f + this.angle_x

    this.t3.right(90*side)
    this.t3.left((180-leftTurn)*side)
    this.t3.forward(this.dist_e)

    this.b_x = this.t3.x
    this.b_y = this.t3.y    // point B: the edge of the wing

    this.t3.back(this.dist_e)
    this.t3.right(this.angle_c2*side)
    this.t3.forward(this.dist_d)

    this.a_x = this.t3.x
    this.a_y = this.t3.y    // point A: headside triangle

    this.t3.left((180-(this.angle_a+this.angle_e))*side)
    this.t3.forward(this.dist_b)

    this.c_x = this.t3.x
    this.c_y = this.t3.y    // point C: top of the wing triangle

  // CACULATION IS DONE _ COME BACK TO HOME
    this.t3.back(this.dist_b)
    this.t3.right((180-(this.angle_a+this.angle_e))*side)

    this.t3.back(this.dist_d)
    this.t3.left(this.angle_c2*side)

    this.t3.right((180-leftTurn)*side)
    this.t3.left(90*side)

    this.t3.back((this.wing_axisX+this.wing_topLengthX*side)*side)
    this.t3.right(90*side)
    this.t3.back(this.wing_axisY)

    var theta = this.rotationAngle*this.rotationDirection+this.rotation_interlock
    var len = sqrt(pow(this.in_gear,2)+pow(this.in_gear,2))

    push()
    translate(centerPositionX,centerPositionY)

    var rad = -.11 // due to some mismatch

    this.rotationAngle = this.rotationAngle + this.angle_increase

    if(this.rotationAngle >= 2*PI){
          this.rotationAngle = 0
    }

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
    line(this.pinion_Xdot,this.pinion_Ydot,this.b_x-centerPositionX,this.b_y-centerPositionY) // side f
    noStroke()
    fill(color(tempC))
    ellipse(this.pinion_Xdot,this.pinion_Ydot, 5,5) //moving pivot on gears

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
  }

  this.walking = function(){
    this.t5 = new Turtle()
    this.t6 = new Turtle()
    this.L1 = 10
    this.dist_A = 30
    this.dist_G = 40
 // from fixed center to the rotating center
  //  turn_L1 = 100
    turn_L1 = turn_L1+change_L1
    if(turn_L1 == 360){
      turn_L1 = 0
    }

    this.t5.penup()
    this.t5.forward(height/2-220)
    this.t5.right(90)
    this.t5.forward(850-width/2) //center

    this.w_center_x = this.t5.x
    this.w_center_y = this.t5.y

    this.t5.back(this.dist_G)

    this.AG_x = this.t5.x  // AG: X: 810
    this.AG_y = this.t5.y  // AG: Y: 220

//    console.log(this.dist_A)
//  console.log(this.angle_AG)

/*    this.t5.left(this.angle_AG)
    this.t5.forward(this.dist_A)

    this.AE_x = this.t5.x
    this.AE_y = this.t5.y

    this.t5.back(this.dist_A)
    this.t5.right(this.angle_AG)*/


    this.t5.forward(this.dist_G)
    this.t5.right(turn_L1)
    this.t5.forward(this.L1)

    this.w_center_x2 = this.t5.x
    this.w_center_y2 = this.t5.y

    this.t5.back(this.L1)
    this.t5.left(turn_L1)
    this.t5.back(850-width/2)
    this.t5.left(90)
    this.t5.back(height/2-220)

    this.dist_E = dist(this.w_center_x2,this.w_center_y2,this.AG_x,this.AG_y)
//triangle AEG
    this.step1_AG = sq(this.dist_A) + sq(this.dist_G) - sq(this.dist_E)      //numerator
    this.step2_AG = 2*this.dist_A*this.dist_G                       // denominator
    this.angle_cosine_AG = this.step1_AG/this.step2_AG
    this.step3_AG = acos(this.angle_cosine_AG)
    this.angle_AG = degrees(this.step3_AG)

/*
    this.step1_EG = sq(this.dist_A) + sq(this.dist_G) - sq(this.dist_E)      //numerator
    this.step2_EG = 2*this.dist_A*this.dist_G                       // denominator
    this.angle_cosine_EG = this.step1_AG/this.step2_AG
    this.step3_EG = acos(this.angle_cosine_AG)
    this.angle_EG = degrees(this.step3_AG)
*/

//    console.log("G: "+dist_E)
    noStroke()
    ellipse(this.w_center_x,this.w_center_y,5,5)
    ellipse(this.w_center_x2,this.w_center_y2,5,5)
    stroke(color(tempC))
    line(this.w_center_x2,this.w_center_y2,this.AG_x,this.AG_y)
  //  line(this.AG_x,this.AG_y,this.AE_x,this.AE_y)


  }

}
