define({ "api": [
  {
    "type": "POST",
    "url": "/mathces/",
    "title": "Create Match",
    "name": "CreatMatch",
    "group": "Match",
    "description": "<p>Creates a new Match.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "male",
            "description": "<p>the male match</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "female",
            "description": "<p>the female match</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "percent_of_match",
            "description": "<p>how much are the two match in percent</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "communicating",
            "description": "<p>did the two party started to comunicate</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\t\"male\":\"5a4793b59e51352a30ed967c\",\n\t\"female\":\"5a47972d54c2952e5c5fd60c\",\n\t\"percent_of_match\": \"14.225\",\n\t\"communicating\": \"ture\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 201 Created\n{\n    \"_id\": \"5a47a647b201723f0e15c7db\",\n    \"last_modified\": \"2017-12-30T14:44:23.124Z\",\n    \"male\": \"5a4793b59e51352a30ed967c\",\n    \"female\": \"5a47972d54c2952e5c5fd60c\",\n    \"percent_of_match\": 14.225,\n    \"communicating\": true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/match.js",
    "groupTitle": "Match"
  },
  {
    "type": "GET",
    "url": "/mathces/",
    "title": "Get Match By Pagnation",
    "name": "GetMatch",
    "group": "Match",
    "description": "<p>Get all matches by pagination</p>",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 201 Created\n{\n    \"page\": 1,\n    \"total_docs\": 3,\n    \"total_pages\": 1,\n    \"per_page\": 10,\n    \"docs\": [\n        {\n            \"_id\": \"5a479c9a27112432913a7650\",\n            \"last_modified\": \"2017-12-30T14:03:06.809Z\",\n            \"date_created\": \"2017-12-30T14:03:06.809Z\",\n            \"male\": \"5a4793b59e51352a30ed967c\",\n            \"female\": \"5a47972d54c2952e5c5fd60c\",\n            \"percent_of_match\": 74.25,\n            \"communicating\": false,\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5a479cb127112432913a7651\",\n            \"last_modified\": \"2017-12-30T14:03:29.335Z\",\n            \"date_created\": \"2017-12-30T14:03:29.335Z\",\n            \"male\": \"5a4793b59e51352a30ed967c\",\n            \"female\": \"5a47972d54c2952e5c5fd60c\",\n            \"percent_of_match\": 14.225,\n            \"communicating\": true,\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5a47a647b201723f0e15c7db\",\n            \"last_modified\": \"2017-12-30T14:44:23.124Z\",\n            \"date_created\": \"2017-12-30T14:44:23.124Z\",\n            \"male\": \"5a4793b59e51352a30ed967c\",\n            \"female\": \"5a47972d54c2952e5c5fd60c\",\n            \"percent_of_match\": 14.225,\n            \"communicating\": true,\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/match.js",
    "groupTitle": "Match"
  },
  {
    "type": "POST",
    "url": "/messages/",
    "title": "Create Message",
    "name": "CreatMessage",
    "group": "Message",
    "description": "<p>Creates a new Message.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "frpm",
            "description": "<p>ID of the sender</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "to",
            "description": "<p>Id of the reciver</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Subject",
            "description": "<p>subject of the message</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>content of the message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\t\"from\":\"5a4793b59e51352a30ed967c\",\n\t\"to\":\"5a47972d54c2952e5c5fd60c\",\n\t\"subject\": \"HEY 2\",\n\t\"content\": \"HEY YOU!!\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 201 Created\n{\n    \"_id\": \"5a47a776ad32f54046fd7664\",\n    \"last_modified\": \"2017-12-30T14:49:27.005Z\",\n    \"from\": \"5a4793b59e51352a30ed967c\",\n    \"to\": \"5a47972d54c2952e5c5fd60c\",\n    \"content\": \"HEY YOU!!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/message.js",
    "groupTitle": "Message"
  },
  {
    "type": "GET",
    "url": "/messages/",
    "title": "Get Message By Pagnation",
    "name": "GetMessage",
    "group": "Message",
    "description": "<p>Get all messages by pagination</p>",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": " HTTP/1.1 201 Created\n {\n    \"page\": 1,\n    \"total_docs\": 2,\n    \"total_pages\": 1,\n    \"per_page\": 10,\n    \"docs\": [\n        {\n            \"_id\": \"5a4798fb349b472eafd79808\",\n            \"last_modified\": \"2017-12-30T13:47:39.984Z\",\n            \"date_created\": \"2017-12-30T13:47:39.984Z\",\n            \"from\": \"5a4793b59e51352a30ed967c\",\n            \"to\": \"5a47972d54c2952e5c5fd60c\",\n            \"subject\": \"HEY 2\",\n            \"content\": \"HEY YOU!!\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5a47a776ad32f54046fd7664\",\n            \"last_modified\": \"2017-12-30T14:49:27.005Z\",\n            \"date_created\": \"2017-12-30T14:49:27.005Z\",\n            \"from\": \"5a4793b59e51352a30ed967c\",\n            \"to\": \"5a47972d54c2952e5c5fd60c\",\n            \"subject\": \"HEY 2\",\n            \"content\": \"HEY YOU!!\",\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/message.js",
    "groupTitle": "Message"
  },
  {
    "type": "GET",
    "url": "/profile/",
    "title": "Get Profile By Pagnation",
    "name": "GetProfile",
    "group": "Profile",
    "description": "<p>Get all Profiles by pagination</p>",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": " HTTP/1.1 201 Created\n{\n    \"page\": 1,\n    \"total_docs\": 2,\n    \"total_pages\": 1,\n    \"per_page\": 10,\n    \"docs\": [\n        {\n            \"_id\": \"5a4793b59e51352a30ed967c\",\n            \"last_modified\": \"2017-12-30T13:25:09.736Z\",\n            \"date_created\": \"2017-12-30T13:25:09.736Z\",\n            \"email\": \"mamit@mamo.com\",\n            \"user\": \"5a4793b59e51352a30ed967b\",\n            \"__v\": 0,\n            \"first_name\": \"Mamit\",\n            \"last_name\": \"Mamo\",\n            \"sex\": \"F\",\n            \"picture\": \"\"\n        },\n        {\n            \"_id\": \"5a47972d54c2952e5c5fd60c\",\n            \"last_modified\": \"2017-12-30T13:39:57.294Z\",\n            \"date_created\": \"2017-12-30T13:39:57.294Z\",\n            \"email\": \"mamo@mamo.com\",\n            \"user\": \"5a47972d54c2952e5c5fd60b\",\n            \"__v\": 0,\n            \"sex\": \"M\",\n            \"picture\": \"\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/profile.js",
    "groupTitle": "Profile"
  },
  {
    "type": "POST",
    "url": "/user/login",
    "title": "User Login",
    "name": "LoginUser",
    "group": "User",
    "description": "<p>Creates a new User and corresponding User Type.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\t\"username\": \"john@gebeya.com\",\n\t\"password\": \"password\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tokne",
            "description": "<p>User token</p>"
          },
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "User",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": " HTTP/1.1 201 Created\n{\n    \"token\": \"d6uAPieIO8O0qWrnDq6gSwS0HEyEILiab558mkOqxXfHweWr1XcxwvFME/r/WwVZwkDfrjj86Z6v\",\n    \"user\": {\n        \"_id\": \"5a4793b59e51352a30ed967c\",\n        \"last_modified\": \"2017-12-30T13:25:09.736Z\",\n        \"date_created\": \"2017-12-30T13:25:09.736Z\",\n        \"email\": \"mamit@mamo.com\",\n        \"user\": \"5a4793b59e51352a30ed967b\",\n        \"first_name\": \"Mamit\",\n        \"last_name\": \"Mamo\",\n        \"picture\": \"\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/user/signup",
    "title": "User Signup",
    "name": "SignupUser",
    "group": "User",
    "description": "<p>Creates a new User and corresponding User Type.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\t\"email\": \"john@gebeya.com\",\n\t\"password\": \"password\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>User Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User Username</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "last_login",
            "description": "<p>Last Login Date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": " HTTP/1.1 201 Created\n{\n \"_id\": \"5a01de75e020c76235032029\",\n\t\"username\": \"john@gebeya.com\",\n \"last_login\": \"2017-11-21T16:53:23.820Z\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "User"
  }
] });
