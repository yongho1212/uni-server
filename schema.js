const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
    type User {
        id: String
        email: String
        gender: String
        age: Int
        birth: String        
        profile: [String]
        hobby: String
        push: Int
        complete: Boolean
    }
    
    type History {
        id: String
        latitude: Float
        longitude: Float
        address: String
        category: String
        hostedTime: String
    }

    type Room {
        id: String
        latitude: Float
        longitude: Float
        address: String
        category: String
        title: String
        time: String
        timeInfo: String
    }

    type Category {
        area: String
        category: String
        no: Int
    }

    type Query {
        getRoomInfo: [Room]
        getFilterRoomInfo(category: String): [Room] 
        getUserInfo(id: String): User
        getHistoryInfo(id: String): History
        getCategory: Category    
    }

    input UserInput {
        id: String
        email: String
        profile: String
        hobby: String
    }

    input RoomInput {
        id: String
        latitude: Float
        longitude: Float
        address: String
        category: String
        title: String
        time: String
        timeInfo: String
    }

    input HistoryInput {
        id: String
        latitude: Float
        longitude: Float
        address: String
        category: String
    }

    type Mutation {
        createUser(input: UserInput): User
        createHistory(input: HistoryInput): History
        createRoom(input: RoomInput): Room        
    }
`

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports = schema;