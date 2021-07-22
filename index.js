const express = require('express');
const app = express();
const PORT = 3000;

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const { MONGODB } = require('./config');
mongoose.Promise = global.Promise;

//const schema = require('./schema');

const resolvers = require('./resolvers');
const method = resolvers.Query;

const User = require('./models/User');
const Category = require('./models/Category');
const Room = require('./models/Room');
const History = require('./models/History');

const upload = require('./upload');

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

mongoose
    .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, })
    .then(() => {
        app.listen(PORT, () => {
            console.log('서버 실행');
        });
    })

//로그인
app.post('/signIn', async(req, res) => {
    const data = await method.getUserInfo();    
    var isNew = true;

    if(data.length !== 0) {
        for(let index = 0; index < data.length; index++) {
            if(req.body.id === data[index].id) {
                isNew = false;
                if(data[index].complete) {
                    res.send(true);    
                }else {
                    console.log(data[index].complete);
                    res.send(false);
                }
                break;    
            }
        }
    }else {
        res.send(false);
    }

    if(isNew) {
        console.log('새로 가입한 아이디');
        const user = new User({
            id: req.body.id,
            email: req.body.email,
        })
        user.save();
    }      
})

//성별 설정
app.post('/setGender', async(req, res) => {
    User.findOneAndUpdate({id: req.body.id}, {$set : {gender: req.body.gender}}, {new : true})
    .then(data => {
        console.log(data)
    })        

    res.end();
})

//생년월일 설정
app.post('/setBirth', async(req, res) => {
    User.findOneAndUpdate({id: req.body.id}, {$set : {birth: req.body.birth, age: req.body.age}}, {new : true})
    .then(data => {
        console.log(data)
    })  

    res.end();
})

//관심사 설정
app.post('/setInterest', async(req, res) => {
    console.log('관심사');
    if(req.body.hobby === 0){
        var allInterest = await Category.find().sort({'no' : 1});
        res.send(allInterest);
    }else {
        var hobbies = req.body.hobby.join(',');
        User.findOneAndUpdate({id: req.body.id}, {$set : {hobby: hobbies}}, {new : true})
        .then(data => {
            console.log(data);
        })
    }
})

//프로필 이미지 불러오기
app.get('/firstProfile', async(req, res) => {     
    var userInfo = await User.findOne({id : req.query.id});
    var filePath;
    var count = 0;

    userInfo.profile.map((data, index) => {
        count+=1;
        if(count === 1) {
            if(data !== null) {
                filePath = path.join(__dirname, '/upload/', data);
                res.sendFile(filePath);
            }else{
                res.send('0');
            }
        }
    })
})

app.get('/secondProfile', async(req, res) => {     
    var userInfo = await User.findOne({id : req.query.id});
    var filePath;
    var count = 0;

    userInfo.profile.map((data, index) => {
        count+=1;
        if(count === 2) {
            if(data !== null) {
                filePath = path.join(__dirname, '/upload/', data);
                res.sendFile(filePath);
            }else{
                res.send('0');
            }
        }
    })
})

app.get('/thirdProfile', async(req, res) => {     
    var userInfo = await User.findOne({id : req.query.id});
    var filePath;
    var count = 0;

    userInfo.profile.map((data, index) => {
        count+=1;
        if(count === 3) {
            if(data !== null) {
                filePath = path.join(__dirname, '/upload/', data);
                res.sendFile(filePath);
            }else{
                res.send('0');
            }
        }
    })
})

app.get('/fourthProfile', async(req, res) => {     
    var userInfo = await User.findOne({id : req.query.id});
    var filePath;
    var count = 0;

    userInfo.profile.map((data, index) => {
        count+=1;
        if(count === 4) {
            if(data !== null) {
                filePath = path.join(__dirname, '/upload/', data);
                res.sendFile(filePath);
            }else{
                res.send('0');
            }
        }
    })
})

