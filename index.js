(function(){
	const view = {		
		init: () => { 
			view.loadCategories();
			view.loadEvents();
		},
		loadEvents: () => {
			document.addEventListener('click', ev => {
				if(ev.target.matches('.liCat')) { 
					document.getElementById("categoriaSeleccionada").innerText = ev.target.innerHTML;
					document.getElementById("categoriaSeleccionadaDatos").innerHTML = controller.loadCategoryValues(ev.target.id);
					//console.log(controller.loadCategoryValues(ev.target.id)); 
				}
		  });
		},
		loadCategories: () => { 
			document.getElementById("categorias").innerHTML = controller.loadCategories(); 
		},
	};
	
	const controller = {
		loadCategories: () => {
			const jsonData = JSON.parse(model.loadCategories());
			let liElements = '';
			jsonData.forEach((e, i, a) => {
				liElements += '<li class="liCat" id="' + e.id + '">' + e.nombre + '</li>';
			});
			return liElements;
		},
		loadCategoryValues: (id) => {
			const jsonData = JSON.parse(model.loadCategoryValues(id));
			let liElements = '<li>';
			let timeStamp = '';
			let formattedDate = '';
			let savedDay = '';
			let currentDay = '';
			jsonData.forEach((e, i, a) => {// Ordenar el array en la query
				timeStamp = new Date(e.timestamp);
				currentDay = controller.padString('00', timeStamp.getDate(), 'left') + '-' + controller.padString('00', timeStamp.getMonth() + 1, 'left') + '-' + timeStamp.getFullYear();
				formattedDate = controller.padString('00', timeStamp.getDate(), 'left') + '-' + controller.padString('00', timeStamp.getMonth() + 1, 'left') + '-' + timeStamp.getFullYear() + ' ' + controller.padString('00', timeStamp.getHours(), 'left') + ':' + controller.padString('00', timeStamp.getMinutes(), 'left');
				if(savedDay === currentDay) {
					liElements += formattedDate + " *** ";
				} else {
					savedDay = currentDay;
					liElements += '</li>';
					liElements += '<li>' + formattedDate + " *** ";					
				}
			});
			return liElements + '</li>';
		},
		padString(pad, user_str, pad_pos)
		{
			if (typeof user_str === 'undefined') { return pad; }
			if (pad_pos === 'left') { return (pad + user_str).slice(-pad.length); }
			else if (pad_pos === 'right'){ return (user_str + pad).substring(0, pad.length); }
			else { return pad; }
		}
	};
	
	const model = {
		loadCategories: () => {
			return '[{"id" : 1, "nombre" : "Test 1"}, {"id" : 2, "nombre" : "Test 2"}]'; 
		},
		loadCategoryValues: (id) => {// Pasarle el ID
			return '[{"timestamp" : "2020-11-01 08:00:00"}, {"timestamp" : "2020-11-01 09:35:00"}, {"timestamp" : "2020-11-01 10:41:15"}, {"timestamp" : "2020-11-01 13:15:00"}, {"timestamp" : "2020-10-31 08:00:00"}, {"timestamp" : "2020-10-31 11:20:00"}, {"timestamp" : "2020-10-31 13:20:00"}, {"timestamp" : "2020-10-31 15:30:00"}, {"timestamp" : "2020-10-30 08:00:00"}, {"timestamp" : "2020-10-30 12:27:53"}, {"timestamp" : "2020-10-30 14:22:00"}, {"timestamp" : "2020-10-30 16:25:00"}, {"timestamp" : "2020-10-30 17:55:00"}, {"timestamp" : "2020-10-30 22:46:00"}, {"timestamp" : "2020-10-30 23:45:00"}]';
		},
	};
	
	view.init();
})();
