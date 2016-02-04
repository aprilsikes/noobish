var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Bins(){
return knex('bins');
};
function Comments(){
return knex('comments');
}
function Ventures(){
return knex('ventures');
}
function Users(){
return knex('users');
}
router.get('/:ven_id/bins/:bin_id/comments', function (req, res, next) {
  Ventures().where('id', req.params.ven_id).first().then(function(result){
    Bins().where('id', req.params.bin_id).first().then(function(resultB){
      knex('comments')
  .join('users', 'comments.user_id', '=', 'users.id')
  .select().then(function (resultJ) {
    res.render('comments/index', {venture: result, bin: resultB, joins: resultJ});
})
})
});
});
router.get('/:ven_id/bins/:bin_id/comments/new', function (req, res, next) {
  Users().where('id', req.cookies.user).first().then(function (result) {
    console.log(result);
    var local = {venture_id: req.params.ven_id,
      bin_id: req.params.bin_id};
        console.log(local);
      res.render('comments/new', {local: local, user: result});
    })
  })

router.post('/:ven_id/bins/:bin_id/comments', function(req, res, next) {

  Comments().insert(req.body).then(function(result){
    res.redirect('/ventures/'+req.params.ven_id+'/bins/'+req.params.bin_id);
  });
});

router.get('/:ven_id/bins', function(req, res, next) {
  Bins().where('venture_id', req.params.ven_id).then(function (results) {

  res.render('bins/index', { title: 'WELCOME TO THE BIN INDEX PAGE', ventu_id: req.params.ven_id, bins: results });
  })
});

router.get('/:ven_id/bins/new', function(req, res, next) {
  Ventures().where('id', req.params.ven_id).first().then(function (result) {
    console.log(req.params.ven_id);
  res.render('bins/new', {venture: result, user: req.cookies.user});
  })
});

// router.get('/:ven_id/bins/:id', function(req, res, next) {
//   Bins().where('id', req.params.id).first().then(function (result) {
//   // console.log(result);
//   res.render('bins/show', { title: 'WELCOME TO THE BIN SHOW PAGE', bin: result });
//   })
// });
//
// router.get('/:ven_id/bins/:id/edit', function(req, res, next) {
//   Bins().where('id', req.params.id).first().then(function (result) {
//   // console.log(result);
//   res.render('bins/edit', { title: 'WELCOME TO EDIT PAGE', bin: result });
//   })
// });
//
//
//
// router.post('/:ven_id/bins', function(req, res, next) {
//   Bins().insert(req.body).then(function(result){
//     Bins().select().where({title: req.body.title, venture_id: req.params.ven_id}).first().then(function(result){
//       res.redirect('/ventures/'+ req.params.ven_id +'/bins/' + result.id + '/kits/new');
//     })
//   });
// });
//
//
// router.post('/:ven_id/bins/:id', function (req, res, next) {
//   Bins().where('id', req.params.id).update(req.body)
//   .then(function(result){
//     res.redirect('/ventures/:ven_id/bins');
//   });
// });
//
// router.post('/:ven_id/bins/:id/delete', function (req, res, next) {
//   Bins().where('id', req.params.id).del()
//   .then(function (result) {
//     res.redirect('/ventures');
//   })
// })

module.exports = router;
