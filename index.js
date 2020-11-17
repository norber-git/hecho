(function(){
	const view = {		
		init: () => { 
			view.loadCategorias();
			view.loadEvents();
		},
		loadEvents: () => {
			document.addEventListener('click', ev => {
			  if(ev.target.matches('.liCat')) { console.log(ev.target.id); } // cargar los datos de la categoría
		  });
		},
		loadCategorias: () => { 
			document.getElementById("categorias").innerHTML = controller.loadCategorias(); 
		},
	};
	
	const controller = {
		loadCategorias: () => {
			const jsonData = JSON.parse(model.loadCategorias());
			let liElements = '';
			jsonData.forEach((e, i, a) => {
				liElements += '<li class="liCat" id="' + e.id + '">' + e.nombre + '</li>';
			});
			return liElements;
		},
	};
	
	const model = {
		loadCategorias: () => { 
			return '[{"id" : 1, "nombre" : "categoría test 1"}, {"id" : 2, "nombre" : "categoría test 2"}]'; 
		},
	};
	
	view.init();
})();
