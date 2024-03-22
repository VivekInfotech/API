const ICON = require('../models/icon');
const INTERFACE = require('../models/interface');
const ANIMATED = require('../models/animated');
const POPULAR = require('../models/popular-Icon');

exports.tagFindByName = async function (req, res, next) {
    try {
        // Fetch data from all models concurrently
        const [icon, interfaceData, animated, popularIcon] = await Promise.all([
            ICON.find({ tag: req.params.tagName }),
            INTERFACE.find({ tag: req.params.tagName }),
            ANIMATED.find({ tag: req.params.tagName }),
            POPULAR.find({ tag: req.params.tagName })
        ]);

        const data = {
            icon: icon.map(el => el),
            interfaceData: interfaceData.map(el => el),
            animated: animated.map(el => el),
            popularIcon: popularIcon.map(el => el)
        };

        // const data = [].concat(icon, interfaceData, animated, popularIcon);

        res.status(200).json({
            status: "Success",
            message: "Tag Name Find Successfully",
            data: data
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
};

exports.tagFind = async function (req, res, next) {
    try {
        const [icon, interfaceData, animated, popularIcon] = await Promise.all([
            ICON.find(),
            INTERFACE.find(),
            ANIMATED.find(),
            POPULAR.find()
        ]);

        const data = {
            icon: icon.map(el => el.tag),
            interfaceData: interfaceData.map(el => el.tag),
            animated: animated.map(el => el.tag),
            popularIcon: popularIcon.map(el => el.tag)
        };

        // const allTags = [].concat(data.icon, data.interfaceData, data.animated, data.popularIcon);

        res.status(201).json({
            status: "Success",
            message: "All Tag Names Found Successfully",
            data: data
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
};
