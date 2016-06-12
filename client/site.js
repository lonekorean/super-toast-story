$(function() {
	var $loading = $('.loading');
	var $getReady = $('.get-ready');
	var $start = $('.start');

	var $playing = $('.playing');

	$start.on('click', handleStart);

	var music = document.getElementById('music');
	if (music.readyState === 4) {
		setTimeout(handleReady, 1000);
	} else {
		music.addEventListener('canplaythrough', handleReady, false);
	}

	function handleReady() {
		$getReady.hide();
		$start.show();
	}

	function handleStart() {
		$loading.hide();
		$playing.show();
		music.play();
	}
});
