exports.paginaInicial = (req, res) => {
  res.render('index', {
    titulo: "Este é o titulo da página",
    numero: [0,1,2,3,4,5,6,7,8,9]
  });
};
  
  exports.trataPost = (req, res) => {
    res.send('Ei, sou sua nova rota de POST.');
  };

//req.session.usuario = {nome: 'Luiz', logado: true};
//console.log(req.session.usuario)
//req.flash('info', 'Oi')
//req.flash('error', 'Tchau')
//req.flash('sucess', 'Guten Tag')
//console.log(req.flash('error'), req.flash("sucess"), req.flash('info'))