app.get('/fifthProfile', async(req, res) => {     
    var userInfo = await User.findOne({id : req.query.id});
    var filePath;
    var count = 0;

    userInfo.profile.map((data, index) => {
        count+=1;
        if(count === 5) {
            if(data !== null) {
                filePath = path.join(__dirname, '/upload/', data);
                res.sendFile(filePath);
            }else{
                res.send('0');
            }
        }
    })
})

app.get('/sixthProfile', async(req, res) => {     
    var userInfo = await User.findOne({id : req.query.id});
    var filePath;
    var count = 0;

    userInfo.profile.map((data, index) => {
        count+=1;
        if(count === 6) {
            if(data !== null) {
                filePath = path.join(__dirname, '/upload/', data);
                res.sendFile(filePath);
            }else{
                res.send('0');
            }
        }
    })
})

//프로필 이미지 업로드
app.post('/uploadProfile', upload.single('profile'), async(req, res) => {
    console.log(req.file);
    if(req.file !== undefined) {
        var userInfo = await User.findOne({id : req.body.id});

        //수정
        if(userInfo.profile[req.body.index] !== null) {
            var filePath = './upload/' + userInfo.profile[req.body.index];

            try {
                fs.unlinkSync(filePath);
                console.log('Delete Successfuly')
            } catch(error) {
                console.log(error.message);
            }
        }

        userInfo.profile[req.body.index] = req.body.date + '_' + req.file.originalname;
        User.findOneAndUpdate({id: req.body.id}, {$set : {profile : userInfo.profile}}, {new : true})
        .then(data => {
            console.log(data)
        })
    }

    res.end();
})

//프로필 완성
app.post('/setCompleted', async(req, res) => {
    User.findOneAndUpdate({id: req.body.id}, {$set : {complete: req.body.complete}}, {new : true})
        .then(data => {
            console.log(data);
    })
})

//메인 화면 로딩
app.post('/main', async(req, res) => {
    var data = new Array();
    var roomInfo;
    var userInfo;

    const Time = new Date();
    Time.setHours(Time.getHours() + 9);

    Room.deleteMany({time : {"$lte" : Time}}).then(() => console.log('Deleted'));
    if(!req.body.onFilter) {
        roomInfo = await method.getRoomInfo();
        userInfo = await method.getUserInfo({id: req.body.id});
        data.push(roomInfo);
        data.push(userInfo);
    }else {
        roomInfo = await method.getFilterRoomInfo({category: req.body.category});
        data.push(roomInfo);
    }

    res.send(data);
})

//카테고리 불러오기
app.post('/category', async(req, res) => {
    var userHistory = new Array();
    var allCategory = await method.getCategory();
    var History = await method.getHistoryInfo({id: req.body.id});

    History.map((item) => {
        var cnt = 0;
        for(let i = 0; i < userHistory.length; i++) {
            if(userHistory[i].category === item.category) {
                cnt++;
            }
        }

        if(cnt === 0) {
            userHistory.push(item);
        }
    })

    var data = new Array();    
    data.push(allCategory);
    data.push(userHistory);
 
    res.send(data);
})

//방 생성하기
app.post('/createRoom', async(req, res) => {
    const hostedTime = new Date();
    hostedTime.setHours(hostedTime.getHours() + 9);

    const room = new Room({
        id: req.body.id,
        address: req.body.address,
        latitude: req.body.lat,
        longitude: req.body.lng,       
        category: req.body.category,
        title: req.body.title,
        time: req.body.time,
        timeInfo: req.body.timeInfo,
    })
    
    const history = new History({
        id: req.body.id,
        address: req.body.address,
        latitude: req.body.lat,
        longitude: req.body.lng,        
        category: req.body.category,
        hostedTime: hostedTime,
    })

    room.save();
    history.save();
})

app.post('/modifyRoom', async(req, res) => {
    await Room.findOneAndUpdate({_id : req.body._id}, {$set : {latitude: req.body.lat, longitude: req.body.lng, address: req.body.address, category: req.body.category, title: req.body.title, time: req.body.time, timeInfo: req.body.timeInfo}}, {new : true})
    .then(data => console.log(data))    
})
