   
(function() {
	let wrapper = document.querySelector('.wrapper');
    let name = document.querySelector('.name');
    let image = document.querySelector('.propic');
    let bio = document.querySelector('.bio');
    let link = document.querySelector('.link');
    let emails = document.querySelector('.email');
    let idNumber = document.querySelector('.id');
    let exerpts = document.querySelector('.exerpt');
	let baseURL = 'http://148.75.251.185:8888';
	let index = 0;

	// make ajax request, get list of all students
	$.ajax({
		method: "GET",
		url: baseURL+"/students/"
	}).done(function(response){
		console.log(response);
		for( student of response){
			let template = `<div class="studentwrapper" data-id="${student.id}">
				<img class="propic" src=""></img>
				<div class="class_wave">
					<div class="name">${student.first_name} ${student.last_name}</div>
					<div class="link"></div>
					<div class="bio"></div>
					<i class="icon icon-wave"></i>
				</div>
			</div>`;
			wrapper.innerHTML += template;
			$.ajax({method:"GET",url:baseURL+'/students/'+student.id}).done(function(res){
				console.log(`[data-id="${res.id}"]`);
				let studentElement = wrapper.querySelector(`[data-id="${res.id}"]`);
				studentElement.querySelector('img').src = baseURL+res.profile_picture;
			});
		}
	});

    wrapper.addEventListener('mouseover', function(evnt){
    	console.log("mouseover");
    	$.ajax({
    		method: "GET",
    		url: baseURL+'/students/'+evnt.target.dataset.id+'/bio'
    	}).done(function(response){
    		console.log(response)
    		let studentBios = wrapper.querySelector(`[data-id="${response.id}"`);
    		studentBios.querySelector('.bio').innerHTML = response.full_bio;

    	});
 
    });



    


})();




