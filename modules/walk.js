function Walk(){

  var startingX = 270/2 // center X: width/2 + left gray panel width*1/2
  var startingY = 100   // center Y: height/2-100

  var angle = 0
  var _this = this

  this.init = function(){

    //_this.t5 = new Turtle()
    _this.t6 = new Turtle()
    this.L1 = 30
    this.dist_a = 150
    this.dist_b = 150
    this.dist_c = 120
    this.dist_d = 150
    this.dist_e = 180
    this.dist_f = 180

    this.dist_g = 160
//    this.dist_g = sqrt(sq(this.dist_e)-sq(this.dist_a))

    //triangle AEG
    this.step1_AG = sq(this.dist_a) + sq(this.dist_g) - sq(this.dist_e)      //numerator
    this.step2_AG = 2*this.dist_a*this.dist_g                      // denominator
    this.angle_cosine_AG = this.step1_AG/this.step2_AG
    this.step3_AG = acos(this.angle_cosine_AG)
    this.angle_AG = degrees(this.step3_AG)

    this.step1_EG = sq(this.dist_e) + sq(this.dist_g) - sq(this.dist_a)      //numerator
    this.step2_EG = 2*this.dist_e*this.dist_g                      // denominator
    this.angle_cosine_EG = this.step1_EG/this.step2_EG
    this.step3_EG = acos(this.angle_cosine_EG)
    this.angle_EG = degrees(this.step3_EG)

    this.step1_AE = sq(this.dist_e) + sq(this.dist_a) - sq(this.dist_g)      //numerator
    this.step2_AE = 2*this.dist_e*this.dist_a                      // denominator
    this.angle_cosine_AE = this.step1_AE/this.step2_AE
    this.step3_AE = acos(this.angle_cosine_AE)
    this.angle_AE = degrees(this.step3_AE)

    //triangle CFG
    this.step1_CG = sq(this.dist_c) + sq(this.dist_g) - sq(this.dist_f)      //numerator
    this.step2_CG = 2*this.dist_c*this.dist_g                      // denominator
    this.angle_cosine_CG = this.step1_CG/this.step2_CG
    this.step3_CG = acos(this.angle_cosine_CG)
    this.angle_CG = degrees(this.step3_CG)

    this.step1_FG = sq(this.dist_f) + sq(this.dist_g) - sq(this.dist_c)      //numerator
    this.step2_FG = 2*this.dist_f*this.dist_g                      // denominator
    this.angle_cosine_FG = this.step1_FG/this.step2_FG
    this.step3_FG = acos(this.angle_cosine_FG)
    this.angle_FG = degrees(this.step3_FG)

    this.step1_CF = sq(this.dist_f) + sq(this.dist_c) - sq(this.dist_g)      //numerator
    this.step2_CF = 2*this.dist_f*this.dist_c                      // denominator
    this.angle_cosine_CF = this.step1_CF/this.step2_CF
    this.step3_CF = acos(this.angle_cosine_CF)
    this.angle_CF = degrees(this.step3_CF)



//   console.log((this.angle_FG+this.angle_CG+this.angle_CF))
  }
  this.init2 = function(){

    // rotating center
    this.w_center_x2 = 75*1/2*sin(radians(angle))+this.w_center_x
    this.w_center_y2 = 75*1/2*cos(radians(angle))+this.w_center_y

    this.rad = atan2(this.w_center_y2-this.AG_y,this.w_center_x2-this.AG_x)
    this.degD = this.rad/PI*180
    this.temp_L_x2 = sqrt(sq(this.w_center_x2-this.AG_x)+sq(this.w_center_y2-this.AG_y))

    //triangle AE-L up
    this.step1_AL = sq(this.dist_a) + sq(this.temp_L_x2) - sq(this.dist_e)
    this.step2_AL = 2*this.dist_a*this.temp_L_x2
    this.angle_cosine_AL = this.step1_AL/this.step2_AL
    this.step3_AL = acos(this.angle_cosine_AL)
    this.angle_AL = degrees(this.step3_AL)

    this.turn_L1 = 180 - ((90-this.degD) + this.angle_AL);
    // console.log("here is init2 :", this.turn_L1)
/// Look Jeeeun -> here is the mysterious value
  }

  this.drawWalk = function(){
    this.init2()
    this.t5 = new Turtle()

    // start Calcurate
    this.t5.penup()
    this.t5.forward(startingY)
    this.t5.right(90)
    this.t5.forward(startingX) //center

    this.w_center_x = this.t5.x
    this.w_center_y = this.t5.y

    this.t5.back(this.dist_g)
    this.t5.left(90)

    this.AG_x = this.t5.x  // AG: X: 585
    this.AG_y = this.t5.y  // AG: Y: 230
    console.log(this.turn_L1)
/// Look Jeeeun -> here is the mysterious place

    this.t5.right(90)
    this.t5.forward(this.dist_g)
    this.t5.back(startingX)
    this.t5.left(90)
    this.t5.back(startingY)

    // var na = this.turn_L1
    // _this.t5.right(na)

    this.t5.right(this.turn_L1)
    this.t5.forward(this.dist_a)

    this.AE_x = this.t5.x
    this.AE_y = this.t5.y

    this.t5.back(this.dist_a)
    this.t5.left(this.turn_L1)


    noStroke()
    fill(150)
    ellipse(this.w_center_x,this.w_center_y,100,100)  // center Gear
    fill(0)
    ellipse(this.w_center_x,this.w_center_y,10,10)  // center Gear
    ellipse(this.AG_x,this.AG_y,10,10)  // center Gear
    fill(color(tempC))

      ellipse(this.w_center_x2,this.w_center_y2,10,10) // center rotating pivot

      ellipse(this.AAA_x,this.AAA_y,40,40)
  //  ellipse(this.w_center_x2,this.w_center_y2,10,10) // center rotating pivot
    stroke(color(tempC))
//    line(this.w_center_x2,this.w_center_y2,this.AG_x,this.AG_y)
  //  line(this.AG_x,this.AG_y,this.AE_x,this.AE_y)


    angle = angle+.5
    if(angle>360){
      angle = 0
    }


  }


}
