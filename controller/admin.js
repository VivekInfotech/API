var ADMIN = require('../models/admin')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


exports.sequre = async function (req, res, next) {
    try {

        console.log("Demoooooo");

        let token = req.headers.admintoken
        if(!token){
            throw new Error('Please Send Token')
        }

        var decoded = jwt.verify(token, 'SURAT');

        let adminCheck = await ADMIN.findById(decoded.id)
        if(!adminCheck){
            throw new Error('Admin Not Found')
        }

        next()
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.adminSignup = async function (req, res, next) {
    try {

        req.body.password = await bcrypt.hash(req.body.password, 8)

        let signupData = await ADMIN.create(req.body)

        res.status(201).json({
            status: "Success",
            message: "Admin Signup Successfully",
            data: signupData
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.adminLogin = async function (req, res, next) {
    try {

        let LoginData = await ADMIN.findOne({email : req.body.email})
        if(!LoginData){
            throw new Error('Admin Not Found')
        }

        let passComp = await bcrypt.compare(req.body.password,LoginData.password)
        if(!passComp){
            throw new Error('Invalid Password')
        }

        var token = jwt.sign({ id: LoginData._id }, 'SURAT');

        res.status(201).json({
            status: "Success",
            message: "Admin Login Successfully",
            data: LoginData,
            token
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.adminFind = async function (req, res, next) {
    try {

        let data = await ADMIN.find()

        res.status(201).json({
            status: "Success",
            message: "Admin Find Successfully",
            data
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.adminDelete = async function (req, res, next) {
    try {

        let deleteData = await ADMIN.findByIdAndDelete(req.params.deleteId)
        if(!deleteData){
            throw new Error('Admin Not Found')
        }

        res.status(201).json({
            status: "Success",
            message: "Admin Delete Successfully",
            data: deleteData
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.adminUpdate = async function (req, res, next) {
    try {

        let UpdateData = await ADMIN.findByIdAndUpdate(req.params.updateId,req.body)
        if(!UpdateData){
            throw new Error('Admin Not Found')
        }

        res.status(201).json({
            status: "Success",
            message: "Admin Update Successfully",
            data: UpdateData
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}