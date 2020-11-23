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
					document.getElementById("categoriaSeleccionadaTabla").innerHTML = controller.loadCategoryValues(ev.target.id);
				} else if(ev.target.matches('#addHoraActual')) {// if hay categoría seleccionada, sino, mostrar aviso
					const now = new Date(Date.now());
					const obj = `{"day" : "${now.getFullYear()}-${controller.padString('00', now.getMonth() + 1, 'left')}-${controller.padString('00', now.getDate(), 'left')}", "hour" : "${controller.padString('00', now.getHours(), 'left')}:${controller.padString('00', now.getMinutes(), 'left')}"}`;
					document.getElementById("categoriaSeleccionadaTabla").innerHTML = controller.reloadCategoryValues("ajustar", obj);
				} else if(ev.target.matches('#addHoraPersonalizada')) {// if hay categoría seleccionada, sino, mostrar aviso
					const dia = controller.padString('00', document.getElementById("dia").value, 'left');
					const mes = controller.padString('00', document.getElementById("mes").value, 'left');
					const anyo = document.getElementById("anyo").value;
					const hora = controller.padString('00', document.getElementById("hora").value, 'left');
					const minuto = controller.padString('00', document.getElementById("minuto").value, 'left');
					const obj = `{"day" : "${anyo}-${mes}-${dia}", "hour" : "${hora}:${minuto}"}`;
					document.getElementById("categoriaSeleccionadaTabla").innerHTML = controller.reloadCategoryValues("ajustar", obj);
				}
		  });
		},
		loadCategories: () => { 
			document.getElementById("categorias").innerHTML = controller.loadCategories();
		},
	};
	// página de editar categorías fusionarla con el index
	const controller = {
		loadCategories: () => {
			let jsonData = JSON.parse(model.loadCategories());
			jsonData = controller.orderJsonBy(jsonData, "nombre", "asc")
			let liElements = '';
			jsonData.forEach((e, i, a) => {
				liElements += '<li class="liCat" id="' + e.id + '">' + e.nombre + '</li>';
			});
			return liElements;
		},
		loadCategoryValues: (id, data) => {// hacer el orderBy
			let jsonData;
			if(data === undefined || data === null) {
				jsonData = JSON.parse(model.loadCategoryValues(id));
			} else {
				jsonData = data;
			}
			let tableElements = '';
			let savedDay = '';
			jsonData.forEach((e, i, a) => {// Ordenar el array en la query
				if(savedDay === e.day) {
					tableElements += '<td>' + e.hour + '</td>';
				} else {
					savedDay = e.day;
					if(tableElements !== '') {
						tableElements += '</tr>';						
					}
					tableElements += '<tr><td>' + e.day + '</td><td>' + e.hour + '</td>';					
				}		
			});
			return tableElements + '</tr>';
		},
		reloadCategoryValues: (id, newValue) => {
			let jsonObj = JSON.parse(model.loadCategoryValues(id));			
			jsonObj.push(JSON.parse(newValue));
			return(controller.loadCategoryValues(id, jsonObj));
		},
		padString: (pad, user_str, pad_pos) => {
			if (typeof user_str === 'undefined') { return pad; }
			if (pad_pos === 'left') { return (pad + user_str).slice(-pad.length); }
			else if (pad_pos === 'right'){ return (user_str + pad).substring(0, pad.length); }
			else { return pad; }
		},
		orderJsonBy: (obj, orderBy, order) => {
			switch(order) {
				case "asc":					
					if((typeof obj[0][orderBy]) === 'number'){obj = obj.sort((a,b) => +a[orderBy] - +b[orderBy]);}
					else {obj = obj.sort((a,b) => a[orderBy].localeCompare(b[orderBy]));}
					break;
				case "desc":
					if((typeof obj[0][orderBy]) === 'number'){obj = obj.sort((a,b) => +b[orderBy] - +a[orderBy]);}
					else {obj = obj.sort((a,b) => b[orderBy].localeCompare(a[orderBy]));}
					break;
			}
			return obj;
		},
	};
	
	const model = {
		loadCategories: () => {
			return '[{"id" : 3, "nombre" : "Test 3"}, {"id" : 1, "nombre" : "Test 1"}, {"id" : 2, "nombre" : "Test 2"}]'; 
		},
		loadCategoryValues: (id) => {// Pasarle el ID
			//return '[{"timestamp" : "2020-11-01 08:00:00"}, {"timestamp" : "2020-11-01 09:35:00"}, {"timestamp" : "2020-11-01 10:41:15"}, {"timestamp" : "2020-11-01 13:15:00"}, {"timestamp" : "2020-10-31 08:00:00"}, {"timestamp" : "2020-10-31 11:20:00"}, {"timestamp" : "2020-10-31 13:20:00"}, {"timestamp" : "2020-10-31 15:30:00"}, {"timestamp" : "2020-10-30 08:00:00"}, {"timestamp" : "2020-10-30 12:27:53"}, {"timestamp" : "2020-10-30 14:22:00"}, {"timestamp" : "2020-10-30 16:25:00"}, {"timestamp" : "2020-10-30 17:55:00"}, {"timestamp" : "2020-10-30 22:46:00"}, {"timestamp" : "2020-10-30 23:45:00"}]';
			return '[{"day" : "2020-11-01", "hour" : "08:00"}, {"day" : "2020-11-01", "hour" : "09:35"}, {"day" : "2020-11-01", "hour" : "10:41"}, {"day" : "2020-11-01", "hour" : "13:15"}, {"day" : "2020-10-31", "hour" : "08:00"}, {"day" : "2020-10-31", "hour" : "11:20"}, {"day" : "2020-10-31", "hour" : "13:20"}, {"day" : "2020-10-31", "hour" : "15:30"}, {"day" : "2020-10-30", "hour" : "08:00"}, {"day" : "2020-10-30", "hour" : "12:27"}, {"day" : "2020-10-30", "hour" : "14:22"}, {"day" : "2020-10-30", "hour" : "16:25"}, {"day" : "2020-10-30", "hour" : "17:55"}, {"day" : "2020-10-30", "hour" : "22:46"}, {"day" : "2020-10-30", "hour" : "23:45"}, {"day" : "2020-10-30", "hour" : "08:00"}, {"day" : "2020-10-30", "hour" : "12:27"}, {"day" : "2020-10-30", "hour" : "14:22"}, {"day" : "2020-10-30", "hour" : "16:25"}, {"day" : "2020-10-30", "hour" : "17:55"}, {"day" : "2020-10-30", "hour" : "22:46"}, {"day" : "2020-10-30", "hour" : "23:45"}, {"day" : "2020-10-30", "hour" : "08:00"}, {"day" : "2020-10-30", "hour" : "12:27"}, {"day" : "2020-10-30", "hour" : "14:22"}, {"day" : "2020-10-30", "hour" : "16:25"}, {"day" : "2020-10-30", "hour" : "17:55"}, {"day" : "2020-10-30", "hour" : "22:46"}, {"day" : "2020-10-30", "hour" : "23:45"}, {"day" : "2020-11-18", "hour" : "08:00"}]';
		},
	};
	
	view.init();
})();
