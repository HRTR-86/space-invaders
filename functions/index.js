const { onRequest } = require("firebase-functions/v2/https");

const express = require('express');
const app = express();
const serviceAccount = require('./serviceAccountKey.json');

require('dotenv').config();

const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET,
});

process.env.TZ = 'Asia/Tokyo';

const AuthorityListController = require('./app/Http/Controllers/Login/AuthorityListController');
const ChannelDetailController = require('./app/Http/Controllers/Channel/ChannelDetailController');
const ChannelAddController = require('./app/Http/Controllers/Channel/ChannelAddController');
const ChannelUserListController = require('./app/Http/Controllers/Channel/ChannelUserListController');
const ChannelUserAddController = require('./app/Http/Controllers/Channel/ChannelUserAddController');
const LoginController = require('./app/Http/Controllers/Login/LoginController');
const MessageListController = require('./app/Http/Controllers/Message/MessageListController');
const MessageDetailController = require('./app/Http/Controllers/Message/MessageDetailController');
const MessageAddController = require('./app/Http/Controllers/Message/MessageAddController');
const MessageEditController = require('./app/Http/Controllers/Message/MessageEditController');
const MessageEditGoodController = require('./app/Http/Controllers/Message/MessageEditGoodController');
const MessageEditExpiredController = require('./app/Http/Controllers/Message/MessageEditExpiredController');
const MessageEditPinnedController = require('./app/Http/Controllers/Message/MessageEditPinnedController');
const MessageDeleteController = require('./app/Http/Controllers/Message/MessageDeleteController');
const ReplyListController = require('./app/Http/Controllers/Reply/ReplyListController');
const ReplyAddController = require('./app/Http/Controllers/Reply/ReplyAddController');
const SignUpController = require('./app/Http/Controllers/Login/SignUpController');
const UserDetailController = require('./app/Http/Controllers/User/UserDetailController');
const UserEditController = require('./app/Http/Controllers/User/UserEditController');

const AuthorityListRequest = require('./app/Http/Requests/Login/AuthorityListRequest');
const ChannelDetailRequest = require('./app/Http/Requests/Channel/ChannelDetailRequest');
const ChannelAddRequest = require('./app/Http/Requests/Channel/ChannelAddRequest');
const ChannelUserListRequest = require('./app/Http/Requests/Channel/ChannelUserListRequest');
const ChannelUserAddRequest = require('./app/Http/Requests/Channel/ChannelUserAddRequest');
const LoginRequest = require('./app/Http/Requests/Login/LoginRequest');
const MessageListRequest = require('./app/Http/Requests/Message/MessageListRequest');
const MessageDetailRequest = require('./app/Http/Requests/Message/MessageDetailRequest');
const MessageAddRequest = require('./app/Http/Requests/Message/MessageAddRequest');
const MessageEditRequest = require('./app/Http/Requests/Message/MessageEditRequest');
const MessageEditGoodRequest = require('./app/Http/Requests/Message/MessageEditGoodRequest');
const MessageEditExpiredRequest = require('./app/Http/Requests/Message/MessageEditExpiredRequest');
const MessageEditPinnedRequest = require('./app/Http/Requests/Message/MessageEditPinnedRequest');
const MessageDeleteRequest = require('./app/Http/Requests/Message/MessageDeleteRequest');
const ReplyListRequest = require('./app/Http/Requests/Reply/ReplyListRequest');
const ReplyAddRequest = require('./app/Http/Requests/Reply/ReplyAddRequest');
const SignUpRequest = require('./app/Http/Requests/Login/SignUpRequest');
const UserDetailRequest = require('./app/Http/Requests/User/UserDetailRequest');
const UserEditRequest = require('./app/Http/Requests/User/UserEditRequest');

const Validator = require('validatorjs');
Validator.useLang('ja');

app.post('/api/signup', SignUpRequest, SignUpController);

app.post('/api/login', LoginRequest, LoginController);

app.get('/api/authority/list', AuthorityListRequest, AuthorityListController);

app.get('/api/channel/detail', ChannelDetailRequest, ChannelDetailController);
app.post('/api/channel/add', ChannelAddRequest, ChannelAddController);

app.get('/api/channel-user/list', ChannelUserListRequest, ChannelUserListController);
app.post('/api/channel-user/add', ChannelUserAddRequest, ChannelUserAddController);

app.get('/api/message/list', MessageListRequest, MessageListController);
app.get('/api/message/detail', MessageDetailRequest, MessageDetailController);
app.post('/api/message/add', MessageAddRequest, MessageAddController);
app.put('/api/message/edit', MessageEditRequest, MessageEditController);
app.put('/api/message/edit/good', MessageEditGoodRequest, MessageEditGoodController);
app.put('/api/message/edit/expired', MessageEditExpiredRequest, MessageEditExpiredController);
app.put('/api/message/edit/pinned', MessageEditPinnedRequest, MessageEditPinnedController);
app.delete('/api/message/delete', MessageDeleteRequest, MessageDeleteController);

app.get('/api/user/detail', UserDetailRequest, UserDetailController);
app.put('/api/user/edit', UserEditRequest, UserEditController);

app.get('/api/reply/list', ReplyListRequest, ReplyListController);
app.post('/api/reply/add', ReplyAddRequest, ReplyAddController);

exports.app = onRequest(app);
