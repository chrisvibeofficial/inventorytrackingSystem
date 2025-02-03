const userModel = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, location } = req.body;
    const existingEmail = await userModel.findOne({ where: { email: email } });
    const checkPhonNumberLength = await userModel.findOne({ where: { phoneNumber: phoneNumber } });

    if (existingEmail) {
      return res.status(400).json(`${email} has already being used`)
    }

    if (phoneNumber.length > 11) {
      return res.status(400).json(`Phone number is more than 11 digits`)
    } else if (phoneNumber.length < 11) {
      return res.status(400).json(`Phone number is not complete`)
    }

    const ran1 = Math.floor(Math.random() * 1000);
    const ran2 = Math.floor(Math.random() * 100);
    const ID = 'UID' + ran1 + 'REG' + ran2;

    const userInfo = {
      id: ID,
      fullName,
      email,
      phoneNumber,
      location
    }

    const newUser = await userModel.create(userInfo);
    res.status(201).json({
      message: 'User created successfully',
      data: newUser
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    })
  }
}

exports.getUsers = async (req, res) => {
  try {
    const allUsers = await userModel.findAll();
    res.status(200).json({
      message: 'List of all users',
      data: allUsers
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    })
  }
}


exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const checkUser = await userModel.findOne({ where: { id: id } });

    if (checkUser.length < 1) {
      return res.status(404).json('User not found')
    }

    const user = await userModel.findOne({ where: { id: checkUser.dataValues.id } });
    res.status(200).json({
      message: 'Check user below',
      data: user
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    })
  }
}


exports.updateUserName = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName } = req.body;
    const checkUser = await userModel.findOne({ where: { id: id } });

    if (checkUser.length < 1) {
      return res.status(404).json('User not found')
    }

    const data = { fullName };
    await userModel.update(data, { where: { id: checkUser.dataValues.id } });
    res.status(200).json('Name has been updated');
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    })
  }
}


exports.updatePhoneNumber = async (req, res) => {
  try {
    const { id } = req.params;
    const { phoneNumber } = req.body;
    const checkUser = await userModel.findOne({ where: { id: id } });

    if (checkUser.length < 1) {
      return res.status(404).json('User not found')
    }

    const data = { phoneNumber };
    await userModel.update(data, { where: { id: checkUser.dataValues.id } });
    res.status(200).json('Phone number has been updated');
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    })
  }
}


exports.updatelocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { location } = req.body;
    const checkUser = await userModel.findOne({ where: { id: id } });

    if (checkUser.length < 1) {
      return res.status(404).json('User not found')
    }

    const data = { location };
    await userModel.update(data, { where: { id: checkUser.dataValues.id } });
    res.status(200).json('Location has been updated');
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    })
  }
}


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const checkUser = await userModel.findOne({ where: { id: id } });

    if (checkUser.length < 1) {
      return res.status(404).json('User not found')
    }

    await userModel.destroy({ where: { id: checkUser.dataValues.id } });
    res.status(200).json('User has been deleted successfully')
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    })
  }
}