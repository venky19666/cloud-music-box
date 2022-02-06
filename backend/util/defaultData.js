const Sequelize = require('sequelize');

const moodData = require('../models/entities/Moods');

const fs = require('fs');

const path = require('path');

const rootDir = require('../util/nav-helper');
const MoodTypes = 
['Aggressive',
'Bitter',
'Bittersweet',
'Bleak',
'Dreamy',
'Driving',
'Elegant',
'Epic',
'Erotic',
'Exotic',
'Fun',
'Gentle',
'Gloomy',
'Graceful',
'Grim',
'Sad',
'Love',
'Motivate',
'Scary',
'Spicy'
];

const beforeStartApp = ()=>{
    MoodTypes.forEach(type=>{
        moodData.findOrCreate({where:{ name: type},default:{ name: type}}).then(([user,created])=>{
            // console.log(user.get({plain: true}));
            // console.log(created);
        })
    });
    if(!fs.existsSync(path.join(rootDir,'storage'))){
        fs.mkdirSync(path.join(rootDir,'storage'));
        if(!fs.existsSync(path.join(rootDir,'storage','data'))){
            fs.mkdirSync(path.join(rootDir,'storage','data'))
        }
        if(!fs.existsSync(path.join(rootDir,'storage','artist-data'))){
            fs.mkdirSync(path.join(rootDir,'storage','artist-data'))
        }
    }
}
module.exports = beforeStartApp;