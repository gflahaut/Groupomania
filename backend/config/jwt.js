// const jwt = require("jsonwebtoken");
// const JWT_SECRET =  process.env.JWT_SECRET;

// module.exports = {
//     tokenGenerator: function (query) {
//         return jwt.sign({ 
//             userId: query.id,
//             isAdmin: query.role,
//             iss: process.env.ISS,
//         },
//         JWT_SECRET,
//         {
//             expiresIn: '2h'
//         })
//     }
//     // parseAuthToken: function(authorization){
//     //     return (authorization !== null) ? authorization.replace('Bearer', '') : null;
//     // },
//     // getUserId: function(authorization){
//     //     let userId = -1;
//     //     var token =module.exports.parseAuthToken(authorization);
//     //     if(token !== null){
//     //         try{
//     //             let jwebToken = jwt.verify(token, JWT_SECRET);
//     //             if(jwebToken !== null){
//     //                 userId = jwebToken.userId;
//     //             }
//     //         }catch(err){
//     //             alert(err);
//     //             throw error
//     //         }

//     //     }
//     //     return userId;
//     // }
// }
