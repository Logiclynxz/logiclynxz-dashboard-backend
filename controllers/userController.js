const User = require('../models/UserModel')
const mongoose = require("mongoose");

const getUsers = async (req, res) =>  {

}

const getUser = async (req, res) => {
    const { id } = req.params;
}

const createUser = async (req, res) => {

}

const updateUser = async (req, res) => {
    const { id } = req.params;
}

const archiveUser = async (req, res) => {
    const { id } = req.params;
}

const loginUser = async (req, res) => {

}

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    archiveUser,
    loginUser
  };
  