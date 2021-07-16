const User = require('./models/User');
const Category = require('./models/Category');
const Room = require('./models/Room');
const History = require('./models/History');

const resolvers = {
    Query: {
        async getUserInfo(id) {
            const user = await User.find(id);
            return user;
        },

        async getCategory() {
            const category = await Category.find();
            return category;
        },

        async getRoomInfo() {
            const room = await Room.find();
            return room;
        },

        async getFilterRoomInfo(category) {
            const room = await Room.find(category);
            return room;
        },

        async getHistoryInfo(id) {
            const history = await History.find(id).sort({"hostedTime": -1});
            return history;
        }
    }
}

module.exports = resolvers;