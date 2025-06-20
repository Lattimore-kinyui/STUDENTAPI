Router.post('/register', usercontroller.register = async (req, res, next) => {

  try {
  const result = await authSchema.validateAsync(req.body);
  const Exits = await User.findOne({ email:email });

  if(Exits) throw createError.conflict(`${email} has been registered`);
  const user = new User(result);

  const savedUser = await user.save();

  res.send(savedUser);

  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
});
const express = require('express');