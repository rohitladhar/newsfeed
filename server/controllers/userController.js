const User = require("../models/user");
exports.register = async (req, res) => {
  try {
    const {name , email,password} = req.body;
    const userExisted = await User.findOne({
      where: {
        email:email
      }
    });
    if(userExisted){
      res.status(401).json({message:"User Existed"});
    }else{
      const user = User.build({
        'name':name,
        'email':email,
        'password':password
      })

      try{
        await user.save()
        var token = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
        res.status(201).json({success:true,token:token});
      }
      catch(error){
        res.json(error)
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

exports.login = async (req, res) => {
  try {
    const {email,password} = req.body;
    const userExisted = await User.findOne({
      where: {
        email:email
      }
    });

    if(userExisted){
      if(userExisted.password==password){
        var token = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
        res.status(200).json({ success: true,token:token});
      }else{
        res.status(200).json({ success: false });
      }
    }else{
      res.status(200).json({ success: false });
    }

  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};